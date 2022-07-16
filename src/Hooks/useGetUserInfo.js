import { useQuery } from "react-query";

const useGetUserInfo = (user_email) => {
  const {
    data: userInfo,
    refetch: userInfoRefetch,
    isLoading: userInfoLoading,
  } = useQuery(`userInfo_${user_email}`, () =>
    fetch(`https://ponditi-overflow.herokuapp.com/profile/${user_email}`).then((res) => res.json())
  );
  return { userInfo, userInfoRefetch, userInfoLoading };
};

export default useGetUserInfo;
