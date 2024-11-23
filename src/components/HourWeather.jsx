import WeatherIcon from "./WeatherIcon"

export default function HourWeather({ time, icon, temp }) {
    return (
        <>
            <div className="flex min-w-24 flex-col items-center">
                <p className="">{time}</p>
                <WeatherIcon iconDescription={icon} />
                <p>{Math.round(temp)}&deg;</p>
            </div>
        </>
    )
}
