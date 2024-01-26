import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  const onDemoUser = async () => {
    const data = await dispatch(login("demo@aa.io", "password"));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  return (
    <div className="login-modal-div">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-label-input-div">
          <label className="login-label">Email :</label>
          <input
            className="login-input-text"
            type="text"
            placeholder="Your Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="login-label-input-div">
          <label className="login-label">Password :</label>
          <input
            className="login-input-text"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="login-btn" type="submit">
          Sign In
        </button>
      </form>

      <button onClick={onDemoUser} className="demo-user-btn">
        Demo User
      </button>

      {errors && errors["email"] && (
        <p className="p-error">{errors["email"]}</p>
      )}
      {errors && errors["password"] && (
        <p className="p-error">{errors["password"]}</p>
      )}
    </div>
  );
}

export default LoginFormModal;
