import { Route, Routes } from "react-router-dom";
import Login from "./Page/Login/Login";
import Signup from "./Page/Signup/Signup";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default App;
