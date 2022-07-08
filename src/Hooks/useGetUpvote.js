import React, { useEffect, useState } from "react";

const useGetUpvote = (answer_id) => {
  const [upvoteInfo, setUpvoteInfo] = useState({});
  useEffect(() => {
    const url = `http://localhost:5500/upvoters/${answer_id}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => setUpvoteInfo(res));
  }, [answer_id, setUpvoteInfo]);
  return [upvoteInfo, setUpvoteInfo];
};

export default useGetUpvote;
