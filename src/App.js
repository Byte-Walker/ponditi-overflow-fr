import { Route, Routes } from "react-router-dom";
import Home from "./Page/Home/Home";
import Login from "./Page/Login/Login";
import About from "./Page/Profile/About";
import Profile from "./Page/Profile/Profile";
import ProfileAnsers from "./Page/Profile/ProfileAnsers";
import ProfileQuesions from "./Page/Profile/ProfileQuesions";
import Signup from "./Page/Signup/Signup";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />}>
        <Route index element={<About />} />
        <Route path="/profile/answers" element={<ProfileAnsers />} />
        <Route path="/profile/questions" element={<ProfileQuesions />} />
        <Route path="/profile/followers" />
        <Route path="/profile/followings" />
      </Route>
    </Routes>
  );
};

export default App;
