import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { post, getUser, deleteUser, deletePosts } from '../features/slice'
import { Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap'
import BackToTop from './BackToTop'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { FaComment } from 'react-icons/fa'
function Home() {
  const [modal, setModal] = useState(false); 
  const [state, setState] = useState({
    topic: '',
    description: '',
    username: ''
  })
  const { topic, description } = state
  const [response, setResponse] = useState({});
  const [dat,setDat] =useState();
  const [availablePosts,setAvailablePosts] =useState([]);
  const navigate = useNavigate();

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const user = useSelector(getUser)
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://backend-sj2s.onrender.com/api/posts`);
        setAvailablePosts(res.data);
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [response]);
  const handleClick = () => {
    localStorage.clear();
    dispatch(deleteUser());
    dispatch(deletePosts());
    navigate("/")
  }
  const handleLogout = () => {
    axios.post("https://backend-sj2s.onrender.com/api/logout");
    localStorage.clear();
    dispatch(deleteUser());
    dispatch(deletePosts());
    navigate("/")
  }
  const toggle = () => setModal(!modal)
  state.username = user;
  const handlePost = async e => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `https://backend-sj2s.onrender.com/api/addpost`,
        state
      )
      setResponse(response.data)
      dispatch(post(response.data));
      setState({ topic: "", description: "" });

    } catch (err) {
      console.log(err)
    }
    toggle()
  }

  return (
    <div>
      <Modal animation={false} size='lg' isOpen={modal} toggle={toggle} unmountOnClose={true} >
        <ModalHeader className='modalheader' toggle={toggle}>
          Create Post
        </ModalHeader>
        <ModalBody>
          <form>
            <Row>
              <Col lg={12}>
                <div className='createpost'>
                  <label htmlFor='topic'>Topic</label>
                  <textarea
                    className='topic'
                    type='text'
                    name='topic'
                    value={topic}
                    placeholder='Enter Topic'
                    onChange={handleChange}
                  ></textarea>
                  <label htmlFor='description'>Description</label>
                  <textarea
                    type='text'
                    className='description'
                    name='description'
                    value={description}
                    placeholder='Enter Description'
                    onChange={handleChange}
                  ></textarea>
                  <button
                    style={{ backgroundColor: 'black', color: 'white' }}
                    onClick={handlePost}
                  >
                    Post
                  </button>
             

                </div>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>

      <div className='body'>
        <div className='nav'>
          <div className='name'>
            <h1>MERN Community</h1>
          </div>
          <div className='create'>
            {user.length !== 0 && <button className='createInside' onClick={() => setModal(true)}>
              Create Post
            </button>}
          </div>
          <div className='other'>
            {user.length === 0 && <button className='otherInside' onClick={handleClick}>
              <h6>Login</h6>
            </button>}
            <div className='accountMenu'>
              {user.length !== 0 && <button className='otherInside' >
                <AccountCircleIcon className='accountButton'>
                </AccountCircleIcon>
              </button>}
              <div className='dropdown'>
                <Link to="/profile"><h5 className='insideAccount' >My posts</h5></Link>
                <button style={{ backgroundColor: "black" }}> <h5 className='insideAccount' onClick={handleLogout} >Logout</h5></button>
              </div>
            </div>
          </div>
        </div>
        {availablePosts && availablePosts.length ? (
          availablePosts.map(post => (
            <div className='main' key={post._id}>
              <div className='mainInside'>
                <div className='profileandTime'>
                  <AccountCircleIcon className='buttonProfile'>
                  </AccountCircleIcon>
                  <div className='nameAndDate'>
                    <h5 className='insideNameAndDate'>{post.username} . {post.dateAndTime}</h5>
                  </div>
                </div>
                <Link to={`/post/${post._id}`} className='topicLink'>
                  <h3>{post.topic}</h3>
                </Link>
                <p>{post.description}</p>
                <FaComment className='comments' />

                <Link to={`/post/${post._id}`} className='topicLink'>
                  <span> {post.count} comments</span>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <span style={{
            fontSize: "30px", marginLeft: "400px",
            marginTop: "100px"
          }}>No posts available</span>
        )}
      </div>
      <BackToTop />
    </div>
  )
}

export default Home
