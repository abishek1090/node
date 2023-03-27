const express = require("express");
const {
  addPost
} = require("../controller/addPost");
const {
  deletePost
} = require("../controller/deletePost");
const {
  getPost
} = require("../controller/getPost");
const {
  getPosts
} = require("../controller/getPosts");
const {
  getUser
} = require("../controller/getUser");
const {
  addComment
} = require("../controller/addComment");
const {
  postUser
} = require("../controller/postUser");
const {
  getComments
} = require("../controller/getComments");
const { removeUser } = require("../controller/removeUser");
const { getSinglePost } = require("../controller/getSinglePost");
const { deleteComment } = require("../controller/deleteComment");
const router = express.Router();
router.get("/posts", getPosts);
router.post("/auth/login", getUser);
router.post("/addpost", addPost);
router.get("/posts/:username", getPost);
router.delete("/delete/:id", deletePost);
router.post("/auth/signup", postUser);
router.post("/comment", addComment);
router.get("/comments/:id", getComments);
router.post("/logout", removeUser);
router.get("/post/:id", getSinglePost);
router.post("/comment/delete", deleteComment);

exports.router = router;
