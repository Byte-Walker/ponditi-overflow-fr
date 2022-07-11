const updateNotification = ({ notification_ids }) => {
  const url = `http://localhost:5500/updatenotificationstatus`;
  const notificationObject = { notification_ids };
  const res = fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(notificationObject),
  }).then((res) => res.json());
  console.log(res);
  return res;
};

export default updateNotification;
