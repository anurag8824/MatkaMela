import React from 'react'
import { Link } from 'react-router-dom';

const HomeMarket = ({markets , result}) => {
console.log(result, "disawr result")
  const marketsh = [
    {
      id: 1,
      name: "Silver Bazar",
      open: "10:00 AM",
      close: "12:30 PM",
      result: "12:45 PM",
      openNumber: "24",
      closeNumber: "65",
    },
    {
      id: 2,
      name: "London Market",
      open: "11:00 AM",
      close: "01:00 PM",
      result: "01:15 PM",
      openNumber: "18",
      closeNumber: "43",
    },
    {
      id: 3,
      name: "Shri Ganesh",
      open: "01:30 PM",
      close: "03:00 PM",
      result: "03:15 PM",
      openNumber: "05",
      closeNumber: "79",
    },
    {
      id: 4,
      name: "Kalyan Gold",
      open: "04:00 PM",
      close: "06:00 PM",
      result: "06:15 PM",
      openNumber: "33",
      closeNumber: "26",
    },
    {
      id: 5,
      name: "Morning Star",
      open: "01:00 AM",
      close: "11:00 AM",
      result: "11:15 AM",
      openNumber: "44",
      closeNumber: "15",
    },
  ];

  return (
    <div className=''>
      {markets?.map((market) => (
        <Link to={`${market?.playStatus ? `/play-game/${market?.ID}` : ""}`} key={market.ID}>
          <div className="w-full bg-theme hover:bg-[#cccl] border border-yellow-300 px-3 py-2 shadow-sm"
          >
            {/* Market Name */}
            <div className="text-center mb-1">
              <h3 className="text-base font-semibold text-yellow-500 tracking-wide">
                {market.NAME}
              </h3>
            </div>

            {/* Market Result Numbers */}
            <div className="flex justify-center items-center gap-2 text-white text-lg font-bold">
            <span>
    {market?.ID == 5 
      ? (result?.RESULT1 ?? "-") 
      : (market?.RESULT1 ?? "-")}
  </span>
            </div>

            {/* Market Timings */}
            <ul className="flex justify-center items-center flex-wrap gap-3 text-xs text-gray-50 mt-1">
              <li className="text-center">
                <span className="block font-light bg-white text-black rounded-b-none px-[1px] rounded-md">
                  Open Time
                </span>
                <span className="block">{market?.TIME1}</span>
              </li>
              <li>|</li>
              <li className="text-center">
                <span className="block font-light bg-white text-black rounded-b-none px-[1px] rounded-md">
                  Close Time
                </span>
                <span className="block">{market?.TIME2}</span>
              </li>
              <li>|</li>
              <li className="text-center">
                <span className="block font-light bg-white text-black rounded-b-none px-[1px] rounded-md">
                  Result Time
                </span>
                <span className="block">{market?.RTIME}</span>
              </li>
            </ul>
          </div>
        </Link>
      ))}

    </div>
  )
}

export default HomeMarket
