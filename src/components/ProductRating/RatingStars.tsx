import React from 'react';

interface RatingStarsProps {
    rating: number; // Ví dụ: 3.5
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
    return (
        <div className="cr-star">
            {Array.from({ length: 5 }, (_, index) => {
                if (rating >= index + 1) {
                    return <i key={index} className="ri-star-fill" style={{ color: '#fadb14' }} />;
                } else if (rating >= index + 0.5) {
                    return <i key={index} className="ri-star-half-line" style={{ color: '#fadb14' }} />;
                } else {
                    return <i key={index} className="ri-star-line" style={{ color: '#fadb14' }} />;
                }
            })}
        </div>
    );
};

export default RatingStars;
