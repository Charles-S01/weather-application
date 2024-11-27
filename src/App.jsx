import { createContext, useCallback, useEffect, useMemo, useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import { Link, useMatch, useNavigate, useParams } from "react-router-dom"
import useData from "./hooks/UseData"
import WeatherCard from "./components/WeatherCard"
import CardList from "./components/CardList"
import { v4 as uuidv4 } from "uuid"
import WeatherIcon from "./components/WeatherIcon"
import HourWeather from "./components/HourWeather"
import HoursBox from "./components/HoursBox"
import DailyForecast from "./components/DailyForecast"
import SusnetSunrise from "./components/SunsetSunrise"
import WindRain from "./WindRain"
import CurrentTempDetails from "./components/CurrentTempDetails"

export const MyContext = createContext({})
export const CurrentWeatherContext = createContext()

function App() {
    const navigate = useNavigate()
    const [showSideBar, setShowSideBar] = useState(() => {
        const storedPreference = localStorage.getItem("showSideBar")
        return storedPreference !== null ? storedPreference === "true" : true
    })

    const { city } = useParams()
    const [unitSystem, setUnitSystem] = useState(() => {
        const storedUnitSystem = localStorage.getItem("unitSystem")
        return storedUnitSystem ? storedUnitSystem : "metric"
    })
    const { data, loading, error } = useData(city, unitSystem)
    const [currData, setCurrData] = useState(null)
    const [history, setHistory] = useState(() => {
        const storedHistory = localStorage.getItem("history")
        return storedHistory ? JSON.parse(storedHistory) : []
    })
    const [isNight, setIsNight] = useState(null)

    const [cityInput, setCityInput] = useState("")
    const [cityFocus, setCityFocus] = useState(null)
    const [cardsTabFocus, setCardsTabFocus] = useState("recents")

    console.log("APP render")

    useEffect(() => {
        if (data) {
            setCityFocus(data.resolvedAddress)
            const localTime = parseInt(
                data.currentConditions.datetime
                    .substring(0, 2)
                    .concat(data.currentConditions.datetime.substring(3, 5)),
                10,
            )
            const sunsetTime = parseInt(
                data.currentConditions.sunset
                    .substring(0, 2)
                    .concat(data.currentConditions.datetime.substring(3, 5)),
                10,
            )
            const sunriseTime = parseInt(
                data.currentConditions.sunrise
                    .substring(0, 2)
                    .concat(data.currentConditions.datetime.substring(3, 5)),
                10,
            )
            setIsNight(
                sunsetTime && sunriseTime
                    ? (localTime > sunsetTime && localTime < 2360) ||
                          (localTime < sunriseTime && localTime >= 0)
                    : false,
            )
            setCurrData(data)
            if (
                history.some(
                    (item) =>
                        item.resolvedCity === data.resolvedAddress &&
                        item.starred,
                )
            ) {
                setCardsTabFocus("favorites")
            } else {
                setCardsTabFocus("recents")
                if (
                    !history.some(
                        (item) => item.resolvedCity === data.resolvedAddress,
                    )
                ) {
                    setHistory([
                        {
                            resolvedCity: data.resolvedAddress,
                            starred: false,
                            id: uuidv4(),
                        },
                        ...history,
                    ])
                }
            }
        }
    }, [data])

    useEffect(() => {
        if (data) {
            const saved = history.filter((item) => item.starred)
            localStorage.setItem("history", JSON.stringify(saved))
        }
    }, [history])

    useEffect(() => {
        localStorage.setItem("showSideBar", showSideBar)
    }, [showSideBar])

    function handleCitySubmit(e) {
        e.preventDefault()
        if (cityInput) {
            const cityToNavigate = cityInput
            setCityInput("")
            navigate(`/${cityToNavigate}`)
        }
    }
    function handleCityInputChange(e) {
        setCityInput(e.target.value)
    }

    function handleClear() {
        // setHistory(history.filter((item) => item.starred))
        setHistory([])
        navigate(`/toronto`)
    }

    function handleCardClick(city, starClicked) {
        // setCityFocus(city)
    }

    function handleStarClick(city, isStarred) {
        if (!isStarred) {
            setHistory(
                history.map((item) => {
                    return item.resolvedCity === city
                        ? { ...item, starred: true }
                        : item
                }),
            )
            setTimeout(() => {
                setCardsTabFocus("favorites")
            }, 100)
        } else if (isStarred) {
            setHistory(
                history.map((item) => {
                    return item.resolvedCity === city
                        ? { ...item, starred: false }
                        : item
                }),
            )
        }
    }

    function handleUnitChange(e) {
        setUnitSystem(e.target.value)
        localStorage.setItem("unitSystem", e.target.value)
    }

    if (loading) {
        console.log("loading...")
        return (
            <>
                <p>Loading...</p>
            </>
        )
    }
    if (error) {
        return (
            <>
                <p>{error}</p>
            </>
        )
    }

    return (
        <>
            <div
                className={`app m-0 box-border flex h-full w-full overflow-auto bg-gradient-to-b text-base max-[750px]:relative ${isNight ? "bg-gradi/ent-to-br from-cyan-800 to-blue-900" : "bg-gra/dient-to-bl from-cyan-500 to-blue-500"} p-0 transition-all`}
            >
                <div className="app-wrapper flex max-w-[2560px] flex-1">
                    <div
                        className={`sidebar flex text-nowrap text-lg max-[750px]:absolute max-[750px]:z-20 max-[750px]:h-full max-[750px]:bg-opacity-70 max-[750px]:backdrop-blur-md ${showSideBar ? "block w-[22rem] opacity-100 max-[750px]:w-full" : "w-0 opacity-0"} box-border flex-col overflow-hidden border-r-0 border-cyan-700 border-opacity-50 transition-all duration-500`}
                    >
                        <div className="top-bar flex justify-between overflow-hidden p-5">
                            <button
                                onClick={() => {
                                    setShowSideBar(!showSideBar)
                                }}
                                className={` ${!showSideBar && "opacity-0"} flex items-center gap-1 self-start p-0`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="size-10"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <p>Hide</p>
                            </button>
                            <button onClick={handleClear} className="ml-auto">
                                Clear Saved
                            </button>
                        </div>
                        <div className="tabs-wrapper flex-shrink-0 overflow-hidden p-5">
                            <div className="tabs flex overflow-hidden text-nowrap">
                                <button
                                    onClick={() => setCardsTabFocus("recents")}
                                    className={`recents-tab ${cardsTabFocus === "recents" ? "border-opacity-100 bg-opacity-60" : "border-opacity-30 bg-opacity-0"} flex-1 rounded-l-xl border-2 border-gray-50 bg-cyan-600 p-1`}
                                >
                                    <p className="drop-shadow-xl">Recents</p>
                                </button>
                                <button
                                    onClick={() =>
                                        setCardsTabFocus("favorites")
                                    }
                                    className={`favorties-tab ${cardsTabFocus === "favorites" ? "border-opacity-100 bg-opacity-60" : "border-opacity-30 bg-opacity-0"} flex-1 rounded-r-xl border-2 border-gray-50 bg-cyan-600 p-1`}
                                >
                                    <p className="drop-shadow-xl">Saved</p>
                                </button>
                            </div>
                        </div>
                        <div className="cards-column mt-0 box-border flex flex-1 flex-col gap-14 overflow-scroll p-5">
                            <MyContext.Provider
                                value={{
                                    history,
                                    unitSystem,
                                    cardsTabFocus,
                                    handleStarClick,
                                    cityFocus,
                                }}
                            >
                                {data && <CardList />}
                            </MyContext.Provider>
                        </div>
                    </div>

                    <main className="content flex flex-1 flex-col overflow-auto">
                        <div className="main-top-bar sticky z-10 flex items-center justify-between gap-5 p-5 backdrop-blur-md max-[1100px]:text-sm">
                            <button
                                onClick={() => {
                                    setShowSideBar(!showSideBar)
                                }}
                                className={`${showSideBar && "opacity-0"} self-start p-0`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="size-10"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>

                            <form
                                onSubmit={handleCitySubmit}
                                className="flex gap-2 p-0"
                            >
                                <input
                                    type="text"
                                    placeholder=" Search city..."
                                    value={cityInput}
                                    onChange={handleCityInputChange}
                                    className="rounded-xl p-1 text-black opacity-70"
                                />
                                <button type="submit">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </form>
                            <div className="selection-wrapper">
                                <select
                                    id="unit-system"
                                    className="rounded-lg bg-sky-800 bg-opacity-20 p-2 pr-0"
                                    defaultValue={unitSystem}
                                    onChange={handleUnitChange}
                                >
                                    <option value="metric">Metric</option>
                                    <option value="imperial">Imperial</option>
                                </select>
                            </div>
                        </div>

                        {data === currData && (
                            <>
                                <div className="city-name-wrapper sticky top-0 z-10 mb-4 mt-16 flex justify-center p-1 backdrop-blur-md">
                                    <p className="city-name self-center rounded-lg text-3xl drop-shadow-2xl">
                                        {data.resolvedAddress
                                            .split(",")
                                            .slice(0, 2)
                                            .join(",")}
                                    </p>
                                </div>
                                <div className="weather-content-container o/verflow-auto flex flex-1 justify-center">
                                    <div className="WEATHER-content-width flex max-w-[60rem] flex-1 flex-col gap-8 transition-all max-[1400px]:max-w-[45rem] max-[1100px]:max-w-[23rem]">
                                        <div className="current-weather flex flex-col items-center justify-center gap-2 text-xl drop-shadow-2xl">
                                            <div className="temp-and-icon mt-1 flex gap-5">
                                                <p className="temp text-6xl">
                                                    {Math.round(
                                                        data.currentConditions
                                                            .temp,
                                                    )}
                                                    &deg;
                                                </p>
                                                <div className="scale-[2]">
                                                    <WeatherIcon
                                                        iconDescription={
                                                            data
                                                                .currentConditions
                                                                .icon
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <p className="condition-description">
                                                {
                                                    data.currentConditions
                                                        .conditions
                                                }
                                            </p>
                                        </div>
                                        <CurrentWeatherContext.Provider
                                            value={{
                                                isNight,
                                                data,
                                                unitSystem,
                                            }}
                                        >
                                            <div className="hourly-weather-container flex justify-center">
                                                <HoursBox data={data} />
                                            </div>
                                            <div className="section-3 flex flex-wrap gap-8">
                                                <div className="flex-1 flex-shrink-0">
                                                    <DailyForecast
                                                        data={data}
                                                    />
                                                </div>
                                                <div className="boxes-container flex flex-1 flex-col gap-8">
                                                    <CurrentTempDetails />
                                                    <SusnetSunrise />
                                                    <WindRain />
                                                </div>
                                            </div>
                                        </CurrentWeatherContext.Provider>
                                    </div>
                                </div>
                            </>
                        )}
                    </main>
                </div>
            </div>
        </>
    )
}

export default App
