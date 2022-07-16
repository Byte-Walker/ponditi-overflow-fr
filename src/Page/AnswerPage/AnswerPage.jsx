import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import QuestionFeed from "../../components/QuestionFeed/QuestionFeed";
import { useQuery } from "react-query";
import { Spinner } from "flowbite-react";

const AnswerPage = () => {
  const { data: allQuestion, isLoading } = useQuery("allQuestion", () =>
    fetch(`https://ponditi-overflow.herokuapp.com/getallquestions`).then((res) => res.json())
  );

  return (
    <>
      <NavBar />
      <section className="homePageContainer shadow-lg card py-5 mx-auto mt-8 mb-5">
        {allQuestion?.length === 0 ? (
          <h1 className="text-center font-semibold ">No Question Found Yet😞</h1>
        ) : (
          <div className="">
            <h1 className="text-2xl font-bold text-center text-blue-900 pb-4 mb-2 border-b border-blue-300">
              Question For You 🤔
            </h1>
            {isLoading && (
              <div className="p-5 centerXY">
                <Spinner color="info" aria-label="Info spinner example" size="xl" />
              </div>
            )}
            {allQuestion?.map((question) => (
              <QuestionFeed key={question?.question_id} questionData={question} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default AnswerPage;
