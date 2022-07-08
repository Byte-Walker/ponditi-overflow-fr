import React, { useContext, useEffect } from "react";
import Feed from "../../components/Feed/Feed";
import NavBar from "../../components/NavBar/NavBar";
import Post from "./Post";
import { UserContext } from "../../ContextAPI/UserContext";
import { useQuery } from "react-query";

const Home = () => {
  const { user } = useContext(UserContext);
  // * fetching followed list of logged user * //
  const { data: following, refetch: followingRefetch } = useQuery(
    `following_${user?.user_email}`,
    () => fetch(`http://localhost:5500/followings/${user?.user_email}`).then((res) => res.json())
  );

  const { data: feedInfo, refetch: feedInfoRefetch } = useQuery("allAnswers", () =>
    fetch(`http://localhost:5500/getallanswers`).then((res) => res.json())
  );

  useEffect(() => {
    document.title = "Ponditi-Overflow";
    feedInfoRefetch();
    followingRefetch();
  }, [feedInfoRefetch, followingRefetch]);

  return (
    <>
      <NavBar />{" "}
      {user?.user_email ? (
        <section className="homePageContainer mx-auto gap-10 mt-3">
          <div>
            <Post />
            {feedInfo?.map((feedInformation, index) => (
              <Feed
                feedInfo={feedInformation}
                key={index}
                following={following}
                followingRefetch={followingRefetch}
              />
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
