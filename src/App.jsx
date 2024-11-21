import { useCallback, useEffect, useMemo, useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import { Link, useMatch, useNavigate, useParams } from "react-router-dom"
import useData from "./hooks/UseData"
import WeatherCard from "./WeatherCard"
import { v4 as uuidv4 } from "uuid"

function App() {
    const navigate = useNavigate()
    const [showSideBar, setShowSideBar] = useState(true)

    const { city } = useParams()
    const [cityInput, setCityInput] = useState("")
    const { data, loading, error } = useData(city)
    const [currData, setCurrData] = useState(null)
    const [history, setHistory] = useState(() => {
        const storedHistory = localStorage.getItem("history")
        return storedHistory ? JSON.parse(storedHistory) : []
    })
    const [favorites, setFavorites] = useState(() => {
        const storedFavorites = localStorage.getItem("favorites")
        return storedFavorites ? JSON.parse(storedFavorites) : []
    })
    const [cityFocus, setCityFocus] = useState(null)

    console.log("APP render")

    useEffect(() => {
        if (data) {
            setCurrData(data)
            setCityFocus(data.resolvedAddress)
            if (
                !history.some(
                    (item) => item.resolvedCity === data.resolvedAddress,
                ) &&
                !favorites.some(
                    (favCity) => data.resolvedAddress === favCity.city,
                )
            ) {
                setHistory([
                    ...history,
                    { resolvedCity: data.resolvedAddress, id: uuidv4() },
                ])
            }
        }
    }, [data])

    useEffect(() => {
        if (data) {
            localStorage.setItem("history", JSON.stringify(history))
        }
    }, [history])

    useEffect(() => {
        if (data) {
            localStorage.setItem("favorites", JSON.stringify(favorites))
        }
    }, [favorites])

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
        setHistory([])
        setFavorites([])
        navigate(`/nyc`)
    }

    function handleCardClick(city, id, starClicked) {
        setCityFocus(city)
    }

    function handleStarClick(city, id) {
        if (!favorites.some((item) => item.city === city)) {
            setFavorites([...favorites, { city: city, id: id }])
        }
        const newHistory = history.filter((item) => item.resolvedCity !== city)
        // console.log(`New history: ${JSON.stringify(newHistory)}`)
        setHistory(newHistory)
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
            <div className="app m-0 box-border flex h-full w-full overflow-auto bg-gradient-to-br from-cyan-500 to-blue-500 p-0">
                <div className="app-wrapper flex flex-1">
                    {/* {showSideBar && ( */}
                    <div
                        className={`sidebar flex text-nowrap ${showSideBar ? "w-96" : "w-0"} box-border flex-col overflow-hidden border-r-0 border-cyan-700 border-opacity-50 text-xl transition-all duration-500`}
                    >
                        <div className="top-bar flex justify-between p-5">
                            <p></p>
                            <button onClick={handleClear} className="">
                                Clear
                            </button>
                        </div>
                        <div className="cards-column mt-0 box-border flex flex-1 flex-col gap-14 overflow-scroll p-5">
                            {favorites[0] !== undefined && (
                                <div className="favorites-cards flex flex-col gap-5">
                                    <p>Favorites</p>
                                    {data &&
                                        favorites.map((item) => {
                                            return (
                                                <Link to={`/${item.city}`}>
                                                    <WeatherCard
                                                        key={item.id}
                                                        id={item.id}
                                                        city={item.city}
                                                        handleClick={
                                                            handleCardClick
                                                        }
                                                        handleStarClick={
                                                            handleStarClick
                                                        }
                                                        isStarred={favorites.some(
                                                            (favCity) =>
                                                                favCity.city ===
                                                                item.city,
                                                        )}
                                                        isFocused={
                                                            cityFocus ===
                                                            item.city
                                                        }
                                                    />
                                                </Link>
                                            )
                                        })}
                                </div>
                            )}
                            <div className="history-cards flex flex-1 flex-col gap-5">
                                <p>Viewed</p>
                                {data &&
                                    history.map((item) => {
                                        return (
                                            <Link to={`/${item.resolvedCity}`}>
                                                <WeatherCard
                                                    key={item.id}
                                                    id={item.id}
                                                    city={item.resolvedCity}
                                                    handleClick={
                                                        handleCardClick
                                                    }
                                                    handleStarClick={
                                                        handleStarClick
                                                    }
                                                    isFocused={
                                                        cityFocus ===
                                                        item.resolvedCity
                                                    }
                                                />
                                            </Link>
                                        )
                                    })}
                            </div>
                        </div>
                    </div>
                    {/* )} */}
                    <main className="content flex flex-1 flex-col">
                        <div className="top-bar-flex flex items-center justify-between p-5">
                            <button
                                onClick={() => {
                                    setShowSideBar(!showSideBar)
                                }}
                                className="self-start p-0"
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
                                <button type="submit">Enter</button>
                            </form>
                        </div>
                        <div className="WEATHER-content mt-16 flex flex-1 flex-col text-2xl">
                            {data === currData && (
                                <div className="current-weather flex flex-col items-center justify-center gap-3 drop-shadow-2xl">
                                    <p className="city-name text-4xl">
                                        {data.resolvedAddress}
                                    </p>
                                    <p className="temp text-5xl">
                                        {Math.round(
                                            data.currentConditions.temp,
                                        )}
                                    </p>
                                    <p>{`Feels like: ${data.currentConditions.feelslike}`}</p>
                                    <div className="highlow-flex flex gap-8">
                                        <p>{`H: ${data.days[0].tempmax}`}</p>
                                        <p>{`L: ${data.days[0].tempmin}`}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default App
