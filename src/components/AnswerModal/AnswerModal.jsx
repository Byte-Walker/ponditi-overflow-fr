import React, { useContext } from "react";
import { UserContext } from "../../ContextAPI/UserContext";
import { toast } from "react-toastify";
import { toastConfig } from "../toastConfig";
import Modal from "../Modal/Modal";
import UserDP from "../UserDP/UserDP";

const AnswerModal = ({ questionInfo, setOpenModal, openModal, refetch }) => {
  const { user } = useContext(UserContext);
  // * answer handler * //

  const createAnswer = (e) => {
    e.preventDefault();
    const answer_description = e.target.elements.answerFeild.value;
    const feedback = {
      question_id: questionInfo?.question_id,
      user_email: user?.user_email,
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
          refetch();
        }
      });
    setOpenModal(false);
  };

  return (
    <Modal title={"Answer Question"} openModal={openModal} setOpenModal={setOpenModal}>
      <div className="p-5">
        <div className="centerY gap-3">
          <UserDP
            dimension={"60px"}
            img_url={user?.img_url}
            user_name={user?.user_name}
            fontSize={"40px"}
          />

          <div>
            <h1 className="">{user?.user_name}</h1>
            <p className="text-sm text-gray-500">Edit Credential</p>
          </div>
        </div>
        <form onSubmit={createAnswer}>
          <p className="font-semibold mt-5 mb-3 block">{questionInfo?.question_description}</p>
          <textarea
            className="w-full py-1 outline-none border-b border-gray-400"
            placeholder="What do you want to ask?"
            name="answerFeild"
            required
            rows={"4"}
          />
          <div className="w-fit ml-auto mt-3 flex gap-5">
            <button className="btnFade transitionCLass" onClick={() => setOpenModal(false)}>
              Cancel
            </button>
            <button className="btn-red transitionCLass hover:bg-red-700">Ask Question</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AnswerModal;
