import React, { useContext, useEffect, useState } from "react";
import Feed from "../../components/Feed/Feed";
import NavBar from "../../components/NavBar/NavBar";
import Post from "./Post";
import { UserContext } from "../../ContextAPI/UserContext";

const Home = () => {
  const [feedInfo, setFeedinfo] = useState([]);
  const { user } = useContext(UserContext);
  useEffect(() => {
    const url = "http://localhost:5500/getallanswers";
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setFeedinfo(res);
      });
  }, []);

  return (
    <>
      <NavBar />{" "}
      {user?.user_email ? (
        <section className="homePageContainer mx-auto gap-10 mt-3">
          <div>
            <Post />
            {feedInfo.map((feedInformation) => (
              <Feed feedInfo={feedInformation} key={Math.random()} />
            ))}
          </div>
        </section>
      ) : (
        <h1 className="font-semibold text-2xl text-center mt-20">Please Login First!😪</h1>
      )}
    </>
  );
};

export default Home;
