import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export default function ErrorPage() {
    const navigate = useNavigate()

    // useEffect(() => {
    //     navigate("/toronto")
    // }, [])
    return (
        <>
            <div className="flex h-full w-full items-center justify-center">
                <div className="flex flex-col items-center gap-4 text-5xl">
                    <p>Invalid entry</p>
                    <Link to={"/toronto"}>
                        <p className="hover:underline">Click here to return</p>
                    </Link>
                </div>
            </div>
        </>
    )
}
