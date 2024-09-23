const Blog = require("../models/Blog");


module.exports.addBlog = (req, res) => {
    console.log("User Info: ", req.user);

    if (!req.user.username || !req.user.id) {
        return res.status(400).send({ error: "Invalid user information" });
    }

    let newBlog = new Blog({
        title: req.body.title,
        content: req.body.content,
        author: {
            username: req.user.username,
            userId: req.user.id
        }
    });

    newBlog.save()
    .then(savedBlog => res.status(201).send(savedBlog))
    .catch(saveErr => {
        console.error("Error in saving the blog: ", saveErr);
        return res.status(500).send({ error: 'Failed to save the blog' });
    });
};




// get blogs

	module.exports.getBlogs = (req, res) => {
	    return Blog.find({})
	    .then(result => {
	        if (result.length > 0) {
	            return res.status(200).send({ blogs: result });
	        } else {
	            return res.status(404).send({ message: 'No blogs found' });
	        }
	    })
	    .catch(err => {
	        console.error("Error in fetching blogs: ", err);
	        return res.status(500).send({ error: 'Failed to fetch blogs' });
	    });
	};


// get my own blogs

module.exports.getMyBlogs = (req, res) => {
    const userId = req.user.id;

    Blog.find({ 'author.userId': userId })
        .then(blogs => {
            if (blogs.length > 0) {
                return res.status(200).send({ blogs });
            } else {
                return res.status(404).send({ message: 'No blogs found for this user' });
            }
        })
        .catch(err => {
            console.error("Error in fetching user's blogs: ", err);
            return res.status(500).send({ error: 'Failed to fetch user blogs' });
        });
};



// get blog by id

	module.exports.getBlogById = (req, res) => {

		Blog.findById(req.params.id)
		.then(foundBlog => {
			if (!foundBlog) {
				return res.status(404).send({ error: 'Blog not found' });
			}
			return res.status(200).send(foundBlog);
		})
		.catch(err => {
			console.error("Error in fetching blog: ", err)
			return res.status(500).send({ error: 'Failed to fetch blog' });
		});

	};

// update own blog

	module.exports.updateBlog = (req, res) => {
    Blog.findById(req.params.id)
        .then((foundBlog) => {
            if (!foundBlog) {
                return res.status(404).send({ error: 'Blog not found' });
            }

            if (foundBlog.author.userId.toString() !== req.user.id && !req.user.isAdmin) {
                return res.status(403).send({ error: 'Not authorized to update this blog' });
            }

            foundBlog.title = req.body.title || foundBlog.title;  // Update title if provided
            foundBlog.content = req.body.content || foundBlog.content;

            return foundBlog.save();
        })
        .then((updatedBlog) => {
            res.status(200).send(updatedBlog);
        })
        .catch((err) => {
            console.error("Error in updating blog: ", err);
            return res.status(500).send({ error: 'Error in updating blog.' });
        });
};





// delete blog

	module.exports.deleteBlog = (req, res) => {
    const blogId = req.params.id;
    const userId = req.user.id;

    Blog.findById(blogId)
        .then((foundBlog) => {
            if (!foundBlog) {
                return res.status(404).send({ error: 'Blog not found' });
            }

            // Check if the user is the author or an admin
            if (foundBlog.author.userId.toString() !== userId && !req.user.isAdmin) {
                return res.status(403).send({ error: 'Not authorized to delete this blog' });
            }

            // Proceed to delete the blog
            return Blog.deleteOne({ _id: blogId })
                .then(() => {
                    return res.status(200).send({ message: 'Blog deleted successfully' });
                });
        })
        .catch((err) => {
            console.error('Error in finding blog: ', err);
            return res.status(500).send({ error: 'Error in finding blog.' });
        });
	};


// add comment

	module.exports.addComment = (req, res) => {
    const newComment = {
        comment: req.body.comment
    };

    if (req.user) {
        newComment.userId = req.user.id;
        newComment.username = req.user.username;
    }
    console.log("User Info in addComment: ", req.user);

    Blog.findByIdAndUpdate(
        req.params.id,
        { $push: { comments: newComment } },
        { new: true }
    )
    .then(updatedBlog => {
        if (!updatedBlog) {
            return res.status(404).send({ error: 'Blog not found' });
        }

        return res.status(200).send({
            message: 'Comment added successfully',
            updatedBlog: updatedBlog
        });
    })
    .catch(err => {
        console.error("Error in adding comments: ", err);
        return res.status(500).send({ error: 'Error in adding comments.' });
    });
};









// get comment

module.exports.getComments = (req, res) => {
    Blog.findById(req.params.id)
        .populate('comments.userId', '_id username') // Populate username along with userId
        .then(blog => {
            if (!blog) {
                return res.status(404).send({ error: 'Blog not found' });
            }

            const commentsResponse = blog.comments.map(comment => ({
                userId: comment.userId ? comment.userId._id : "anonymous",
                username: comment.userId ? comment.userId.username : "anonymous",
                comment: comment.comment,
                _id: comment._id
            }));

            return res.status(200).send({
                comments: commentsResponse
            });
        })
        .catch(err => {
            console.error("Error in fetching comments: ", err);
            return res.status(500).send({ error: 'Error in fetching comments.' });
        });
};



// delete comment

/*module.exports.deleteComment = (req, res) => {
    Blog.findById(req.params.id)
        .then((blog) => {
            if (!blog) {
                return res.status(404).send({ error: 'Blog not found' });
            }

            const comment = blog.comments.id(req.body.commentId);
            if (!comment) {
                return res.status(404).send({ error: 'Comment not found' });
            }

            // Check if the user is the owner of the comment or an admin
            if (comment.userId.toString() !== req.user.id && !req.user.isAdmin) {
                return res.status(403).send({ error: 'Not authorized to delete this comment' });
            }

            // Remove the comment using the pull operator
            blog.comments.pull(comment._id);

            return blog.save()
                .then(() => {
                    return res.status(200).send({ message: 'Comment deleted successfully' });
                });
        })
        .catch((err) => {
            console.error("Error in deleting comment: ", err);
            return res.status(500).send({ error: 'Error in deleting comment' });
        });
};*/

// delete comment
module.exports.deleteComment = (req, res) => {
    Blog.findById(req.params.id)
        .then((blog) => {
            if (!blog) {
                return res.status(404).send({ error: 'Blog not found' });
            }

            const comment = blog.comments.id(req.body.commentId);
            if (!comment) {
                return res.status(404).send({ error: 'Comment not found' });
            }

            if (!req.user || (comment.userId && comment.userId.toString() !== req.user.id && !req.user.isAdmin)) {
                return res.status(403).send({ error: 'Not authorized to delete this comment' });
            }

            blog.comments.pull(comment._id);

            return blog.save()
                .then(() => {
                    return res.status(200).send({ message: 'Comment deleted successfully' });
                });
        })
        .catch((err) => {
            console.error("Error in deleting comment: ", err);
            return res.status(500).send({ error: 'Error in deleting comment' });
        });
};

