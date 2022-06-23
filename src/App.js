import { Route, Routes } from "react-router-dom";
import Login from "./Page/Login/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default App;
