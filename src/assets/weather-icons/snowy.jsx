import React from "react"

export default function SnowyIcon() {
    return (
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="64"
            height="64"
            viewBox="0 0 64 64"
        >
            <defs>
                <filter id="blur" width="200%" height="200%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                    <feOffset dx="0" dy="4" result="offsetblur" />
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.05" />
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <style type="text/css">
                    {`
                        /*
                        ** CLOUDS
                        */
                        @keyframes am-weather-cloud-2 {
                            0% {
                                transform: translate(0px, 0px);
                            }
                            50% {
                                transform: translate(2px, 0px);
                            }
                            100% {
                                transform: translate(0px, 0px);
                            }
                        }
                        .am-weather-cloud-2 {
                            animation-name: am-weather-cloud-2;
                            animation-duration: 3s;
                            animation-timing-function: linear;
                            animation-iteration-count: infinite;
                        }

                        /*
                        ** SNOW
                        */
                        @keyframes am-weather-snow {
                            0% {
                                transform: translateX(0) translateY(0);
                            }
                            33.33% {
                                transform: translateX(-1.2px) translateY(2px);
                            }
                            66.66% {
                                transform: translateX(1.4px) translateY(4px);
                                opacity: 1;
                            }
                            100% {
                                transform: translateX(-1.6px) translateY(6px);
                                opacity: 0;
                            }
                        }
                        @keyframes am-weather-snow-reverse {
                            0% {
                                transform: translateX(0) translateY(0);
                            }
                            33.33% {
                                transform: translateX(1.2px) translateY(2px);
                            }
                            66.66% {
                                transform: translateX(-1.4px) translateY(4px);
                                opacity: 1;
                            }
                            100% {
                                transform: translateX(1.6px) translateY(6px);
                                opacity: 0;
                            }
                        }
                        .am-weather-snow-1 {
                            animation-name: am-weather-snow;
                            animation-duration: 2s;
                            animation-timing-function: linear;
                            animation-iteration-count: infinite;
                        }
                        .am-weather-snow-2 {
                            animation-name: am-weather-snow;
                            animation-delay: 1.2s;
                            animation-duration: 2s;
                            animation-timing-function: linear;
                            animation-iteration-count: infinite;
                        }
                        .am-weather-snow-3 {
                            animation-name: am-weather-snow-reverse;
                            animation-duration: 2s;
                            animation-timing-function: linear;
                            animation-iteration-count: infinite;
                        }
                    `}
                </style>
            </defs>
            <g filter="url(#blur)" id="snowy-6">
                <g transform="translate(20,10)">
                    <g className="am-weather-cloud-2">
                        <path
                            d="M47.7,35.4c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3    c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z"
                            fill="#57A0EE"
                            stroke="white"
                            strokeLinejoin="round"
                            strokeWidth="1.2"
                            transform="translate(-20,-11)"
                        />
                    </g>
                    <g className="am-weather-snow-1">
                        <g transform="translate(3,28)">
                            <line
                                fill="none"
                                stroke="#57A0EE"
                                strokeLinecap="round"
                                strokeWidth="1.2"
                                transform="translate(0,9), rotate(0)"
                                x1="0"
                                x2="0"
                                y1="-2.5"
                                y2="2.5"
                            />
                            <line
                                fill="none"
                                stroke="#57A0EE"
                                strokeLinecap="round"
                                strokeWidth="1"
                                transform="translate(0,9), rotate(45)"
                                x1="0"
                                x2="0"
                                y1="-2.5"
                                y2="2.5"
                            />
                            <line
                                fill="none"
                                stroke="#57A0EE"
                                strokeLinecap="round"
                                strokeWidth="1"
                                transform="translate(0,9), rotate(90)"
                                x1="0"
                                x2="0"
                                y1="-2.5"
                                y2="2.5"
                            />
                            <line
                                fill="none"
                                stroke="#57A0EE"
                                strokeLinecap="round"
                                strokeWidth="1"
                                transform="translate(0,9), rotate(135)"
                                x1="0"
                                x2="0"
                                y1="-2.5"
                                y2="2.5"
                            />
                        </g>
                    </g>
                    <g className="am-weather-snow-2">
                        <g transform="translate(11,28)">
                            <line
                                fill="none"
                                stroke="#57A0EE"
                                strokeLinecap="round"
                                strokeWidth="1.2"
                                transform="translate(0,9), rotate(0)"
                                x1="0"
                                x2="0"
                                y1="-2.5"
                                y2="2.5"
                            />
                            <line
                                fill="none"
                                stroke="#57A0EE"
                                strokeLinecap="round"
                                strokeWidth="1"
                                transform="translate(0,9), rotate(45)"
                                x1="0"
                                x2="0"
                                y1="-2.5"
                                y2="2.5"
                            />
                            <line
                                fill="none"
                                stroke="#57A0EE"
                                strokeLinecap="round"
                                strokeWidth="1"
                                transform="translate(0,9), rotate(90)"
                                x1="0"
                                x2="0"
                                y1="-2.5"
                                y2="2.5"
                            />
                            <line
                                fill="none"
                                stroke="#57A0EE"
                                strokeLinecap="round"
                                strokeWidth="1"
                                transform="translate(0,9), rotate(135)"
                                x1="0"
                                x2="0"
                                y1="-2.5"
                                y2="2.5"
                            />
                        </g>
                    </g>
                    <g className="am-weather-snow-3">
                        <g transform="translate(20,28)">
                            <line
                                fill="none"
                                stroke="#57A0EE"
                                strokeLinecap="round"
                                strokeWidth="1.2"
                                transform="translate(0,9), rotate(0)"
                                x1="0"
                                x2="0"
                                y1="-2.5"
                                y2="2.5"
                            />
                            <line
                                fill="none"
                                stroke="#57A0EE"
                                strokeLinecap="round"
                                strokeWidth="1"
                                transform="translate(0,9), rotate(45)"
                                x1="0"
                                x2="0"
                                y1="-2.5"
                                y2="2.5"
                            />
                            <line
                                fill="none"
                                stroke="#57A0EE"
                                strokeLinecap="round"
                                strokeWidth="1"
                                transform="translate(0,9), rotate(90)"
                                x1="0"
                                x2="0"
                                y1="-2.5"
                                y2="2.5"
                            />
                            <line
                                fill="none"
                                stroke="#57A0EE"
                                strokeLinecap="round"
                                strokeWidth="1"
                                transform="translate(0,9), rotate(135)"
                                x1="0"
                                x2="0"
                                y1="-2.5"
                                y2="2.5"
                            />
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    )
}
