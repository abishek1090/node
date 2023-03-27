import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUser, addComments } from '../features/slice'
import CommentList from './CommentList'
import axios from 'axios'
export const Post = () => {
  const params = useParams()
  const initialValue = ''
  const user = useSelector(getUser)
  const [availableComments, setAvailableComments] = useState([])
  const [message, setMessage] = useState(initialValue)
  const [msgerror, setMsgError] = useState({})
  const [post, setPost] = useState()
  const [datas, setDatas] = useState(false)
  const inputs = {
    message,
    postId: params.id,
    username: user
  }
  const handleSubmit = async e => {
    e.preventDefault()

    setMsgError(validate({ message: message }));
    if (inputs.message !== '') {
      try {
        const response = await axios.post(
          'http://localhost:8080/api/comment',
          inputs
        )
        setAvailableComments((prev)=>[response.data,...prev]);
        setMessage("");
      } catch (err) {
        console.log(err)
      }
    }
  }
  const validate = values => {
    const errors = {}
    if (!values.message) {
      errors.message = 'Enter a comment'
    }
    return errors
  }

  useMemo(() => {
    fetch('http://localhost:8080/api/comments/' + params.id)
      .then(response => response.json())
      .then(data => setAvailableComments(data))

  }, [])
  useMemo(() => {
    fetch('http://localhost:8080/api/post/' + params.id)
      .then(response => response.json())
      .then(data => {
        setPost(data)
        setDatas(true)
      })
  }, []);
  useEffect(() => { }, [availableComments]);
  const commentsByParentId = useMemo(() => {
    if (availableComments.length === 0) return []
    const group = {}
    availableComments.forEach(comment => {
      group[comment.parentId] ||= []

      group[comment.parentId].push(comment)
    })
    return group
  }, [availableComments])

  const rootComments = commentsByParentId
  const parentComments = rootComments[undefined]
  return (
    <div className='single'>
      <h3 className='singleTopic'>Topic</h3>
      {datas &&
        post.map(data => {
          return (
            <div key={data._id}>
              <div>
                <h5 className='singleDesc'>{data.topic}</h5>
                <h3 className='singleTopic'>Description</h3>
                <p className='singleDesc'>{data.description}</p>
                <h3 className='singleTopic'>Comments</h3>
                {user.length!==0 &&  <form onSubmit={handleSubmit}>
                  <div className="comment-form-row">
                    < textarea
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
                </form>}
                {parentComments != null && parentComments.length > 0 && (
                  <div className="mt-4">
                    <CommentList comments={parentComments} />
                  </div>
                )}
              </div>
            </div>
          )
        })}
    </div>
  )
}
