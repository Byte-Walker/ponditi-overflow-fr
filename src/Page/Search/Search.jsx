import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import QuestionFeed from "../../components/QuestionFeed/QuestionFeed";
import { UserContext } from "../../ContextAPI/UserContext";
import useGetUserFollowing from "../../Hooks/useGetUserFollowing";
import PeopleList from "./PeopleList";
import { Spinner } from "flowbite-react";

const Search = () => {
  const { searchStr } = useParams();
  let str = searchStr.split(" ");
  str = str.filter((st) => st !== "");
  str = str.join("*");

  const { user } = useContext(UserContext);
  // * api call to get userList * //
  const peopleApiUrl = `https://ponditi-overflow.herokuapp.com/search/users/${str}`;
  const {
    data: people,
    refetch: peopleRefetch,
    isLoading: peopleLoading,
  } = useQuery(`search_users_${str}`, () => fetch(peopleApiUrl).then((res) => res.json()));

  // * api call to get questions * //
  const answersApiUrl = `https://ponditi-overflow.herokuapp.com/search/questions/${str}`;
  const {
    data: questions,
    refetch: questionsRefetch,
    isLoading: questionLoading,
  } = useQuery(`search_question_${str}`, () => fetch(answersApiUrl).then((res) => res.json()));

  const { followingUser, followingUserRefetchUser } = useGetUserFollowing(user?.user_email);

  useEffect(() => {
    peopleRefetch();
    questionsRefetch();
  }, [peopleRefetch, questionsRefetch, str]);

  return (
    <>
      <NavBar />
      <section className="homePageContainer mx-auto mt-8">
        <h1 className="card p-5 text-center text-xl text-blue-900 border border-blue-200">
          {questions && people && questions?.length === 0 && people?.length === 0 ? (
            <span>
              Nothing Found for the result of <span className="font-semibold">'{searchStr}'</span>{" "}
            </span>
          ) : (
            <span>
              Result for <span className="font-semibold">'{searchStr}'</span>
            </span>
          )}
        </h1>
        {peopleLoading && questionLoading && (
          <div className="p-5 centerXY">
            <Spinner color="info" aria-label="Info spinner example" size="xl" />
          </div>
        )}
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
                followListUser={followingUser}
                followListUserRefetch={followingUserRefetchUser}
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
