import { useContext } from "react"
import { ThemeContext } from "../App"

export default function InfoCard({ children }) {
    const { isNight } = useContext(ThemeContext)
    return (
        <>
            <div
                className={`${isNight ? "bg-blue-950" : "bg-sky-800"} bg-opacity-10`}
            >
                {children}
            </div>
        </>
    )
}
