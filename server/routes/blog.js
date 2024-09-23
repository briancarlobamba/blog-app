const express = require("express");
const blogController = require("../controllers/blog");

const {verify, verifyAdmin} = require("../auth");

const router = express.Router();

router.post("/addBlog", verify, blogController.addBlog);

router.get("/getBlogs", blogController.getBlogs);

router.get("/getMyBlogs", verify, blogController.getMyBlogs);

router.get("/getBlog/:id", blogController.getBlogById);

router.patch("/updateBlog/:id", verify, blogController.updateBlog);

router.delete("/deleteBlog/:id", verify, blogController.deleteBlog);

router.patch("/addComment/:id", verify, blogController.addComment);

router.get("/getComments/:id", blogController.getComments);

router.delete("/deleteComment/:id", verify, blogController.deleteComment);

module.exports = router;

