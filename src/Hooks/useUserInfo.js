import { useState, useEffect } from "react";

const useUserInfo = (user_email_id) => {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const url = `http://localhost:5500/profile/${user_email_id}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setUserInfo(res);
      });
  }, [user_email_id]);
  return userInfo;
};

export default useUserInfo;
