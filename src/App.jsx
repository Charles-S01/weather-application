import { useCallback, useEffect, useMemo, useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import { useMatch, useNavigate, useParams } from "react-router-dom"
import useData from "./hooks/UseData"

function App() {
    const navigate = useNavigate()
    const [showSideBar, setShowSideBar] = useState(true)

    const { city } = useParams()
    const [cityInput, setCityInput] = useState("")
    const { data, loading, error } = useData(city)
    const [history, setHistory] = useState(() => {
        const storedHistory = localStorage.getItem("history")
        return storedHistory ? JSON.parse(storedHistory) : []
    })

    console.log("APP render")

    useEffect(() => {
        // console.log("attempting useEffect 1")
        if (data) {
            // console.log("useffect 1 run. attempting setHistory")
            if (!history.includes(data.resolvedAddress)) {
                // console.log("set history")
                setHistory([...history, data.resolvedAddress])
            }
        }
    }, [data])

    useEffect(() => {
        // console.log("attempting useEffect 2")
        if (data) {
            // console.log("useffect 2 run. (setting storage)")
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
        setHistory([])
        navigate(`/nyc`)
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
                        className={`sidebar flex overflow-hidden text-nowrap ${showSideBar ? "w-80" : "w-0"} box-border flex-col border-r-2 border-black text-xl transition-all duration-300`}
                    >
                        <div className="top-thing flex justify-between">
                            <p>history</p>
                            <button onClick={handleClear} className="">
                                Clear
                            </button>
                        </div>
                        {data &&
                            history.map((item, index) => {
                                return <p key={index}>{item}</p>
                            })}
                    </div>
                    {/* )} */}
                    <main className="content flex flex-1 flex-col">
                        <div className="search-flex flex items-center justify-between">
                            <button
                                onClick={() => {
                                    setShowSideBar(!showSideBar)
                                }}
                                className="self-start p-3"
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
                                className="flex gap-2 p-4"
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
                            <div className="CURRENT-weather flex flex-col items-center justify-center drop-shadow-2xl">
                                <p className="city-name text-4xl">
                                    {data.resolvedAddress}
                                </p>
                                <p className="temp text-5xl">
                                    {Math.round(data.currentConditions.temp)}
                                </p>
                                <p>{`Feels like: ${data.currentConditions.feelslike}`}</p>
                                <div className="highlow-flex flex gap-8">
                                    <p>{`H: ${data.days[0].tempmax}`}</p>
                                    <p>{`L: ${data.days[0].tempmin}`}</p>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default App
