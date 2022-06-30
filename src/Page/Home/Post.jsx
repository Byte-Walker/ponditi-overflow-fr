import React, { useState } from "react";
import DpMaker from "../../components/DpMaker/DpMaker";
import { BsQuestionSquare } from "react-icons/bs";
import { VscNotebook } from "react-icons/vsc";
import Modal from "../../components/Modal/Modal";
const Post = () => {
  const [postModal, setPostModal] = useState(false);
  return (
    <section className="mb-3 rounded-lg shadow border bg-white py-3 border-gray-200">
      <div className="centerY gap-5 border-b border-gray-300 px-5 pb-3">
        {/* user's dp */}
        <div>{false ? <img src="" alt="" /> : <DpMaker name={"Faisal Ahmed"} />}</div>
        {/* post box */}
        <div className="input rounded-full" onClick={() => setPostModal(true)}>
          <h1>What do you want to ask?</h1>
          <Modal openModal={postModal} setOpenModal={setPostModal} title="What Do You Want to Ask?">
            <div className="p-5">
              <div className="bg-blue-100 text-blue-600 text-sm p-3 mb-3">
                <h1 className="font-semibold text-base">Tips on getting good answers quickly</h1>
                <div className="px-4">
                  <ul className="list-disc">
                    <li>Make sure your question has not been asked already</li>
                    <li>Keep your question short and to the point</li>
                    <li>Double-check grammar and spelling</li>
                  </ul>
                </div>
              </div>
              <textarea
                className="w-full h-fit min-h-[40px] px-5 py-3 outline-none border-b border-gray-400"
                placeholder="What do you want to ask?"
                rows={"4"}
              />
              <button className="btn-red">Ask</button>
            </div>
          </Modal>
        </div>
      </div>
      <div className="grid grid-cols-2 pt-2 px-5">
        <button
          className="centerXY hover:bg-gray-300 py-1 rounded"
          onClick={() => setPostModal(true)}
        >
          <BsQuestionSquare /> &nbsp; Ask
        </button>
        <button className="centerXY hover:bg-gray-300 py-1 rounded">
          <VscNotebook /> &nbsp; Answer
        </button>
      </div>
    </section>
  );
};

export default Post;
