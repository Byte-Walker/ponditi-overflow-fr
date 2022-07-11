import React from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import updateNotification from "../UlitiyFunctions/updateNotification";
import UserDP from "../UserDP/UserDP";

const NotificationCard = ({
  user_email,
  mode,
  seen,
  time,
  answer_id,
  notification_id,
  refetch,
  setModal,
}) => {
  const path = useNavigate();
  // * gathering userInfo * //

  const { data: userInfo, refetch: userInfoRefetch } = useQuery(`userInfo_${user_email}`, () =>
    fetch(`http://localhost:5500/profile/${user_email}`).then((res) => res.json())
  );

  useEffect(() => {
    userInfoRefetch();
  }, [userInfoRefetch]);

  const handleClick = () => {
    if (mode === "upvote" || mode === "share" || mode === "answer") {
      path(`/single-answer/${answer_id}`);
      updateNotification({ notification_ids: [notification_id] });
      refetch();
      setModal && setModal(false);
    } else {
      path(`/profile/${user_email}`);
      updateNotification({ notification_ids: [notification_id] });
      refetch();
      setModal && setModal(false);
    }
  };

  return (
    <div
      className={`centerY gap-3 hover:bg-blue-100 cursor-pointer ${
        seen === "true" ? "" : "bg-blue-200"
      } p-2 rounded`}
      onClick={handleClick}
    >
      <div>
        <UserDP dimension={"35px"} user_name={userInfo?.user_name} img_url={userInfo?.img_url} />
      </div>
      <div>
        <p className="text-sm">
          <span className="font-semibold cursor-pointer">{userInfo?.user_name}</span>
          <span className="text-gray-500">
            {" "}
            {mode === "follow" && "Followed You"}
            {mode === "upvote" && "Upvoted Your Post"}
            {mode === "share" && "Shared Your Post"}
            {mode === "answer" && "Answered Your Question"}
            at {time}
          </span>
        </p>
      </div>
    </div>
  );
};

export default NotificationCard;
