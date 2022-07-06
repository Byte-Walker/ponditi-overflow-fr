import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import DpMaker from "../../components/DpMaker/DpMaker";
import { UserContext } from "../../ContextAPI/UserContext";

const ProfileQuesions = () => {
  const { user } = useContext(UserContext);
  useEffect(() => {
    const url = `http://localhost:5500/getuserquestions/${user?.user_email}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setQuestiondata(res);
        console.log(res);
      });
  }, []);

  const [questionData, setQuestiondata] = useState([]);
  return (
    <section className="">
      {questionData.map((questionDataSingle) => (
        <QuestionPost questionData={questionDataSingle} key={questionDataSingle.questionId} />
      ))}
    </section>
  );
};

const QuestionPost = ({ questionData }) => {
  const { user_name, question_description, time } = questionData;
  return (
    <div className="card p-5 mb-3">
      <div className="centerY gap-3 mb-2">
        {false ? <img src="" alt="" /> : <DpMaker name={user_name} />}
        <div>
          <h1 className="font-semibold text-lg">{user_name}</h1>
          <h3 className="text-sm text-gray-400">{time}</h3>
        </div>
      </div>
      <h3>{question_description}</h3>
    </div>
  );
};

export default ProfileQuesions;
