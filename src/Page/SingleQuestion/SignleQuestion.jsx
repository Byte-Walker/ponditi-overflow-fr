import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import DpMaker from "../../components/DpMaker/DpMaker";
import NavBar from "../../components/NavBar/NavBar";
import { UserContext } from "../../ContextAPI/UserContext";
import useGetQuestionInfo from "../../Hooks/useGetQuestionInfo";
import { MdEditNote } from "react-icons/md";
import AnswerModal from "../../components/AnswerModal/AnswerModal";
import Feed from "../../components/Feed/Feed";
import { useQuery } from "react-query";

const SignleQuestion = () => {
  const { question_id } = useParams();
  const { user } = useContext(UserContext);
  const {
    data: answers,
    isLoading: answersLoading,
    refetch: answersRefetch,
  } = useQuery(`answer_${question_id}`, () =>
    fetch(`http://localhost:5500/answers/${question_id}`).then((res) => res.json())
  );

  const question = useGetQuestionInfo(question_id);
  const [openModal, setOpenModal] = useState(false);

  // * fetching followed list of logged user * //
  const { data: following, refetch: followingRefetch } = useQuery(
    `following_${user?.user_email}`,
    () => fetch(`http://localhost:5500/followings/${user?.user_email}`).then((res) => res.json())
  );

  return (
    <>
      <NavBar />
      <div className="homePageContainer mx-auto">
        <div className="card p-5 mt-10">
          <h1 className="font-semibold mb-4 border-b pb-2 border-gray-300">
            {question?.question_description}
          </h1>
          {/* user dp */}
          <div className="w-fit mx-auto">
            {false ? (
              <img src={user?.img_url} alt="" />
            ) : (
              <DpMaker name={user?.user_name} height="70px" fontSize={"50px"} />
            )}
          </div>
          {/* user's info */}
          <p className="text-center mt-4">
            {" "}
            <span className="font-semibold">{user?.user_name}</span>, Can you answer this question?{" "}
            <br />
            <span className="text-gray-400 text-sm">
              People are searching for a better answer to this question.
            </span>
          </p>
          {/* ans button */}

          <button
            className="centerXY gap-1 w-fit mx-auto mt-4 rounded-full bg-blue-100 px-4 py-2 text-blue-600 font-semibold
          hover:scale-110 transition"
            onClick={() => setOpenModal(true)}
          >
            <MdEditNote className="text-2xl" /> Answer
          </button>
          {/* Answer Modal */}
          <AnswerModal
            questionInfo={question}
            setOpenModal={setOpenModal}
            openModal={openModal}
            refetch={answersRefetch}
          />
        </div>
        {/* all answer of that specific quesion */}
        <div className="mt-2">
          {answers?.map((answer, index) => (
            <Feed
              feedInfo={answer}
              key={index}
              following={following}
              followingRefetch={followingRefetch}
              feedRefetch={answersRefetch}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SignleQuestion;
