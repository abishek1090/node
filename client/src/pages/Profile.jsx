import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser, getAllPosts, posts, deletePost } from "../features/slice";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { FaComment } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
function Profile() {
  var user = useSelector(getUser);
  const [modal, setModal] = useState(false);
  const [closeModal, setCLoseModal] = useState(false);
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const toggle = () => setModal(!modal);
  const availablePosts = useSelector(getAllPosts);
  const handleClick = async () => {
    try {
      await axios.delete(`https://api-wi31.onrender.com/api/delete/${id}`);
      dispatch(deletePost(id));
      setModal(false);
      setCLoseModal(!closeModal);

    } catch (err) {
      console.log(console.error());
    }
  };
  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(
          `https://api-wi31.onrender.com/api/posts/${user}`
        );

        dispatch(posts(response.data));
      } catch (err) { }
    };
    getPost();
  }, [closeModal]);
  return (
    <div>
      <Modal animation={false} size="lg" isOpen={modal} toggle={toggle} unmountOnClose={true}>
        <ModalHeader toggle={toggle}>
          Are You Sure You Want to Delete the Post
        </ModalHeader>
        <ModalBody>
          <div className="modalBody">
            <button
              style={{ width: "300px", backgroundColor: "red" }}
              onClick={handleClick}>
              Yes
            </button>
            <button
              style={{ width: "300px", backgroundColor: "green" }}
              onClick={() => setModal(false)}
            >
              No
            </button>
          </div>
        </ModalBody>
      </Modal>
      <div className="profile">
        <div className="header">
          <AccountCircleIcon className="buttonProfile" />
          <span style={{ fontSize: "x-large" }}>
            {user}
          </span>
        </div>
        <span className="header1">Posts</span>

        {availablePosts && availablePosts.length
          ? availablePosts.map(post =>
            <div className="main" key={post._id}>
              <h3 className="topicLink">{post.topic}</h3>
              <p>{post.description}</p>
              <p>{post.description}</p>
              <FaComment className="comments" />
              <Link to={`/post/${post._id}`} className="topicLink">
                <span>
                  {" "}{post.count} comments
                </span>
              </Link>
              <Link />{" "}
              <AiFillDelete
                className="deleteButton"
                style={{ marginLeft: "10px" }}
                size="25px"
                onClick={() => {
                  setModal(true);
                  setId(post._id);
                }}
              />
            </div>
          )
          : <span style={{
            fontSize: "30px", marginLeft: "400px",
            marginTop: "100px"
          }}>No posts available</span>}
        <h3 />
      </div>
    </div>
  );
}

export default Profile;
