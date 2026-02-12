"use client";

import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
    rating: number;
    onRatingChange?: (rating: number) => void;
    readonly?: boolean;
    size?: number;
}

export default function StarRating({
    rating,
    onRatingChange,
    readonly = false,
    size = 20
}: StarRatingProps) {
    const [hoverRating, setHoverRating] = useState(0);

    const handleClick = (value: number) => {
        if (!readonly && onRatingChange) {
            onRatingChange(value);
        }
    };

    const handleMouseEnter = (value: number) => {
        if (!readonly) {
            setHoverRating(value);
        }
    };

    const handleMouseLeave = () => {
        if (!readonly) {
            setHoverRating(0);
        }
    };

    const displayRating = hoverRating || rating;

    return (
        <div style={{
            display: 'flex',
            gap: '4px',
            cursor: readonly ? 'default' : 'pointer'
        }}>
            {[1, 2, 3, 4, 5].map((value) => (
                <Star
                    key={value}
                    size={size}
                    onClick={() => handleClick(value)}
                    onMouseEnter={() => handleMouseEnter(value)}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        color: value <= displayRating ? '#f59e0b' : '#d1d5db',
                        fill: value <= displayRating ? '#f59e0b' : 'none',
                        transition: 'all 0.2s ease',
                        transform: !readonly && hoverRating === value ? 'scale(1.2)' : 'scale(1)',
                    }}
                />
            ))}
        </div>
    );
}
