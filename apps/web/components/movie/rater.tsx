"use client";

import { SignedIn } from "@clerk/nextjs";
import { Star } from "lucide-react";
import { useState } from "react";

export default function MovieRater({ initialRating }: { initialRating: number }) {
    const [hoveredRating, setHoveredRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(initialRating);

    // Calculate what portion of the star should be filled
    const getStarFill = (starPosition: number) => {
        const rating = hoveredRating || selectedRating;
        if (rating >= starPosition) return 1; // Full star
        if (rating + 0.5 >= starPosition) return 0.5; // Half star
        return 0; // Empty star
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>, starIndex: number) => {
        const star = event.currentTarget;
        const rect = star.getBoundingClientRect();
        const starWidth = rect.width;
        const mouseX = event.clientX - rect.left;

        // If mouse is on left half of star, set half star
        const isHalfStar = mouseX < starWidth / 2;
        const rating = starIndex + (isHalfStar ? 0.5 : 1);

        setHoveredRating(rating);
    };

    const handleMouseLeave = () => {
        setHoveredRating(0);
    };

    const handleClick = () => {
        setSelectedRating(hoveredRating);
        // todo: send rating to server
    };

    return (
        <SignedIn>
            <div className="mt-4 flex flex-col justify-center gap-2">
                <p className="text-sm text-white/90">Rate this movie</p>
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((starPosition) => (
                        <div
                            key={starPosition}
                            className="relative cursor-pointer"
                            onMouseMove={(e) => handleMouseMove(e, starPosition - 1)}
                            onMouseLeave={handleMouseLeave}
                            onClick={handleClick}
                        >
                            {/* Background star (empty) */}
                            <Star size={24} className="text-foreground/50" />

                            {/* Foreground star (filled) with clip path */}
                            <div
                                className="absolute left-0 top-0 overflow-hidden transition-all duration-100"
                                style={{
                                    width: `${getStarFill(starPosition) * 100}%`
                                }}
                            >
                                <Star size={24} fill="currentColor" className="text-yellow-500" />
                            </div>
                        </div>
                    ))}
                    <span className="ml-2 font-mono text-sm text-foreground">
                        {hoveredRating || selectedRating || "0"}/5
                    </span>
                </div>
            </div>
        </SignedIn>
    );
}
