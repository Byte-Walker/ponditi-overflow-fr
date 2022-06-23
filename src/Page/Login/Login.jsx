import React, { useState } from "react";
import Input from "../../components/Input";

const Login = () => {
  const [userName, setUserName] = useState("");
  return (
    <section>
      <div>
        <h1>Log in here mf</h1>
        <Input type={"text"} title={"UserName"} value={userName} setValue={setUserName} />
      </div>
    </section>
  );
};

export default Login;
