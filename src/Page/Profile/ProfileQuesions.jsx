import React from "react";
import DpMaker from "../../components/DpMaker/DpMaker";

const ProfileQuesions = () => {
  const questionData = [
    {
      questionId: "q1",
      name: "Faisal Ahmed",
      time: "22 Jun 2022 at 8:10 PM",
      ques_desc: "I wanna get married but nobody gives a fuck about me. What sould I do?",
    },
    {
      questionId: "q2",
      name: "Faisal Imran",
      time: "22 Jun 2022 at 8:10 PM",
      ques_desc: "I wanna get married but nobody gives a fuck about me. What sould I do?",
    },
  ];
  return (
    <section className="">
      {questionData.map((questionDataSingle) => (
        <QuestionPost questionData={questionDataSingle} key={questionDataSingle.questionId} />
      ))}
    </section>
  );
};

const QuestionPost = ({ questionData }) => {
  const { name, ques_desc, time } = questionData;
  return (
    <div className="card p-5 mb-3">
      <div className="centerY gap-3 mb-2">
        {false ? <img src="" alt="" /> : <DpMaker name={name} />}
        <div>
          <h1 className="font-semibold text-lg">{name}</h1>
          <h3 className="text-sm text-gray-400">{time}</h3>
        </div>
      </div>
      <h3>{ques_desc}</h3>
    </div>
  );
};

export default ProfileQuesions;
