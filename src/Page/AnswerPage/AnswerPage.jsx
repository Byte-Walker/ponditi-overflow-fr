import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { MdEditNote } from "react-icons/md";
import { UserContext } from "../../ContextAPI/UserContext";
import useGetAnswerForQuestion from "../../Hooks/useGetAnswerForQuestion";
import { useNavigate } from "react-router-dom";
import AnswerModal from "../../components/AnswerModal/AnswerModal";

const AnswerPage = () => {
  const [allQuestion, setAllQuestion] = useState([]);
  const { user } = useContext(UserContext);
  useEffect(() => {
    const url = "http://localhost:5500/getallquestions";
    fetch(url)
      .then((res) => res.json())
      .then((res) => setAllQuestion(res));
  }, []);

  return (
    <section>
      <NavBar />
      <div className="homePageContainer card py-5 mx-auto mt-10 mb-5">
        <h1 className="text-2xl font-semibold text-center pb-2 border-b border-gray-400">
          Question For You 🤔
        </h1>
        {allQuestion.map((question) => (
          <QuestionFeed
            key={question?.question_id}
            questionData={question}
            user_name={user?.user_name}
            img_url={user?.img_url}
            user_email={user?.user_email}
          />
        ))}
      </div>
    </section>
  );
};

const QuestionFeed = ({ questionData, user_name, img_url, user_email }) => {
  const { question_description, time, question_id } = questionData;
  const [openModal, setOpenModal] = useState(false);
  const answerData = useGetAnswerForQuestion(question_id);
  const path = useNavigate();

  // * str * //
  const strGenerator = (count) => {
    return count > 1 ? count + " Answers" : count + " Answer";
  };
  return (
    <div className="mb-1 border-b border-gray-400 px-5 py-3">
      <h1
        className="font-semibold mt-2 cursor-pointer hover:underline transition"
        onClick={() => path(`/question/${question_id}`)}
      >
        {question_description}
      </h1>
      <p className="text-gray-400 my-1 text-sm">
        <span className="font-semibold text-gray-500">
          {answerData.length ? strGenerator(answerData.length) : "No Answer Yet😥"}
        </span>{" "}
        - {time}
      </p>
      <div>
        <button className="centerY gap-2 mt-3" onClick={() => setOpenModal(true)}>
          <MdEditNote className="text-2xl text-gray-400" />{" "}
          <span className="text-gray-400">Answer</span>
        </button>
      </div>
      <AnswerModal questionInfo={questionData} openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};

export default AnswerPage;
