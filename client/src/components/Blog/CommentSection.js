import React, { useState } from 'react';
import { addComment } from '../../utils/API'; // Correct path

const CommentSection = ({ blogId, comments }) => {
  const [newComment, setNewComment] = useState('');
  
  const handleCommentSubmit = async () => {
    if (!newComment) return; // Prevent empty comments
    try {
      await addComment(blogId, newComment);
      setNewComment(''); // Clear the input after submission
      // Optionally, you might want to refetch comments or update state here
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map(comment => (
          <li key={comment._id}>{comment.comment}</li>
        ))}
      </ul>
      <textarea value={newComment} onChange={e => setNewComment(e.target.value)} />
      <button onClick={handleCommentSubmit}>Add Comment</button>
    </div>
  );
};

export default CommentSection;
