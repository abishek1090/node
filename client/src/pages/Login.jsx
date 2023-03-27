import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import { user } from "../features/slice";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [err, setError] = useState({});
  const [serverError, setServerError] = useState(null);
  const [username, setUsername] = useState({
    username: ""
  });
  const [password, setPassword] = useState({
    password: "",
    showPassword: false,
  });
  const dispatch = useDispatch();

  const handleClickShowPassword = () => {
    setPassword({ ...password, showPassword: !password.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const handleUsernameChange = (e) => {
    setUsername({ ...username, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);
    var inputs = {
      username: username.username, password: password.password
    }
    setError(validate(inputs));
    if (username.username !== '' && password.password !== '') {
      try {

        const response = await axios.post('https://api-wi31.onrender.com/api/auth/login', inputs, { withCredentials: true });

        dispatch(user(response.data.user.username));
        navigate("/home");
      } catch (err) {
        setServerError(err.response.data);
      }
    }
  }
  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username is required!"
    }
    if (!values.password) {
      errors.password = "Password is required!"
    }
    return errors;
  }
  const clientId = "178073120610-37o8quh3tv2n44i41q06apg04gk7mvag.apps.googleusercontent.com";
  const googleAuth = async () => {
    window.open(
      `https://api-wi31.onrender.com/auth/google/callback`,
      "_self"
    );
  };
  const logins = useGoogleLogin({
    onSuccess: async respose => {
      try {
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            "Authorization": `Bearer ${respose.access_token}`
          }
        })
        dispatch(user(res.data.given_name));
        window.open(
          `https://api-wi31.onrender.com/auth/google/callback`,
          "_self"
        );
      } catch (err) {
        console.log(err)

      }

    }
  });
  return (
    <div className="auth">
      <h1 className="heading">MERN Community</h1>
      <h1>Login</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"

          onChange={handleUsernameChange}
        />
        <p>{err.username}</p>
        <Input
          required
          type={password.showPassword ? "text" : "password"}
          placeholder="password"
          name="password"
          onChange={handlePasswordChange}
          value={password.password}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                style={{ height: "25px", width: "25px" }}

              >
                {password.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        <p>{err.password}</p>
        <button onClick={handleSubmit}>Login</button>

        {serverError && <p style={{ fontSize: '15px' }}>{serverError}</p>}
        <span>or</span>
        <button onClick={logins}>

          Continue with google
        </button>
        <span>
          Don't you have an account? <Link to="/signup">SignUp</Link>
        </span>
      </form>
    </div>
  );
}

export default Login;
