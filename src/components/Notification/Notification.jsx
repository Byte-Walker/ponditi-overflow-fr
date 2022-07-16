import React from "react";
import { FiBell } from "react-icons/fi";
import Modal from "../Modal/Modal";
import { Dropdown } from "flowbite-react";
import { BsThreeDots } from "react-icons/bs";
import NotificationCard from "./NotificationCard";
import { useState } from "react";
import { useQuery } from "react-query";
import { useContext } from "react";
import { UserContext } from "../../ContextAPI/UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import updateNotification from "../UlitiyFunctions/updateNotification";

const Notification = () => {
  const [openModal, setOpenModal] = useState(false);
  const { user } = useContext(UserContext);

  const path = useNavigate();

  const {
    data: notifications,
    isLoading,
    refetch: notificationsRefetch,
  } = useQuery(`new_notification_${user?.user_email}`, () =>
    fetch(`http://localhost:5500/newnotifications/${user?.user_email}`).then((res) => res.json())
  );

  const readAllNotifications = () => {
    const allIds = [];
    notifications.map((notification) => allIds.push(notification.notification_id));
    updateNotification({ notification_ids: allIds });
    notificationsRefetch();
  };

  useEffect(() => {
    notificationsRefetch();
  }, [notificationsRefetch]);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <div
        className="relative cursor-pointer w-[40px] h-[40px] centerXY border border-transparent hover:border-blue-600 rounded-full p-2"
        onClick={() => setOpenModal(true)}
      >
        {notifications && notifications.length !== 0 && (
          <span className="text-xs absolute top-0 right-0 centerXY bg-blue-600 rounded-full w-[18px] h-[18px] text-white">
            {
              <span className="text-[10px]">
                {notifications.length > 5 ? "5+" : notifications.length}
              </span>
            }
          </span>
        )}

        <FiBell className="text-xl text-blue-900 cursor-pointer" />
      </div>
      <Modal
        title={"Notifications"}
        openModal={openModal}
        setOpenModal={setOpenModal}
        width={"450px"}
      >
        <div className="p-5">
          <div className="centerY justify-between mb-5">
            <h1 className="font-semibold">Recent Notifications</h1>
            {/* three dots */}
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={<BsThreeDots className="text-2xl m-0 p-0" />}
            >
              <div>
                <Dropdown.Item onClick={readAllNotifications}>Mark all as read</Dropdown.Item>
                <Dropdown.Item onClick={() => path("/notifications")}>
                  See all Notification
                </Dropdown.Item>
              </div>
            </Dropdown>
          </div>
          {/* provoker, receiver, mode, answer_id, seen */}
          <div className="flex flex-col gap-2">
            <>
              {notifications && notifications.length === 0 && (
                <h1 className="text-center my-2">No new notification</h1>
              )}
            </>
            {notifications &&
              notifications
                .reverse()
                .slice(0, 5)
                .map((notification, index) => (
                  <NotificationCard
                    key={index}
                    user_email={notification?.provoker}
                    mode={notification?.mode}
                    seen={notification?.seen}
                    time={notification?.time}
                    answer_id={notification.answer_id}
                    notification_id={notification.notification_id}
                    refetch={notificationsRefetch}
                    setModal={setOpenModal}
                  />
                ))}
          </div>
          <div className="text-center mt-4">
            <button
              className="text-blue-500 hover:underline"
              onClick={() => {
                setOpenModal(false);
                path("/notifications");
              }}
            >
              See All
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Notification;
