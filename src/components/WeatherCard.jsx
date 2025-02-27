import starIcon from "../assets/star.svg"
import hiddenStarIcon from "../assets/hidden-star.svg"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useContext, useMemo } from "react"
import { MyContext } from "../App"
import useData from "../hooks/UseData"
import WeatherIcon from "./WeatherIcon"

export default function WeatherCard({ id, city, isStarred }) {
    const { unitSystem, handleStarClick, cityFocus } = useContext(MyContext)
    const { data, loading, error } = useData(city, unitSystem)

    const isNight = useMemo(() => {
        const localTime = parseInt(
            data?.currentConditions.datetime
                .substring(0, 2)
                .concat(data.currentConditions.datetime.substring(3, 5)),
            10,
        )
        const sunsetTime = parseInt(
            data?.currentConditions.sunset
                .substring(0, 2)
                .concat(data.currentConditions.datetime.substring(3, 5)),
            10,
        )
        const sunriseTime = parseInt(
            data?.currentConditions.sunrise
                .substring(0, 2)
                .concat(data.currentConditions.datetime.substring(3, 5)),
            10,
        )
        return sunsetTime && sunriseTime
            ? (localTime > sunsetTime && localTime < 2360) ||
                  (localTime < sunriseTime && localTime >= 0)
            : false
    }, [data])

    console.log("WeatherCard render")

    return (
        <>
            {data && isNight !== null ? (
                <Link to={`/${city}`} key={id}>
                    <div
                        className={`weather-card group relative flex h-32 flex-shrink-0 flex-col justify-between overflow-hidden rounded-xl border-gray-50 p-3 text-lg shadow-xl transition hover:scale-105 ${cityFocus === city ? "border-2 border-opacity-100" : "border-0"} ${isNight ? "bg-gradient-to-br from-cyan-700 to-blue-900" : "bg-gradient-to-bl from-cyan-500 to-blue-500"}`}
                    >
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                handleStarClick(city, isStarred)
                            }}
                            className={`absolute right-1 top-1 group-hover:opacity-100`}
                        >
                            {isStarred ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="size-6"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ) : (
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
                            )}
                        </button>

                        <div className="flex">
                            <p className="mr-5 flex-1 overflow-hidden text-ellipsis">
                                {city}
                            </p>
                        </div>
                        <div className="conditions flex items-center">
                            <p className="mr-auto self-end">
                                {data.currentConditions.conditions}
                            </p>
                            <p className="text-3xl">{`${Math.round(data.currentConditions.temp)}\u00B0`}</p>
                            <div className="">
                                <WeatherIcon
                                    iconDescription={
                                        data.currentConditions.icon
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </Link>
            ) : null}
        </>
    )
}
