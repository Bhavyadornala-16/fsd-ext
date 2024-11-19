import React, { useState, useEffect } from 'react';

function App() {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({ productName: '', comment: '', rating: '' });

  useEffect(() => {
    fetch('http://localhost:5000/reviews')
      .then((response) => response.json())
      .then((data) => setReviews(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(() => {
        setFormData({ productName: '', comment: '', rating: '' });
        return fetch('http://localhost:5000/reviews');
      })
      .then((response) => response.json())
      .then((data) => setReviews(data));
  };

  return (
    <div className="App">
      <h1>Product Review System</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={formData.productName}
          onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
          required
        />
        <textarea
          placeholder="Comment"
          value={formData.comment}
          onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
          required
        ></textarea>
        <input
          type="number"
          placeholder="Rating (1-5)"
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
          min="1"
          max="5"
          required
        />
        <button type="submit">Submit</button>
      </form>

      <h2>Reviews</h2>
      {reviews.map((reviewGroup) => (
        <div key={reviewGroup._id}>
          <h3>{reviewGroup._id}</h3>
          <p>Average Rating: {reviewGroup.averageRating.toFixed(1)}</p>
          {reviewGroup.reviews.map((review, idx) => (
            <div key={idx}>
              <p>Rating: {review.rating}</p>
              <p>Comment: {review.comment}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
