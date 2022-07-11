const createNotification = ({ provoker, receiver, mode, answer_id, seen }) => {
  const url = `http://localhost:5500/createnotification`;
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
