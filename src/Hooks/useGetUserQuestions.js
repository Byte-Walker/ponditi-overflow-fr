import { useQuery } from "react-query";

const useUserQuestions = (user_email_id) => {
  const {
    data: userQuestion,
    refetch: userQuestionRefetch,
    isLoading: userQuestionLoading,
  } = useQuery(`userQuestion_${user_email_id}`, () =>
    fetch(`https://ponditi-overflow.herokuapp.com/getuserquestions/${user_email_id}`).then((res) =>
      res.json()
    )
  );
  return { userQuestion, userQuestionRefetch, userQuestionLoading };
};

export default useUserQuestions;
