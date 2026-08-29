
import React from 'react';


function CourseCard({ image, badge, title, mentor, price, rating }) {
  return (
    <div className="course-card">
      <img src={image} alt={title} className="course-thumb" />
      <div className="course-body">
        <span className="badge">{badge}</span>
        <h3>{title}</h3>
        <p className="mentor">Mentor: {mentor}</p>
        <div className="course-footer">
          <span className="price">{price}</span>
          <span className="rating">⭐ {rating}</span>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;