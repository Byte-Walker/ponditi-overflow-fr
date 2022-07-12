import React from "react";
import { useContext } from "react";
import { UserContext } from "../../ContextAPI/UserContext";
import { useQuery } from "react-query";
import { useState } from "react";
import { useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { RiUserShared2Line } from "react-icons/ri";

const UserStat = () => {
  const { user } = useContext(UserContext);
  const [totalActivities, setTotalActivities] = useState(0);

  // * getting all answer given by user * //
  const { data: answers, refetch: answersRefetch } = useQuery(`answer_${user?.user_email}`, () =>
    fetch(`http://localhost:5500/getuseranswers/${user?.user_email}`).then((res) => res.json())
  );

  // * getting all questions asked by the user * //
  const { data: questions, refetch: questionRefecth } = useQuery(
    `userQuestion${user?.user_email}`,
    () =>
      fetch(`http://localhost:5500/getuserquestions/${user?.user_email}`).then((res) => res.json())
  );

  // * getting all following info * //
  const { data: followingList, refetch: followingListRefetch } = useQuery(
    `following_${user?.user_email}`,
    () => fetch(`http://localhost:5500/followings/${user?.user_email}`).then((res) => res.json())
  );

  // * getting all follower info * //
  const { data: followersList, refetch: followersListRefetch } = useQuery(
    `followers_${user?.user_email}`,
    () => fetch(`http://localhost:5500/followers/${user?.user_email}`).then((res) => res.json())
  );

  useEffect(() => {
    answersRefetch();
    questionRefecth();
    followersListRefetch();
    followingListRefetch();
    if (answers && questions && followersList && followingList) {
      const totalAct =
        answers.length +
        questions.length +
        Object.keys(followersList).length +
        Object.keys(followingList).length;
      setTotalActivities(totalAct);
    }
  }, [
    answersRefetch,
    questionRefecth,
    followersListRefetch,
    followingListRefetch,
    answers,
    questions,
    followersList,
    followingList,
  ]);

  return (
    <section>
      <h1 className="font-semibold text-center mb-5">Your Activities</h1>
      <div className="flex flex-col gap-8">
        <ChildBox
          title={"Answers"}
          count={answers.length}
          buttonContent={<FiEdit />}
          color={"#1C64F2"}
          ratio={(answers.length / totalActivities) * 100}
          textColor={"white"}
        />
        <ChildBox
          title={"Question"}
          count={questions.length}
          buttonContent={<FaRegQuestionCircle />}
          color={"#e67e22"}
          ratio={(questions.length / totalActivities) * 100}
          textColor={"white"}
        />
        <ChildBox
          title={"Followers"}
          count={followersList && Object.keys(followersList).length}
          buttonContent={<FiUsers />}
          color={"#c0392b"}
          ratio={followersList && (Object.keys(followersList).length / totalActivities) * 100}
          textColor={"white"}
        />

        <ChildBox
          title={"Followings"}
          count={followingList && Object.keys(followingList).length}
          buttonContent={<RiUserShared2Line />}
          color={"#8e44ad"}
          ratio={followingList && (Object.keys(followingList).length / totalActivities) * 100}
          textColor={"white"}
        />
      </div>
    </section>
  );
};

const ChildBox = ({ title, count, buttonContent, color, ratio, textColor }) => {
  return (
    <div>
      <div className="flex items-start justify-between">
        <div className="mt-1">
          <p>{title}</p>
          <h1 className="text-3xl font-bold">{count}</h1>
        </div>
        <button
          className="w-[40px] h-[40px] rounded-full centerXY text-xl"
          style={{ backgroundColor: color, color: textColor }}
        >
          {buttonContent}
        </button>
      </div>
      <ProgressBar color={color} ratio={ratio} />
    </div>
  );
};

const ProgressBar = ({ color, ratio }) => {
  if (!ratio) {
    return null;
  }
  return (
    <>
      <div className="centerY justify-between text-sm mt-2">
        <p>Ratio</p>
        <p>{ratio.toFixed(2)}%</p>
      </div>
      <div className="h-[7px] bg-gray-300 py-[1px] rounded-full overflow-hidden">
        <div className="h-[5px]" style={{ backgroundColor: color, width: `${ratio}%` }}>
          &nbsp;
        </div>
      </div>
    </>
  );
};

export default UserStat;
