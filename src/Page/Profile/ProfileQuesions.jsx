import React, { useContext, useState } from "react";
import DpMaker from "../../components/DpMaker/DpMaker";
import useUserQuestions from "../../Hooks/useUserQuestions";
import { useParams } from "react-router-dom";
import { MdEditNote } from "react-icons/md";
import { UserContext } from "../../ContextAPI/UserContext";
import Modal from "../../components/Modal/Modal";
import { toastConfig } from "../../components/toastConfig";
import { toast } from "react-toastify";

const ProfileQuesions = () => {
  const { user_email_id } = useParams();
  const questions = useUserQuestions(user_email_id);
  return (
    <section className="">
      <div className="homePageContainer card py-5 mx-auto mt-10 mb-5">
        <h1 className="text-2xl font-semibold text-center pb-2 border-b border-gray-400">
          Your Questions
        </h1>
        {questions.map((question) => (
          <QuestionPost
            question={question}
            key={question.questionId}
            user_email_id={user_email_id}
          />
        ))}
      </div>
    </section>
  );
};

const QuestionPost = ({ question, user_email_id }) => {
  const { question_description, time, question_id } = question;
  const [openModal, setOpenModal] = useState(false);
  const { user } = useContext(UserContext);

  const createAnswer = (e) => {
    e.preventDefault();
    const answer_description = e.target.elements.answerFeild.value;
    const feedback = {
      question_id,
      user_email: user?.user_email,
      answer_description,
    };
    const url = "http://localhost:5500/createanswer";
    console.log(feedback);
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedback),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          toast.success("Answer Submitted", toastConfig);
          e.target.reset();
        }
      });
    setOpenModal(false);
  };

  return (
    <div className="mb-1 border-b border-gray-400 px-5 py-3">
      <h1 className="font-semibold mt-2">{question_description}</h1>
      <p className="text-gray-400 my-1 text-sm">{time}</p>
      <div>
        <button
          className="gap-2 mt-3"
          style={{ display: user?.user_email !== user_email_id ? "flex" : "none" }}
          onClick={() => setOpenModal(true)}
        >
          <MdEditNote className="text-2xl text-gray-400" />{" "}
          <span className="text-gray-400">Answer</span>
        </button>
      </div>
      <Modal title={"Answer Question"} openModal={openModal} setOpenModal={setOpenModal}>
        <div className="p-5">
          <div className="centerY gap-3">
            {user?.img_url !== "null" ? (
              <img src={user?.img_url} alt="" />
            ) : (
              <DpMaker name={user?.user_name} />
            )}
            <div>
              <h1 className="">{user?.user_name}</h1>
              <p className="text-sm text-gray-500">Edit Credential</p>
            </div>
          </div>
          <form onSubmit={createAnswer}>
            <p className="font-semibold mt-5 mb-3 block">{question_description}</p>
            <textarea
              className="w-full py-1 outline-none border-b border-gray-400"
              placeholder="What do you want to ask?"
              name="answerFeild"
              rows={"4"}
            />
            <button className="btn-red">Answer</button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileQuesions;
