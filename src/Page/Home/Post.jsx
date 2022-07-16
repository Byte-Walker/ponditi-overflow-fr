import React, { useContext, useState } from "react";
import { BsQuestionSquare } from "react-icons/bs";
import { VscNotebook } from "react-icons/vsc";
import Modal from "../../components/Modal/Modal";
import { toast } from "react-toastify";
import { toastConfig } from "../../components/toastConfig";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../ContextAPI/UserContext";
import UserDP from "../../components/UserDP/UserDP";
import { useQuery } from "react-query";
import useGetTags from "../../Hooks/useGetTags";

const Post = () => {
  const [postModal, setPostModal] = useState(false);
  const { user } = useContext(UserContext);
  const path = useNavigate();
  const { tagsRefetch } = useGetTags();
  // * getting all questions asked by the user * //
  const { refetch: questionRefecth } = useQuery(`userQuestion${user?.user_email}`, () =>
    fetch(`http://localhost:5500/getuserquestions/${user?.user_email}`).then((res) => res.json())
  );

  const askHandler = (e) => {
    e.preventDefault();
    const question_description = e.target.elements.askingFelid.value;
    let tags = e.target.elements.taglist.value;
    tags = tags.split(",");
    tags = tags.map((tag) => tag.trim());
    console.log(tags);

    const quesInfo = {
      user_email: user?.user_email,
      question_description,
      tags,
    };
    const url = `http://localhost:5500/createquestion`;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quesInfo),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          toast.success("You question has been published", toastConfig);
          setPostModal(false);
          questionRefecth();
          tagsRefetch();
          e.target.reset();
        }
      });
  };

  return (
    <section className="card mb-3 py-5">
      <div className="centerY gap-5 border-b border-gray-300 px-5 pb-3">
        {/* user's dp */}
        <div>
          <UserDP dimension={"50px"} user_name={user?.user_name} img_url={user?.img_url} />
        </div>

        {/* post box */}
        <div className="input rounded-full" onClick={() => setPostModal(true)}>
          <h1>What do you want to ask?</h1>
          <Modal openModal={postModal} setOpenModal={setPostModal} title="What Do You Want to Ask?">
            <form className="p-5" onSubmit={askHandler}>
              {/* tips starts */}
              <div className="bg-blue-100 text-blue-600 text-sm p-3 mb-3">
                <h1 className="font-semibold text-base">Tips on getting good answers quickly</h1>
                <div className="px-4">
                  <ul className="list-disc">
                    <li>Make sure your question has not been asked already</li>
                    <li>Keep your question short and to the point</li>
                    <li>Double-check grammar and spelling</li>
                    <li>
                      Use lower case for tag name , put a (#) infront of a tag, separate each tag
                      with comma ( , ) and use underscore if the tag is more than a word.
                    </li>
                  </ul>
                </div>
              </div>
              {/* tips ends */}
              <input
                type="text"
                className="rounded-lg border-b border-gray-400 w-full mb-3"
                placeholder="# Taglist"
                name="taglist"
                required
              />
              {/* <TagSuggestion /> */}
              <textarea
                className="w-full h-fit min-h-[40px] px-5 py-3 outline-none border-b border-gray-400 rounded-lg"
                placeholder="What do you want to ask?"
                name="askingFelid"
                rows={"4"}
                required
              />
              <div className="w-fit ml-auto mt-3 flex gap-5">
                <button className="btnFade transitionCLass" onClick={() => setPostModal(false)}>
                  Cancel
                </button>
                <button className="btn-red transitionCLass hover:bg-blue-700">Ask Question</button>
              </div>
            </form>
          </Modal>
        </div>
      </div>
      <div className="grid grid-cols-2 pt-2 px-5">
        <button
          className="centerXY transition hover:bg-gray-300 py-1 rounded"
          onClick={() => setPostModal(true)}
        >
          <BsQuestionSquare /> &nbsp; Ask
        </button>
        <button
          className="centerXY transition hover:bg-gray-300 py-1 rounded"
          onClick={() => path("/answer")}
        >
          <VscNotebook /> &nbsp; Answer
        </button>
      </div>
    </section>
  );
};

export default Post;
