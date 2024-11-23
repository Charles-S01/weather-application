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

export const MyContext = createContext({})

function App() {
    const navigate = useNavigate()
    const [showSideBar, setShowSideBar] = useState(true)

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
    // const [localTime, setLocalTime] = useState(null)
    // const [sunsetTime, setSunsetTime] = useState(null)
    // const [sunriseTime, setSunriseTime] = useState(null)

    const [times, setTimes] = useState({
        localTime: null,
        sunsetTime: null,
        sunriseTime: null,
    })

    const [cityInput, setCityInput] = useState("")
    const [cityFocus, setCityFocus] = useState(null)
    const [cardsTabFocus, setCardsTabFocus] = useState("recents")

    console.log("APP render")

    const nightTime =
        times.sunsetTime && times.sunriseTime
            ? (times.localTime > times.sunsetTime && times.localTime < 2360) ||
              (times.localTime < times.sunriseTime && times.localTime >= 0)
            : false

    useEffect(() => {
        if (data) {
            setCityFocus(data.resolvedAddress)
            setTimes({
                localTime: parseInt(
                    data.currentConditions.datetime
                        .substring(0, 2)
                        .concat(
                            data.currentConditions.datetime.substring(3, 5),
                        ),
                    10,
                ),
                sunsetTime: parseInt(
                    data.currentConditions.sunset
                        .substring(0, 2)
                        .concat(
                            data.currentConditions.datetime.substring(3, 5),
                        ),
                    10,
                ),
                sunriseTime: parseInt(
                    data.currentConditions.sunrise
                        .substring(0, 2)
                        .concat(
                            data.currentConditions.datetime.substring(3, 5),
                        ),
                    10,
                ),
            })
            // setLocalTime(
            //     parseInt(
            //         data.currentConditions.datetime
            //             .substring(0, 2)
            //             .concat(
            //                 data.currentConditions.datetime.substring(3, 5),
            //             ),
            //         10,
            //     ),
            // )
            // setSunsetTime(
            //     parseInt(
            //         data.currentConditions.sunset
            //             .substring(0, 2)
            //             .concat(
            //                 data.currentConditions.datetime.substring(3, 5),
            //             ),
            //         10,
            //     ),
            // )
            // setSunriseTime(
            //     parseInt(
            //         data.currentConditions.sunrise
            //             .substring(0, 2)
            //             .concat(
            //                 data.currentConditions.datetime.substring(3, 5),
            //             ),
            //         10,
            //     ),
            // )
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
            }
            setCityFocus(data.resolvedAddress)
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
    }, [data])

    useEffect(() => {
        if (data) {
            localStorage.setItem("history", JSON.stringify(history))
        }
    }, [history])

    function handleCitySubmit(e) {
        e.preventDefault()
        const cityToNavigate = cityInput
        setCityInput("")
        navigate(`/${cityToNavigate}`)
    }
    function handleCityInputChange(e) {
        setCityInput(e.target.value)
    }

    function handleClear() {
        setHistory(history.filter((item) => item.starred))
        // if (!history.some((item) => item.starred)) {
        //     navigate(`/nyc`)
        // }
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
                className={`app m-0 box-border flex h-full w-full overflow-auto bg-gradient-to-b ${nightTime ? "from-cyan-700 to-blue-900" : "from-cyan-500 to-blue-500"} p-0 transition-all`}
            >
                <div className="app-wrapper flex flex-1">
                    {/* {showSideBar && ( */}
                    <div
                        className={`sidebar flex text-nowrap ${showSideBar ? "w-96" : "w-0"} box-border flex-col overflow-hidden border-r-0 border-cyan-700 border-opacity-50 text-xl transition-all duration-500`}
                    >
                        <div className="top-bar flex justify-between overflow-hidden p-5">
                            <button
                                onClick={() => {
                                    setShowSideBar(!showSideBar)
                                }}
                                className={` ${!showSideBar && "opacity-0"} self-start p-0`}
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
                            <button onClick={handleClear} className="ml-auto">
                                Clear
                            </button>
                        </div>
                        <div className="tabs-wrapper flex-shrink-0 overflow-hidden p-5">
                            <div className="tabs flex overflow-hidden text-nowrap">
                                <button
                                    onClick={() => setCardsTabFocus("recents")}
                                    className={`recents-tab ${cardsTabFocus === "recents" ? "border-opacity-100 bg-opacity-60" : "border-opacity-30 bg-opacity-20"} flex-1 rounded-l-xl border-2 border-gray-50 bg-sky-800 p-2`}
                                >
                                    Recents
                                </button>
                                <button
                                    onClick={() =>
                                        setCardsTabFocus("favorites")
                                    }
                                    className={`favorties-tab ${cardsTabFocus === "favorites" ? "border-opacity-100 bg-opacity-60" : "border-opacity-30 bg-opacity-20"} flex-1 rounded-r-xl border-2 border-gray-50 bg-sky-800 p-2`}
                                >
                                    Favorites
                                </button>
                            </div>
                        </div>
                        <div className="cards-column mt-0 box-border flex flex-1 flex-col gap-14 overflow-scroll p-5">
                            <MyContext.Provider
                                value={{
                                    history,
                                    cardsTabFocus,
                                    handleStarClick,
                                    cityFocus,
                                }}
                            >
                                {data && <CardList />}
                            </MyContext.Provider>
                        </div>
                    </div>

                    <main className="content flex flex-1 flex-col">
                        <div className="main-top-bar flex items-center justify-start gap-5 p-5">
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
                                className="ml-auto flex gap-2 p-0"
                            >
                                <input
                                    type="text"
                                    placeholder=" Search city..."
                                    value={cityInput}
                                    onChange={handleCityInputChange}
                                    className="rounded-xl p-1 text-black opacity-70"
                                />
                                <button type="submit">Enter</button>
                            </form>
                            <div className="selection-wrapper">
                                <select
                                    id="unit-system"
                                    className="rounded-lg bg-sky-800 bg-opacity-20 p-2"
                                    defaultValue={unitSystem}
                                    onChange={handleUnitChange}
                                >
                                    <option value="metric">Metric</option>
                                    <option value="imperial">Imperial</option>
                                </select>
                            </div>
                        </div>
                        <div className="WEATHER-content mt-16 flex flex-1 flex-col gap-8">
                            {data === currData && (
                                <>
                                    <div className="current-weather flex flex-col items-center justify-center gap-2 text-2xl drop-shadow-2xl">
                                        <p className="city-name mb-4 text-4xl">
                                            {data.resolvedAddress}
                                        </p>
                                        <div className="temp-and-icon flex gap-5">
                                            <p className="temp text-6xl">
                                                {Math.round(
                                                    data.currentConditions.temp,
                                                )}
                                                &deg;
                                            </p>
                                            <div className="scale-[2]">
                                                <WeatherIcon
                                                    iconDescription={
                                                        data.currentConditions
                                                            .icon
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <p className="condition-description">
                                            {data.currentConditions.conditions}
                                        </p>
                                        <p>{`Feels like: ${Math.round(data.currentConditions.feelslike)}\u00B0`}</p>
                                        <div className="highlow-flex flex gap-8">
                                            <p>{`H: ${Math.round(data.days[0].tempmax)}\u00b0`}</p>
                                            <p>{`L: ${Math.round(data.days[0].tempmin)}\u00B0`}</p>
                                        </div>
                                    </div>
                                    <div className="hourly-weather-container flex justify-center">
                                        <HoursBox
                                            data={data}
                                            times={times}
                                            nightTime={nightTime}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default App
