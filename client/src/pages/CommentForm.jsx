import axios from 'axios';
import React from 'react'
import { useState } from "react"
import { useSelector } from 'react-redux';
import { getOnePost, getUser } from '../features/slice';
function CommentForm({
  autoFocus = false, }) {
  const initialValue = "";
  const postId = useSelector(getOnePost);
  const user = useSelector(getUser);
  const [message, setMessage] = useState(initialValue);
  const [msgerror, setMsgError] = useState({});
  const inputs = {
    message,
    postId: postId._id,
    username: user

  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsgError(validate({ message: message }));
    if (inputs.message !== '') {
      try {
        const response = await axios.post("https://backend-sj2s.onrender.com/api/comment", inputs);
      }
      catch (err) {
        console.log(err);
      }
    }
  }
  const validate = (values) => {
    const errors = {};
    if (!values.message) {
      errors.message = "Enter a comment"
    }
    return errors;
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="comment-form-row">
        <textarea
          autoFocus={autoFocus}
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="message-input"
        />
        <button className="btn" type="submit">
          Post
        </button>
      </div>
      <p style={{
        fontSize: '15px',
        color: "red"
      }}>{msgerror.message}</p>
    </form>
  )
}

export default CommentForm