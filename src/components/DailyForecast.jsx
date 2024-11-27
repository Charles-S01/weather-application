import { useContext } from "react"
import WeatherIcon from "./WeatherIcon"
import { CurrentWeatherContext } from "../App"

export default function DailyForecast({}) {
    const { isNight, data } = useContext(CurrentWeatherContext)
    function getDayOfWeek(d) {
        const daysOfWeek = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ]
        const dateParts = d.split("-")
        const date = new Date(
            Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2]),
        )
        // console.log(`Parsed date: ${date}, Original date string: ${d}`)

        return daysOfWeek[date.getUTCDay()]
    }

    return (
        <>
            <div
                className={`daily-forecast flex flex-col text-nowrap rounded-xl ${isNight ? "bg-blue-950" : "bg-sky-800"} bg-opacity-10 p-2`}
            >
                {data.days.slice(1, 8).map((item) => {
                    return (
                        <div className="flex border-b-2 border-gray-50 border-opacity-20 p-2">
                            <div className="flex flex-1 flex-col gap-4">
                                <div className="day text-lg">
                                    {getDayOfWeek(item.datetime)}
                                </div>
                                <div className="hl">{`High: ${Math.round(item.tempmax)}\u00B0 Low: ${Math.round(item.tempmin)}\u00B0`}</div>
                            </div>
                            <div className="flex basis-20 items-center gap-4">
                                <div className="temp">
                                    {`${Math.round(item.temp)}\u00B0`}
                                </div>
                                <div className="icon">
                                    <WeatherIcon iconDescription={item.icon} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
