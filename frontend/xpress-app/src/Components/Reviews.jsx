import { useState, useEffect } from "react";

function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mock data for reviews
  const reviews = [
    {
      id: 1,
      name: "Sarah M.",
      rating: 5,
      date: "January 15, 2025",
      comment:
        "Incredible service! My car was fixed same-day. Will definitely return for future maintenance.",
      service: "Brake Repair",
    },
    {
      id: 2,
      name: "Michael T.",
      rating: 4,
      date: "December 3, 2024",
      comment:
        "Professional team that explained everything clearly. Fair pricing and they finished on schedule.",
      service: "Oil Change & Tune-up",
    },
    {
      id: 3,
      name: "Jennifer K.",
      rating: 5,
      date: "November 18, 2024",
      comment:
      "I really appreciated the respectful and transparent service here!",
      service: "Transmission Service",
    },
    {
      id: 4,
      name: "Robert P.",
      rating: 5,
      date: "October 22, 2024",
      comment:
        "Been taking my vehicles here for years. Always reliable, honest, and they stand behind their work.",
      service: "Engine Diagnostics",
    },
  ];

  // Auto-rotate reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  // Navigate to a specific review
  const goToReview = (index) => {
    setCurrentIndex(index);
  };

  // Helper function to generate star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? "star filled" : "star"}>
          {i < rating ? "★" : "☆"}
        </span>
      );
    }
    return stars;
  };

  return (
    <section className="reviews">
      <div className="reviews-container">
        <h2>Customer Reviews</h2>
        <p className="reviews-subtitle">Don't just take our word for it</p>

        <div className="reviews-carousel">
          <div className="review-card" key={reviews[currentIndex].id}>
            <div className="review-header">
              <div className="rating">
                {renderStars(reviews[currentIndex].rating)}
              </div>
              <div className="service-tag">{reviews[currentIndex].service}</div>
            </div>
            <p className="review-comment">{reviews[currentIndex].comment}</p>
            <div className="review-footer">
              <span className="review-name">{reviews[currentIndex].name}</span>
              <span className="review-date">{reviews[currentIndex].date}</span>
            </div>
          </div>
        </div>

        <div className="review-dots">
          {reviews.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => goToReview(index)}
              aria-label={`View review ${index + 1}`}
            ></button>
          ))}
        </div>

        <div className="review-cta">
          <a href="#" className="review-button">
            Leave a Review
          </a>
          <a href="#" className="review-button secondary">
            See All Reviews
          </a>
        </div>
      </div>
    </section>
  );
}

export default Reviews;
