import { useContext } from "react"
import { CurrentWeatherContext } from "../App"

export default function WindRain({}) {
    const { isNight, data, unitSystem } = useContext(CurrentWeatherContext)
    return (
        <>
            <div className="flex gap-8 text-nowrap">
                <div
                    className={`wind-box flex flex-col gap-2 rounded-xl ${isNight ? "bg-blue-950" : "bg-sky-800"} flex-1 bg-opacity-10 p-2`}
                >
                    <p className="border-b-2 border-gray-50 border-opacity-20 text-lg">
                        Wind
                    </p>
                    <div className="windspeed flex justify-between">
                        <p className="flex-1 text-left">Speed:</p>
                        <p className="flex-1 text-right">{`${data.currentConditions.windspeed}  ${unitSystem === "metric" ? "kmh" : "mph"}`}</p>
                    </div>
                    <div className="windgust flex justify-between">
                        <p className="flex-1 text-left">Gust:</p>
                        <p className="flex-1 text-right">{`${data.currentConditions.windgust}  ${unitSystem === "metric" ? "kmh" : "mph"}`}</p>
                    </div>
                    <div className="winddir flex justify-between">
                        <p className="flex-1 text-left">Direction:</p>
                        <p className="flex-1 text-right">{`${data.currentConditions.winddir} deg`}</p>
                    </div>
                </div>
                <div
                    className={`rain-box flex flex-col gap-2 rounded-xl ${isNight ? "bg-blue-950" : "bg-sky-800"} flex-1 bg-opacity-10 p-2`}
                >
                    <p className="border-b-2 border-gray-50 border-opacity-20 text-lg">
                        Rain
                    </p>
                    <div className="percip flex justify-between">
                        <p className="flex-1 text-left">Percipiation:</p>
                        <p className="flex-1 text-right">{`${data.currentConditions.precip} ${unitSystem === "metric" ? "mm" : "in"}`}</p>
                    </div>
                    <div className="percipprob flex justify-between">
                        <p className="flex-1 text-left">Probablity:</p>
                        <p className="flex-1 text-right">
                            {`${data.currentConditions.precipprob}%`}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
