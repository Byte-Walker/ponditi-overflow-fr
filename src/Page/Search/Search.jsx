import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import QuestionFeed from "../../components/QuestionFeed/QuestionFeed";
import { UserContext } from "../../ContextAPI/UserContext";
import PeopleList from "./PeopleList";

const Search = () => {
  const { searchStr } = useParams();
  let str = searchStr.split(" ");
  str = str.filter((st) => st !== "");
  str = str.join("*");

  const { user } = useContext(UserContext);
  // * api call to get userList * //
  const peopleApiUrl = `http://localhost:5500/search/users/${str}`;
  const { data: people, refetch: peopleRefetch } = useQuery(`search_users_${str}`, () =>
    fetch(peopleApiUrl).then((res) => res.json())
  );

  // * api call to get questions * //
  const answersApiUrl = `http://localhost:5500/search/questions/${str}`;
  const { data: questions, refetch: questionsRefetch } = useQuery(`search_question_${str}`, () =>
    fetch(answersApiUrl).then((res) => res.json())
  );

  const {
    data: followListUser,
    isLoading: followListLoading,
    refetch: followListUserRefetch,
  } = useQuery(`following_${user?.user_email}`, () =>
    fetch(`http://localhost:5500/followings/${user?.user_email}`).then((res) => res.json())
  );

  useEffect(() => {
    peopleRefetch();
    questionsRefetch();
  }, [peopleRefetch, questionsRefetch]);

  if (followListLoading) {
    return null;
  }

  return (
    <>
      <NavBar />
      <section className="homePageContainer mx-auto mt-8">
        <h1 className="card p-5 text-center text-xl text-blue-900 border border-blue-200">
          {questions && people && questions.length === 0 && people.length === 0 ? (
            <span>
              Nothing Found for the result of <span className="font-semibold">'{searchStr}'</span>{" "}
            </span>
          ) : (
            <span>
              Result for <span className="font-semibold">'{searchStr}'</span>
            </span>
          )}
        </h1>
        {/* people */}
        {people && people.length !== 0 && (
          <div className="card mt-5 py-4 border border-blue-100">
            <h1 className="font-bold mb-3 border-b  px-5 pb-4 border-blue-300 text-2xl text-blue-900">
              People
            </h1>
            {people?.map((person, index) => (
              <PeopleList
                key={index}
                userInfo={person}
                user={user}
                followListUser={followListUser}
                followListUserRefetch={followListUserRefetch}
              />
            ))}
          </div>
        )}

        {/* Answers */}
        {questions && questions.length !== 0 && (
          <div className="card mt-5 py-4 border border-blue-100 shadow-xl shadow-blue-50 mb-8">
            <h1 className="font-bold mb-3 border-b px-5 pb-4 border-blue-300 text-2xl text-blue-900">
              Questions
            </h1>
            {questions?.map((question, index) => (
              <QuestionFeed key={index} questionData={question} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Search;
