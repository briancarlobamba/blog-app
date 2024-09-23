import React, { useState } from 'react';
import { addComment } from '../../utils/API'; // Correct path

const CommentSection = ({ blogId, comments: initialComments }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(initialComments); // Use local state to manage comments

  const handleCommentSubmit = async () => {
    if (!newComment) return; // Prevent empty comments

    try {
        // Call API to add comment
        const response = await addComment(blogId, newComment);
        
        // The added comment is within response.data.updatedBlog.comments (the last comment)
        const addedComment = response.data.updatedBlog.comments.slice(-1)[0];

        // Add the new comment to the list of comments
        setComments(prevComments => [...prevComments, addedComment]);
        
        // Clear the input after submission
        setNewComment('');
    } catch (error) {
        console.error('Error submitting comment:', error);
    }
};


  return (
    <div>
      <h3>Comments</h3>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {comments.map(comment => (
          <li 
            key={comment._id}
            style={{ color: comment.username ? 'black' : 'silver', fontStyle: comment.username ? 'normal' : 'italic' }}
          >
            <strong>{comment.username || 'anonymous user'}: </strong>{comment.comment}
          </li>
        ))}
      </ul>

      <textarea
        value={newComment}
        onChange={e => setNewComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={handleCommentSubmit}>Add Comment</button>
    </div>
  );
};

export default CommentSection;