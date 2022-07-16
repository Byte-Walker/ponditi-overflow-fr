import { Dropdown } from "flowbite-react";
import React, { useContext } from "react";
import { useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useQuery } from "react-query";
import NavBar from "../../components/NavBar/NavBar";
import NotificationCard from "../../components/Notification/NotificationCard";
import updateNotification from "../../components/UlitiyFunctions/updateNotification";
import { UserContext } from "../../ContextAPI/UserContext";
import { Spinner } from "flowbite-react";

const NotificationPage = () => {
  const { user } = useContext(UserContext);

  const {
    data: notifications,
    refetch: notificationsRefetch,
    isLoading: notificationLoading,
  } = useQuery(`notification_${user?.user_email}`, () =>
    fetch(`https://ponditi-overflow.herokuapp.com/getnotifications/${user?.user_email}`).then(
      (res) => res.json()
    )
  );
  const { refetch: newNotificationsRefetch, isLoading: newNotificationLoading } = useQuery(
    `new_notification_${user?.user_email}`,
    () =>
      fetch(`https://ponditi-overflow.herokuapp.com/newnotifications/${user?.user_email}`).then(
        (res) => res.json()
      )
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
  }, [notificationsRefetch]);

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
        {notificationLoading && newNotificationLoading && (
          <div className="p-5 centerXY">
            <Spinner color="info" aria-label="Info spinner example" size="xl" />
          </div>
        )}

        <>
          {notifications && notifications.length === 0 && (
            <h1 className="text-center mt-5 font-semibold">No Notification</h1>
          )}
        </>

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
                refetch={newNotificationsRefetch}
              />
            ))}
      </div>
    </>
  );
};

export default NotificationPage;
