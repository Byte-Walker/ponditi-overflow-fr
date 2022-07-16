const updateNotification = ({ notification_ids }) => {
  const url = `https://ponditi-overflow.herokuapp.com/updatenotificationstatus`;
  const notificationObject = { notification_ids };
  const res = fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(notificationObject),
  }).then((res) => res.json());
  return res;
};

export default updateNotification;
