import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getUser } from '../features/slice'
import CommentList from './CommentList'

const Comment = ({ _id, message, username, createdAt }) => {
  const params = useParams()
  const [areChildrenHidden, setAreChildrenHidden] = useState(false);
  const [reply, setReply] = useState(false);
  const [replyMessage, setMessage] = useState("");
  const user = useSelector(getUser)
  const [msgerror, setMsgError] = useState({})
  let [availableComments, setAvailableComments] = useState([]);
  const [res,setres]= useState(true);
  const commentsByParentId = useMemo(() => {
    if (availableComments.length === 0) return []
    const group = {}
    availableComments.forEach(comment => {
      group[comment.parentId] ||= []

      group[comment.parentId].push(comment)
    })
    return group
  }, [availableComments])
  const inputs = {
    message: replyMessage,
    postId: params.id,
    username: user,
    parentId: _id
  }
  const handleSubmit = async e => {
    e.preventDefault()

    setMsgError(validate({ message: replyMessage }));
    if (inputs.message !== '') {
      try {
        const response = await axios.post(
          'https://api-wi31.onrender.com/api/comment',
          inputs
        )
        setAvailableComments((prev) => [response.data, ...prev]);
        setMessage("");
        setReply(!reply);
      } catch (err) {
        console.log(err)
      }
    }
  }

  useMemo(() => {
    fetch('https://api-wi31.onrender.com/api/comments/' + params.id)
      .then(response => response.json())
      .then(data => setAvailableComments(data))

  }, [res]);
  const handleDelete = async () => {
    try {
      await axios.post(`https://api-wi31.onrender.com/api/comment/delete`, { id: params.id, _id: _id }).then((data)=>{  let b=availableComments;
      let a=b.splice(1,0,{_id})
      setAvailableComments(b)});
    }
    catch (err) {
      console.log(err);
    }
  }
  console.log(availableComments);
  useEffect(() => {
  }, [availableComments]);
  const validate = values => {
    const errors = {}
    if (!values.message) {
      errors.message = 'Enter a comment'
    }
    return errors
  }
  const childComments = commentsByParentId[_id];

  return (
    <>
      <div className="comment">
        <div className="header">
          <span className="name">{username}</span>
          <span className="date">
            {createdAt}
          </span>
        </div>

        <div className="message">{message}</div>

        {user.length !== 0 && <div className="footer">
          <button className='button' onClick={() => setReply(true)}>Reply</button>
          {user === username && < button className='button' onClick={handleDelete}>Delete</button>}</div>}
      </div>
      {reply && (<form onSubmit={handleSubmit}>
        {user.length !== 0 && <div className="comment-form-row">
          <textarea
            value={replyMessage}
            onChange={e => setMessage(e.target.value)}
            className="message-input"
          />
          <button className="btn" type="submit" >
            Post
          </button>
        </div>}
        <p style={{
          fontSize: '15px',
          color: "red"
        }}>{msgerror.message}</p>
      </form>)}

      {childComments?.length > 0 && (
        <>
          <div
            className={`nested-comments-stack ${areChildrenHidden ? "hide" : ""
              }`}
          >
            <button
              className="collapse-line"
              aria-label="Hide Replies"
              onClick={() => setAreChildrenHidden(true)}
            />
            <div className="nested-comments">
              <CommentList comments={childComments} />
            </div>
          </div>
          <button
            className={`${!areChildrenHidden ? "hide" : ""}`} style={{ border: "none", backgroundColor: "black", color: "white", borderRadius: "20px", marginTop: "5px" }}
            onClick={() => setAreChildrenHidden(false)}
          >
            Show Replies
          </button>
        </>
      )}
    </>
  )
}

export default Comment;