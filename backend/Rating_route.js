// Routes
// Add a review
app.post('/reviews', async (req, res) => {
  const { productName, comment, rating } = req.body;
  const review = new Review({ productName, comment, rating });
  await review.save();
  res.json({ message: 'Review added!' });
});

// Get all reviews with average rating per product
app.get('/reviews', async (req, res) => {
  const reviews = await Review.aggregate([
    {
      $group: {
        _id: '$productName',
        averageRating: { $avg: '$rating' },
        reviews: { $push: { comment: '$comment', rating: '$rating' } },
      },
    },
  ]);
  res.json(reviews);
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
