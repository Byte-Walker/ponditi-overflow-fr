import { useEffect, useState } from "react";

const useGetUpvote = (answer_id) => {
  const [upvoteInfo, setUpvoteInfo] = useState({});
  useEffect(() => {
    const url = `https://ponditi-overflow.herokuapp.com/upvoters/${answer_id}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => setUpvoteInfo(res));
  }, [answer_id, setUpvoteInfo]);
  return [upvoteInfo, setUpvoteInfo];
};

export default useGetUpvote;
