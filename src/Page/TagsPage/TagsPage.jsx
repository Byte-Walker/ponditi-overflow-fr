import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { useQuery } from "react-query";
import { useEffect } from "react";
import QuestionFeed from "../../components/QuestionFeed/QuestionFeed";

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
  const { data: tagQuestions, refetch: tagsQuestionsRefetch } = useQuery(
    `tagQuestion_${tag_name}`,
    () => fetch(`http://localhost:5500/getquestionsbytagname/${tag_name}`).then((res) => res.json())
  );
  useEffect(() => {
    tagsQuestionsRefetch();
  }, [tag_name, tagsQuestionsRefetch]);

  return (
    <section className="card p-5">
      {tagQuestions?.map((question, index) => (
        <QuestionFeed questionData={question} key={index} />
      ))}
    </section>
  );
};

export default TagsPage;
