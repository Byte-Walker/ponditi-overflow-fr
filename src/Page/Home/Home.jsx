import React, { useContext, useEffect } from "react";
import Feed from "../../components/Feed/Feed";
import NavBar from "../../components/NavBar/NavBar";
import Post from "./Post";
import { UserContext } from "../../ContextAPI/UserContext";
import { useQuery } from "react-query";
import UserStat from "./UserStat";
import TagList from "./TagList";

const Home = () => {
  const { user } = useContext(UserContext);
  // * fetching followed list of logged user * //
  const {
    data: following,
    refetch: followingRefetch,
    isLoading,
  } = useQuery(`following_${user?.user_email}`, () =>
    fetch(`https://ponditi-overflow.herokuapp.com/followings/${user?.user_email}`).then((res) =>
      res.json()
    )
  );

  const { data: feedInfo, refetch: feedInfoRefetch } = useQuery("allAnswers", () =>
    fetch(`https://ponditi-overflow.herokuapp.com/getallanswers`).then((res) => res.json())
  );

  useEffect(() => {
    document.title = "Ponditi-Overflow";
    feedInfoRefetch();
    followingRefetch();
  }, [feedInfoRefetch, followingRefetch]);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <NavBar />{" "}
      {user?.user_email ? (
        <section className="homePageGrid mx-auto gap-3 mt-8">
          <div className="sticky top-20">
            <TagList />
          </div>
          <div>
            <Post />
            {feedInfo?.map((feedInformation, index) => (
              <Feed
                feedInfo={feedInformation}
                feedRefetch={feedInfoRefetch}
                key={index}
                following={following}
                followingRefetch={followingRefetch}
              />
            ))}
          </div>
          <div className="card h-fit sticky top-20 p-5">
            <UserStat />
          </div>
        </section>
      ) : (
        <h1 className="font-semibold text-2xl text-center mt-20">Please Login First!😪</h1>
      )}
    </>
  );
};

export default Home;
