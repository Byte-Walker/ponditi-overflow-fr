import { useQuery } from "react-query";

const useGetUserFollowing = (user_email) => {
  const {
    data: followingUser,
    refetch: followingUserRefetchUser,
    isLoading: followingUserLoading,
  } = useQuery(`following_${user_email}`, () =>
    fetch(`https://ponditi-overflow.herokuapp.com/followings/${user_email}`).then((res) =>
      res.json()
    )
  );
  return { followingUser, followingUserRefetchUser, followingUserLoading };
};

export default useGetUserFollowing;
