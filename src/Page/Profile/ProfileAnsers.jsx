import React, { useContext, useEffect, useState } from "react";
import Feed from "../../components/Feed/Feed";
import { UserContext } from "../../ContextAPI/UserContext";
const ProfileAnsers = () => {
  const [feedInfo, setFeedInfo] = useState([]);
  const { user } = useContext(UserContext);
  useEffect(() => {
    const url = `http://localhost:5500/getuseranswers/${user?.user_email}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setFeedInfo(res);
        console.log(res);
      });
  }, []);
  return (
    <section>
      {feedInfo.map((feedInformation, index) => (
        <Feed feedInfo={feedInformation} key={index} />
      ))}
    </section>
  );
};

export default ProfileAnsers;
