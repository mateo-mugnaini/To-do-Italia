import { useState } from "react";
import Login from "./components/login";
import Register from "./components/register";

const AuthPage = () => {
  const [login, setLogin] = useState(true);

  const handleShowModal = () => {
    setLogin(!login);
  };

  return (
    <div>
      <div>
        {login ? (
          <Login handleChangeModal={handleShowModal} />
        ) : (
          <Register handleChangeModal={handleShowModal} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
