import { useEffect, useState } from "react"

export default function useData(city) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let c = city || "new york"

        // const timeout = setTimeout(() => {
        fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${c}?unitGroup=us&key=SMQS99NQCQX3DRDEPXYC6HPVK&contentType=json`,
        )
            .then((response) => {
                if (!response.ok) {
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
    }, [city])

    return { data, loading, error }
}
