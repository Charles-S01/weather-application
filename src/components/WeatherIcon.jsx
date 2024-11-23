import testIcon from "../assets/test-icon.svg"
import CloudySunnyIcon from "../assets/weather-icons/cloudy-sunny"
import CloudyNightIcon from "../assets/weather-icons/cloudy-night"
import CloudyIcon from "../assets/weather-icons/cloudy"
import SunnyIcon from "../assets/weather-icons/day"
import NightIcon from "../assets/weather-icons/night"
import RainySunny from "../assets/weather-icons/rainySunny"
import RainyIcon from "../assets/weather-icons/rainy"
import SnowySunnyIcon from "../assets/weather-icons/snowySunny"
import SnowyIcon from "../assets/weather-icons/snowy"
import ThunderIcon from "../assets/weather-icons/thunder"

export default function WeatherIcon({ iconDescription }) {
    const icons = {
        "clear-day": <SunnyIcon />,
        "partly-cloudy-day": <CloudySunnyIcon />,
        wind: <CloudyIcon />,
        "clear-night": <NightIcon />,
        rain: <RainyIcon />,
        snow: <SnowyIcon />,
        fog: <CloudyIcon />,
        cloudy: <CloudyIcon />,
        "partly-cloudy-night": <CloudyNightIcon />,
        thunderstorm: <ThunderIcon />,
        tornado: <SnowySunnyIcon />,
    }

    return (
        <>
            <div>{icons[iconDescription]}</div>
        </>
    )
}
