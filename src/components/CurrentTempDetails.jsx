import { useContext } from "react"
import { CurrentWeatherContext } from "../App"

export default function CurrentTempDetails({}) {
    const { data, isNight } = useContext(CurrentWeatherContext)
    return (
        <>
            <div
                className={`box-container flex text-lg ${isNight ? "bg-blue-950" : "bg-sky-800"} rounded-xl bg-opacity-10 p-2`}
            >
                <div
                    className={`feels-like-box flex flex-1 flex-col border-r-2 border-gray-50 border-opacity-20 bg-opacity-10`}
                >
                    <div className="">
                        <p>Feels like</p>
                    </div>
                    <div className="flex justify-center">
                        <p className="text-5xl">{`${Math.round(data.currentConditions.feelslike)}\u00B0`}</p>
                    </div>
                </div>
                <div
                    className={`high-low-box flex flex-1 flex-col justify-center bg-opacity-10`}
                >
                    <div className="flex">
                        <p className="flex-1 text-center">High:</p>
                        <p className="flex-1 text-center">{`${Math.round(data.days[0].tempmin)}\u00B0`}</p>
                    </div>
                    <div className="flex">
                        <p className="flex-1 text-center">Low:</p>
                        <p className="flex-1 text-center">{`${Math.round(data.days[0].tempmax)}\u00B0`}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
