import WeatherIcon from "./WeatherIcon"

export default function DailyForecast({ data }) {
    // function getDayOfWeek(d) {
    //     const daysOfWeek = [
    //         "Sunday",
    //         "Monday",
    //         "Tuesday",
    //         "Wednesday",
    //         "Thursday",
    //         "Friday",
    //         "Saturday",
    //     ]
    //     const date = new Date(d)
    //     console.log(`Parsed date: ${date}, Original date string: ${d}`)

    //     return daysOfWeek[date.getDay()]
    // }

    return (
        <>
            <div className="daily-forecast flex w-1/2 flex-col rounded-xl bg-sky-800 bg-opacity-10 p-2 text-lg">
                {data &&
                    data.days.slice(1, 8).map((item) => {
                        return (
                            <div className="flex border-b-2 border-gray-50 border-opacity-20 p-2">
                                <div className="flex flex-1 flex-col gap-4">
                                    <div className="day">{item.datetime}</div>
                                    <div className="hl">{`High: ${Math.round(item.tempmax)}\u00B0 Low: ${Math.round(item.tempmin)}\u00B0`}</div>
                                </div>
                                <div className="flex basis-20 items-center gap-4">
                                    <div className="temp">
                                        {`${Math.round(item.temp)}\u00B0`}
                                    </div>
                                    <div className="icon">
                                        <WeatherIcon
                                            iconDescription={item.icon}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </>
    )
}
