const createNotification = ({ provoker, receiver, mode, answer_id, seen }) => {
  const url = `https://ponditi-overflow.herokuapp.com/createnotification`;
  if (provoker === receiver) {
    return;
  }
  const notificationContent = {
    provoker,
    receiver,
    mode,
    answer_id,
    seen,
  };

  const res = fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(notificationContent),
  }).then((res) => res.json());

  return res;
};

export default createNotification;
