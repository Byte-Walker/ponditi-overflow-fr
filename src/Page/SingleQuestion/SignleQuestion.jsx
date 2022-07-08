import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import DpMaker from "../../components/DpMaker/DpMaker";
import NavBar from "../../components/NavBar/NavBar";
import { UserContext } from "../../ContextAPI/UserContext";
import useGetAnswerForQuestion from "../../Hooks/useGetAnswerForQuestion";
import useGetQuestionInfo from "../../Hooks/useGetQuestionInfo";
import { MdEditNote } from "react-icons/md";
import AnswerModal from "../../components/AnswerModal/AnswerModal";
import Feed from "../../components/Feed/Feed";

const SignleQuestion = () => {
  const { question_id } = useParams();
  const answers = useGetAnswerForQuestion(question_id);
  const { user } = useContext(UserContext);
  const question = useGetQuestionInfo(question_id);
  const [openModal, setOpenModal] = useState(false);

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
          <AnswerModal questionInfo={question} setOpenModal={setOpenModal} openModal={openModal} />
        </div>
        {/* all answer of that specific quesion */}
        <div className="mt-2">
          {answers.map((answer) => (
            <Feed feedInfo={answer} key={answer.answer_id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SignleQuestion;
