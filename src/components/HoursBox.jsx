import { memo, useContext, useMemo } from "react"
import HourWeather from "./HourWeather"
import { CurrentWeatherContext } from "../App"

const HoursBox = memo(({ times }) => {
    const { isNight, data } = useContext(CurrentWeatherContext)

    const localTime = parseInt(
        data.currentConditions.datetime.substring(0, 2),
        10,
    )
    const hours = useMemo(() => {
        const day1 = data.days[0].hours.slice(localTime + 1, localTime + 13)
        const remainingHours = 12 - day1.length
        const day2 = data.days[1].hours.slice(0, remainingHours)

        return day1.concat(day2)
    }, [data, localTime])

    return (
        <>
            <div
                className={`hours-box flex flex-1 overflow-x-scroll rounded-xl ${isNight ? "bg-blue-950" : "bg-sky-800"} bg-opacity-10 pt-2`}
            >
                {hours.map((item, index) => {
                    console.log("time calculated")
                    let time = parseInt(item.datetime.substring(0, 2), 10)
                    if (time >= 12) {
                        if (time !== 12) {
                            time -= 12
                        }
                        time = `${time} pm`
                    } else time = time === 0 ? "12 am" : `${time} am`

                    return (
                        <HourWeather
                            key={index}
                            // time={index === 0 ? "Now" : time}
                            time={time}
                            icon={item.icon}
                            temp={item.temp}
                        />
                    )
                })}
            </div>
        </>
    )
})

export default HoursBox
