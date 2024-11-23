import { Link } from "react-router-dom"
import WeatherCard from "./WeatherCard"
import { useContext, useMemo } from "react"
import { MyContext } from "../App"

export default function CardList({}) {
    const { history, cardsTabFocus } = useContext(MyContext)

    console.log("CardList render")

    const filteredList = useMemo(() => {
        console.log("filteredList calculated")
        return cardsTabFocus === "favorites"
            ? history
                  .filter((item) => item.starred)
                  .sort((a, b) => a.resolvedCity.localeCompare(b.resolvedCity))
            : history.filter((item) => !item.starred)
    }, [history, cardsTabFocus])

    return (
        <>
            <div className="cards flex flex-col gap-5">
                {filteredList.map((item) => (
                    <WeatherCard
                        key={item.id}
                        id={item.id}
                        city={item.resolvedCity}
                        isStarred={item.starred}
                    />
                ))}
            </div>
        </>
    )
}
