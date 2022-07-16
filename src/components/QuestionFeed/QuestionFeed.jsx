import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEditNote } from "react-icons/md";
import AnswerModal from "../AnswerModal/AnswerModal";
import { useQuery } from "react-query";

const QuestionFeed = ({ questionData }) => {
  const { question_description, time, question_id } = questionData;
  const [openModal, setOpenModal] = useState(false);

  const { data: answerData, refetch } = useQuery(`answer${question_id}`, () =>
    fetch(`http://localhost:5500/answers/${question_id}`).then((res) => res.json())
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  const path = useNavigate();
  // * str * //
  const strGenerator = (count) => {
    return count > 1 ? count + " Answers" : count + " Answer";
  };

  return (
    <div className="mb-1 border-b px-5 py-3">
      <h1
        className="font-semibold mt-2 cursor-pointer hover:underline transition"
        onClick={() => path(`/question/${question_id}`)}
      >
        {question_description}
      </h1>

      <p className="text-gray-400 my-1 text-sm centerY gap-3 flex-wrap">
        <span className="font-semibold text-gray-500">
          {answerData?.length ? strGenerator(answerData?.length) : "No Answer Yet😥"}
        </span>{" "}
        - {time}
      </p>
      <div>
        <button className="centerY gap-2 mt-3" onClick={() => setOpenModal(true)}>
          <MdEditNote className="text-2xl text-gray-400" />{" "}
          <span className="text-gray-400">Answer</span>
        </button>
      </div>
      <div className="flex items-center gap-2 mt-3">
        Topic : <ShowTaglist list={questionData?.tags} />
      </div>
      <AnswerModal
        questionInfo={questionData}
        openModal={openModal}
        setOpenModal={setOpenModal}
        refetch={refetch}
      />
    </div>
  );
};

const ShowTaglist = ({ list }) => {
  let tagList = list && list.split(",");
  tagList = tagList?.map((tag) => tag.trim());
  const path = useNavigate();

  return (
    <div className="flex flex-wrap gap-2 cursor-pointer">
      {tagList?.map((tag, index) => (
        <p
          key={index}
          className="hover:underline font-semibold"
          onClick={() => path(`/tags/${tag.slice(1)}`)}
        >
          {" "}
          {tag}
        </p>
      ))}
    </div>
  );
};

export default QuestionFeed;
