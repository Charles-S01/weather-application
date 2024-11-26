import { useContext } from "react"
import { CurrentWeatherContext } from "../App"

export default function SusnetSunrise({}) {
    const { isNight, data } = useContext(CurrentWeatherContext)

    let sunrise = data.currentConditions.sunrise.split(":").slice(0, 2)
    sunrise[0] = parseInt(sunrise[0], 10)
    if (sunrise[0] > 12 && sunrise[0] !== 0) {
        sunrise[0] = sunrise[0] % 12
    }
    if (sunrise[0] === 0) {
        sunrise[0] = 12
    }
    const sunriseTime = sunrise.join(":")

    let sunset = data.currentConditions.sunset.split(":").slice(0, 2)
    sunset[0] = parseInt(sunset[0], 10)
    if (sunset[0] > 12 && sunset[0] !== 0) {
        sunset[0] = sunset[0] % 12
    }
    if (sunset[0] === 0) {
        sunset[0] = 12
    }
    const sunsetTime = sunset.join(":")

    return (
        <>
            <div
                className={`flex justify-between rounded-xl ${isNight ? "bg-blue-950" : "bg-sky-800"} bg-opacity-10 p-2`}
            >
                <div className="sunrise-box flex flex-col items-center text-nowrap rounded-xl">
                    <p className="text-lg">Sunrise</p>
                    <div className="">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="size-9"
                        >
                            {" "}
                            <path d="M3 17h1m16 0h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7m-9.7 5.7a4 4 0 0 1 8 0" />{" "}
                            <path d="M3 21l18 0" />{" "}
                            <path d="M12 9v-6l3 3m-6 0l3 -3" />{" "}
                        </svg>
                    </div>
                    <p>{`${sunriseTime} am`}</p>
                </div>
                <div className="line flex flex-1 flex-col">
                    <div className="flex-1 border-b-2"></div>
                    <div className="flex-1"></div>
                </div>
                <div className="sunset-box flex flex-col items-center rounded-xl">
                    <p className="text-lg">Sunset</p>
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            width={24}
                            height={24}
                            strokeWidth={2}
                            className="size-9"
                        >
                            {" "}
                            <path d="M3 17h1m16 0h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7m-9.7 5.7a4 4 0 0 1 8 0"></path>{" "}
                            <path d="M3 21l18 0"></path>{" "}
                            <path d="M12 3v6l3 -3m-6 0l3 3"></path>{" "}
                        </svg>
                    </div>
                    <p>{`${sunsetTime} pm`}</p>
                </div>
            </div>
        </>
    )
}
