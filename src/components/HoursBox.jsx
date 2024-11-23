import { memo, useMemo } from "react"
import HourWeather from "./HourWeather"

const HoursBox = memo(({ data, times }) => {
    const localTime = parseInt(times.localTime?.toString().substring(0, 2))
    // const localTime = parseInt(
    //     data.currentConditions.datetime.substring(0, 2),
    //     10,
    // )

    const hours = useMemo(() => {
        const day1 = data.days[0].hours.slice(localTime, localTime + 12)
        const day2 = data.days[1].hours.slice(0, 12 - day1.length + 1)

        return day1.length < 12 ? day1.concat(day2) : day1
    }, [data])

    return (
        <>
            <div
                className={`hours-box flex h-32 max-w-[60rem] overflow-x-scroll rounded-xl bg-sky-800 bg-opacity-10 p-2`}
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
                            time={index === 0 ? "Now" : time}
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
