import { useState } from "react";
import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as FullStarIcon } from "@heroicons/react/24/solid";

export default function StarRating({
    value,
    onChange,
}: {
    value: number;
    onChange: (v: number) => void;
}) {
    const [hover, setHover] = useState<number | null>(null);

    const displayValue = hover ?? value;

    const handleHover = (e: React.MouseEvent, index: number) => {
        const { left, width } = (e.target as HTMLElement).getBoundingClientRect();
        const posX = e.clientX - left;

        if (posX < width / 2) {
            setHover(index - 0.5);
        } else {
            setHover(index);
        }
    };

    const handleClick = (e: React.MouseEvent, index: number) => {
        const { left, width } = (e.target as HTMLElement).getBoundingClientRect();
        const posX = e.clientX - left;

        if (posX < width / 2) {
            onChange(index - 0.5);
        } else {
            onChange(index);
        }
    };

    return (
        <div className="flex gap-1 cursor-pointer">
            {[1, 2, 3, 4, 5].map((i) => {
                const full = displayValue >= i;
                const half = displayValue >= i - 0.5 && displayValue < i;

                return (
                    <div
                        key={i}
                        className="relative w-8 h-8"
                        onMouseMove={(e) => handleHover(e, i)}
                        onMouseLeave={() => setHover(null)}
                        onClick={(e) => handleClick(e, i)}
                    >
                        {/* empty star */}
                        <StarIcon className="w-8 h-8 text-gray-300" />

                        {/* full star */}
                        {full && (
                            <FullStarIcon className="w-8 h-8 text-yellow-400 absolute top-0 left-0" />
                        )}

                        {/* half star */}
                        {half && (
                            <FullStarIcon
                                className="w-8 h-8 text-yellow-400 absolute top-0 left-0"
                                style={{ clipPath: "inset(0 50% 0 0)" }}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}