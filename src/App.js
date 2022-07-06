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
        <Route path="/profile" element={<Profile />}>
          <Route index element={<About />} />
          <Route path="/profile/answers" element={<ProfileAnsers />} />
          <Route path="/profile/questions" element={<ProfileQuesions />} />
          <Route path="/profile/followers" />
          <Route path="/profile/followings" />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
