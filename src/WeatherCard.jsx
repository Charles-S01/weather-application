//
export default function WeatherCard({
    id,
    city,
    handleClick,
    handleStarClick,
    isStarred,
    isFocused,
}) {
    return (
        <>
            <div
                className={`weather-card group ${isFocused ? "border-l-4 border-l-white border-opacity-60 bg-opacity-50" : null} relative h-32 flex-shrink-0 overflow-hidden rounded-xl border-2 border-transparent bg-sky-800 bg-opacity-20 p-2 shadow-xl transition hover:scale-105`}
                onClick={() => handleClick(city)}
            >
                <button
                    onClick={() => handleStarClick(city, id)}
                    className={`absolute right-1 top-1 ${isStarred ? "opacity-100" : "opacity-0"} group-hover:opacity-100`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                        />
                    </svg>
                </button>

                <p className="overflow-hidden text-ellipsis">{city}</p>
            </div>
        </>
    )
}
