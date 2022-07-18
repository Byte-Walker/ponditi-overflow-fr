import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import FollowList from "../../components/FollowList/FollowList";
import { Spinner } from "flowbite-react";

const Following = () => {
  const { user_email_id } = useParams();
  // * info of the user whose profile is being visited * //

  const {
    data: follwingList,
    refetch: followingRefetch,
    isLoading: followingListLoading,
  } = useQuery(`following_${user_email_id}`, () =>
    fetch(`https://ponditi-overflow.herokuapp.com/followings/${user_email_id}`).then((res) =>
      res.json()
    )
  );

  useEffect(() => {
    followingRefetch();
  }, [followingRefetch, user_email_id]);

  return (
    <section className="card p-5 ">
      <h1 className="font-semibold border-b pb-2">Followings</h1>
      {followingListLoading && (
        <div className="p-5 centerXY">
          <Spinner color="info" aria-label="Info spinner example" size="xl" />
        </div>
      )}
      <div>
        {follwingList &&
          Object.keys(follwingList).map((following, index) => (
            <FollowList key={index} user_email_id={following} />
          ))}
        {follwingList && Object.keys(follwingList).length === 0 && (
          <h1 className="pt-3 text-center text-lg font-semibold">No Followings Found😞</h1>
        )}
      </div>
    </section>
  );
};

export default Following;
