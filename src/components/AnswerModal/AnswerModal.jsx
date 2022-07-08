import React, { useContext } from "react";
import { UserContext } from "../../ContextAPI/UserContext";
import { toast } from "react-toastify";
import { toastConfig } from "../toastConfig";
import Modal from "../Modal/Modal";
import DpMaker from "../DpMaker/DpMaker";
import { useQueryClient } from "react-query";

const AnswerModal = ({ questionInfo, setOpenModal, openModal }) => {
  const { user } = useContext(UserContext);
  const { user_name, user_email, img_url } = user;
  const queryClient = useQueryClient();

  // * answer handler * //
  const createAnswer = (e) => {
    e.preventDefault();
    const answer_description = e.target.elements.answerFeild.value;
    const feedback = {
      question_id: questionInfo?.question_id,
      user_email,
      answer_description,
    };

    // * sending answer's info to the server * //
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
          queryClient.invalidateQueries("allQuestion");
        }
      });
    setOpenModal(false);
  };
  return (
    <Modal title={"Answer Question"} openModal={openModal} setOpenModal={setOpenModal}>
      <div className="p-5">
        <div className="centerY gap-3">
          {img_url !== "null" ? <img src={img_url} alt="" /> : <DpMaker name={user_name} />}
          <div>
            <h1 className="">{user_name}</h1>
            <p className="text-sm text-gray-500">Edit Credential</p>
          </div>
        </div>
        <form onSubmit={createAnswer}>
          <p className="font-semibold mt-5 mb-3 block">{questionInfo?.question_description}</p>
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
  );
};

export default AnswerModal;
