import { useEffect, useState } from "react"

export default function useData(city, unitSystem) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const apiKey = import.meta.env.VITE_KEY

        let c = city || "toronto"
        const unit = unitSystem === "metric" ? "uk" : "us"

        // const timeout = setTimeout(() => {
        fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${c}?unitGroup=${unit}&key=${apiKey}&contentType=json`,
        )
            .then((response) => {
                if (response >= 400) {
                    throw new Error("Server error")
                }
                return response.json()
            })
            .then((json) => {
                console.log(json)
                setData(json)
            })
            .catch((er) => setError(er))
            .finally(() => setLoading(false))
        // }, 1000)

        // return () => clearTimeout(timeout)
    }, [city, unitSystem])

    return { data, loading, error }
}
