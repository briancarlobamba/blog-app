import React, { useState } from 'react';
import { addComment } from '../../utils/API';
import { Button, Form } from 'react-bootstrap';

const CommentSection = ({ blogId, comments: initialComments }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(initialComments);

  const handleCommentSubmit = async () => {
    if (!newComment) return;

    try {
      const response = await addComment(blogId, newComment);
      const addedComment = response.data.updatedBlog.comments.slice(-1)[0];
      setComments(prevComments => [...prevComments, addedComment]);
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="fw-bold">Comments</h3>
      <ul className="list-unstyled">
        {comments.map(comment => (
          <li 
            key={comment._id} 
            className="border-bottom py-2"
            style={{ color: comment.username ? 'black' : 'gray', fontStyle: comment.username ? 'normal' : 'italic' }}
          >
            <strong>{comment.username || 'anonymous user'}: </strong>{comment.comment}
          </li>
        ))}
      </ul>
      <Form className="mt-3">
        <Form.Group>
          <Form.Control
            as="textarea"
            rows={2}
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="Add a comment"
          />
        </Form.Group>
        <Button onClick={handleCommentSubmit} className="mt-2">Add Comment</Button>
      </Form>
    </div>
  );
};

export default CommentSection;
