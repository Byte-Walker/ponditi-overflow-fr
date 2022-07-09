import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";

const Search = () => {
  const { searchStr } = useParams();
  let str = searchStr.split(" ");
  str = str.filter((st) => st !== "");
  str = str.join("*");

  // api call will be there
  const url = ``;
  // const { data, refetch } = useQuery(`search_${str}`, () => fetch(url).then((res) => res.json()));
  const test = {
    user: ["test", "No"],
    email: {},
  };
  useEffect(() => {}, []);

  return (
    <>
      <NavBar />
      <section className="homePageContainer mx-auto mt-10">
        <div className="card p-5">
          <h1>People</h1>
        </div>
        <div>
          <h1>Answers</h1>
        </div>
      </section>
    </>
  );
};

export default Search;
