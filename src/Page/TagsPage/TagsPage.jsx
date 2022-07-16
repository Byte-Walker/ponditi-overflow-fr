import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { useQuery } from "react-query";
import { useEffect } from "react";
import QuestionFeed from "../../components/QuestionFeed/QuestionFeed";
import { Spinner } from "flowbite-react";

const TagsPage = () => {
  const { tag_name } = useParams();
  return (
    <>
      <NavBar />
      <section className="mx-auto w-[550px] mt-8">
        <h1 className="card p-5 text-center text-xl text-blue-900 border border-blue-200 mb-3">
          Showing Questions For '<span className="font-semibold">#{tag_name}</span>'
        </h1>
        <TagQuestion tag_name={tag_name} />
      </section>
    </>
  );
};

const TagQuestion = ({ tag_name }) => {
  const {
    data: tagQuestions,
    refetch: tagsQuestionsRefetch,
    isLoading,
  } = useQuery(`tagQuestion_${tag_name}`, () =>
    fetch(`https://ponditi-overflow.herokuapp.com/getquestionsbytagname/${tag_name}`).then((res) =>
      res.json()
    )
  );
  useEffect(() => {
    tagsQuestionsRefetch();
  }, [tag_name, tagsQuestionsRefetch]);

  return (
    <section className="card p-5">
      {isLoading && (
        <div className="p-5 centerXY">
          <Spinner color="info" aria-label="Info spinner example" size="xl" />
        </div>
      )}
      {tagQuestions?.map((question, index) => (
        <QuestionFeed questionData={question} key={index} />
      ))}
    </section>
  );
};

export default TagsPage;
