import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as FullStarIcon } from "@heroicons/react/24/solid";

export default function StarNotation({ notation }: { notation: number }) {
    return (
        <div className="flex mt-1">
            {[1, 2, 3, 4, 5].map((i) => {
                if (notation >= i) {
                    // full star
                    return <FullStarIcon key={i} className="w-8 h-8 text-yellow-400" />;
                }

                if (notation >= i - 0.5) {
                    // half-star
                    return (
                        <div key={i} className="relative w-8 h-8">
                            <StarIcon className="w-8 h-8 text-gray-300" />
                            <FullStarIcon
                                className="w-8 h-8 text-yellow-400 absolute top-0 left-0 overflow-hidden"
                                style={{ clipPath: "inset(0 50% 0 0)" }}
                            />
                        </div>
                    );
                }

                // empty star
                return <StarIcon key={i} className="w-8 h-8 text-gray-300" />;
            })}
        </div>
    );
}