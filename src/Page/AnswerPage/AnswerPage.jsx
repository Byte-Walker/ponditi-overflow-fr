import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { VscNotebook } from "react-icons/vsc";
import Modal from "../../components/Modal/Modal";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../components/firebase.init";
import DpMaker from "../../components/DpMaker/DpMaker";
import { toast } from "react-toastify";
import { toastConfig } from "../../components/toastConfig";

const AnswerPage = () => {
  const [allQuestion, setAllQuestion] = useState([]);
  const [user] = useAuthState(auth);
  useEffect(() => {
    const url = "http://localhost:5500/getallquestions";
    const getData = async () => {
      const { data } = await axios.get(url);
      console.log(data);
      setAllQuestion(data);
    };
    getData();
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
            questionData={question}
            user_name={user?.displayName}
            img_url={user?.photoURL}
            user_email={user?.email}
          />
        ))}
      </div>
    </section>
  );
};

const QuestionFeed = ({ questionData, user_name, img_url, user_email }) => {
  const { question_description, time, question_id } = questionData;
  const [openModal, setOpenModal] = useState(false);

  const createAnswer = (e) => {
    e.preventDefault();
    const answer_description = e.target.elements.answerFeild.value;
    const feedback = {
      question_id,
      user_email,
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
    <div className="mb-1 border-b border-gray-400 px-5 py-1">
      <h1 className="font-semibold mt-2">{question_description}</h1>
      <p className="text-gray-500 my-1 text-sm">{time}</p>
      <div>
        <button className="centerY gap-2 mt-3" onClick={() => setOpenModal(true)}>
          <VscNotebook className="text-lg text-blue-500" /> <span>Answer</span>
        </button>
      </div>
      <Modal title={"Answer Question"} openModal={openModal} setOpenModal={setOpenModal}>
        <div className="p-5">
          <div className="centerY gap-3">
            {img_url ? <img src={img_url} alt="" /> : <DpMaker name={user_name} />}
            <div>
              <h1 className="">{user_name}</h1>
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

export default AnswerPage;
