import { Dropdown } from "flowbite-react";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useQuery } from "react-query";
import NavBar from "../../components/NavBar/NavBar";
import NotificationCard from "../../components/Notification/NotificationCard";
import updateNotification from "../../components/UlitiyFunctions/updateNotification";
import { UserContext } from "../../ContextAPI/UserContext";

const NotificationPage = () => {
  const { user } = useContext(UserContext);

  const { data: notifications, refetch: notificationsRefetch } = useQuery(
    `notification_${user?.user_email}`,
    () =>
      fetch(`http://localhost:5500/getnotifications/${user?.user_email}`).then((res) => res.json())
  );
  const { refetch: newNotificationsRefetch } = useQuery(
    `new_notification_${user?.user_email}`,
    () =>
      fetch(`http://localhost:5500/newnotifications/${user?.user_email}`).then((res) => res.json())
  );

  const readAllNotifications = () => {
    const allIds = [];
    notifications.map((notification) => allIds.push(notification.notification_id));
    updateNotification({ notification_ids: allIds });
    notificationsRefetch();
    newNotificationsRefetch();
  };

  useEffect(() => {
    notificationsRefetch();
  }, []);

  return (
    <>
      <NavBar />
      <div className="flex flex-col gap-2 mt-8 homePageContainer mx-auto card p-5">
        <div className="centerY justify-between">
          <h1>All Notifications</h1>
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={<BsThreeDots className="text-2xl m-0 p-0" />}
          >
            <div>
              <Dropdown.Item onClick={readAllNotifications}>Mark all as read</Dropdown.Item>
            </div>
          </Dropdown>
        </div>

        <>{notifications && notifications.length === 0 && <h1>No Notification</h1>}</>

        {notifications &&
          notifications
            .reverse()
            .map((notification, index) => (
              <NotificationCard
                key={index}
                user_email={notification?.provoker}
                mode={notification?.mode}
                seen={notification?.seen}
                time={notification?.time}
                answer_id={notification.answer_id}
                notification_id={notification.notification_id}
              />
            ))}
      </div>
    </>
  );
};

export default NotificationPage;
