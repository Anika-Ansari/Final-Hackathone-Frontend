import React, { useState } from 'react';
import axios from 'axios';
import './review.css';

const ReviewCard = () => {
  const [rating, setRating] = useState();
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setMessage('Comment cannot be empty!');
      return;
    }

    try {
         const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://final-hackatnone-backend.onrender.com"
    : "http://localhost:3000";

const res = await axios.post(
  `${API_URL}/api/v1/reviews`,
  { rating: 5, comment: "Test review" },
  {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  }
);
      

      setMessage('Review submitted successfully!');
      setComment('');
      setRating(5);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error submitting review.');
    }
  };

  return (

    <div className="review-form">
      <h3>Leave a Review</h3>
      <form onSubmit={handleSubmit}>
        <label>Rating:</label>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>
          ))}
        </select>

        <label>Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review here..."
          rows="4"
        />

        <button type="submit">Submit Review</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ReviewCard;
