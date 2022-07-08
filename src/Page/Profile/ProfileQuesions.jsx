import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import QuestionFeed from "../../components/QuestionFeed/QuestionFeed";
import { useQuery } from "react-query";

const ProfileQuesions = () => {
  const { user_email_id } = useParams();
  const { data: questions, refetch } = useQuery(`userQuestion${user_email_id}`, () =>
    fetch(`http://localhost:5500/getuserquestions/${user_email_id}`).then((res) => res.json())
  );
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <section className="">
      <div className="homePageContainer card py-5 mx-auto mt-10 mb-5">
        <h1 className="text-2xl font-semibold text-center pb-2 border-b border-gray-400">
          Your Questions
        </h1>
        {questions?.map((question, index) => (
          <QuestionFeed questionData={question} key={index} user_email_id={user_email_id} />
        ))}
      </div>
    </section>
  );
};

// const QuestionPost = ({ question, user_email_id }) => {
//   const { question_description, time, question_id } = question;
//   const [openModal, setOpenModal] = useState(false);
//   const { user } = useContext(UserContext);
//   const answerData = useGetAnswerForQuestion(question_id);
//   const path = useNavigate();

//   // * str * //
//   const strGenerator = (count) => {
//     return count > 1 ? count + " Answers" : count + " Answer";
//   };

//   return (
//     <div className="mb-1 border-b border-gray-400 px-5 py-3">
//       <h1
//         className="font-semibold mt-2 cursor-pointer hover:underline"
//         onClick={() => path(`/question/${question_id}`)}
//       >
//         {question_description}
//       </h1>
//       <p className="text-gray-400 my-1 text-sm">
//         <span className="font-semibold text-gray-500">
//           {answerData.length ? strGenerator(answerData.length) : "No Answer Yet😥"}
//         </span>{" "}
//         - {time}
//       </p>
//       <div>
//         <button
//           className="gap-2 mt-3"
//           style={{ display: user?.user_email !== user_email_id ? "flex" : "none" }}
//           onClick={() => setOpenModal(true)}
//         >
//           <MdEditNote className="text-2xl text-gray-400" />{" "}
//           <span className="text-gray-400">Answer</span>
//         </button>
//       </div>
//       <AnswerModal questionInfo={question} openModal={openModal} setOpenModal={setOpenModal} />
//     </div>
//   );
// };

export default ProfileQuesions;
