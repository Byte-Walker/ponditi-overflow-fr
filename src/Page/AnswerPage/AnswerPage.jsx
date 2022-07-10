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
      <div className="homePageContainer shadow-lg card py-5 mx-auto mt-10 mb-5">
        <h1 className="text-2xl font-bold text-center text-blue-900 pb-4 mb-2 border-b border-blue-300">
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
