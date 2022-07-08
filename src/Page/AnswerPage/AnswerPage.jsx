import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import QuestionFeed from "../../components/QuestionFeed/QuestionFeed";
import { useQuery } from "react-query";

const AnswerPage = () => {
  const { data: allQuestion } = useQuery("allQuestion", () =>
    fetch(`http://localhost:5500/getallquestions`).then((res) => res.json())
  );

  return (
    <section>
      <NavBar />
      <div className="homePageContainer card py-5 mx-auto mt-10 mb-5">
        <h1 className="text-2xl font-semibold text-center pb-2 border-b border-gray-400">
          Question For You 🤔
        </h1>
        {allQuestion?.map((question) => (
          <QuestionFeed key={question?.question_id} questionData={question} />
        ))}
      </div>
    </section>
  );
};

export default AnswerPage;
