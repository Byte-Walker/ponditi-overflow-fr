import { Route, Routes } from "react-router-dom";
import AnswerPage from "./Page/AnswerPage/AnswerPage";
import Home from "./Page/Home/Home";
import Login from "./Page/Login/Login";
import About from "./Page/Profile/About";
import Profile from "./Page/Profile/Profile";
import ProfileAnsers from "./Page/Profile/ProfileAnsers";
import ProfileQuesions from "./Page/Profile/ProfileQuesions";
import Signup from "./Page/Signup/Signup";
import { UserContext } from "./ContextAPI/UserContext";
import { useState } from "react";
import ErrorPage from "./Page/404/ErrorPage";
import SignleQuestion from "./Page/SingleQuestion/SignleQuestion";
import Shared from "./Page/Profile/Shared";
import Following from "./Page/Profile/Following";
import Followers from "./Page/Profile/Followers";

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const manageUser = (data) => {
    setUser(data);
  };
  return (
    <UserContext.Provider value={{ user, manageUser }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/answer" element={<AnswerPage />} />
        <Route path="/question/:question_id" element={<SignleQuestion />} />
        <Route path="/profile/:user_email_id" element={<Profile />}>
          <Route index element={<About />} />
          <Route path="/profile/:user_email_id/answers" element={<ProfileAnsers />} />
          <Route path="/profile/:user_email_id/shared" element={<Shared />} />
          <Route path="/profile/:user_email_id/questions" element={<ProfileQuesions />} />
          <Route path="/profile/:user_email_id/followers" element={<Followers />} />
          <Route path="/profile/:user_email_id/followings" element={<Following />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
