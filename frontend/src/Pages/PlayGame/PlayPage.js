// import React, { useState } from 'react'
// import Jodi from './Jodi';
// import Manual from './Manual';
// import Haraf from './Haraf';
// import Crossing from './Crossing';
// import CopyPaste from './CopyPaste';

// const PlayPage = () => {
//     const tabs = [
//         { key: "jodi", label: "Jodi" },
//         { key: "manual", label: "Manual" },
//         { key: "harraf", label: "Harraf" },
//         { key: "crossing", label: "Crossing" },
//         { key: "copy", label: "Copy Paste" },
//       ];

//       const [active, setActive] = useState("jodi");

//   return (


//      <div className="bg-white rounded-md shadow-sm">
//         <div className="flex flex-wrap">
//           {tabs.map((t) => {
//             const isActive = active === t.key;
//             return (
//               <button
//                 key={t.key}
//                 onClick={() => setActive(t.key)}
//                 className={`flex-1 text-sm md:text-base px-3 py-2 text-center transition-colors
//                   ${isActive ? "bg-[#094c73] text-white font-semibold" : "bg-transparent text-gray-700 hover:bg-gray-100" }`}
//                 aria-pressed={isActive}
//                 role="tab"
//                 aria-selected={isActive}
//               >
//                 {t.label}
//               </button>
//             );
//           })}
//         </div>

//         <div className="h-[2px] bg-gradient-to-r from-transparent via-[#094c73] to-transparent" />
// <div className='p-4'>
//         {active === "jodi" && <Jodi /> }

//         {active === "manual" && <Manual />}

// {active === "harraf" && <Haraf/>}

// {active === "crossing" && <Crossing />}
// {active === "copy" && <CopyPaste />}

// </div>



//     </div>
//   )
// }

// export default PlayPage

import React, { useState } from 'react'
import Jodi from './Jodi';
import Manual from './Manual';
import Haraf from './Haraf';
import Crossing from './Crossing';
import CopyPaste from './CopyPaste';

const PlayPage = () => {
  const tabs = [
    { key: "jodi", label: "Jodi" },
    // { key: "manual", label: "Manual" },
    { key: "harraf", label: "Harraf" },
    { key: "crossing", label: "Crossing" },
    { key: "copy", label: "Copy Paste" },
  ];

  const [active, setActive] = useState("jodi");


  return (

    <div>
      <div className="bg-white rounded-md shadow-sm">
        <div className="flex flex-wrap">
          {tabs.map((t) => {
            const isActive = active === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`flex-1 text-sm md:text-base px-3 py-2 text-center transition-colors
                  ${isActive ? "bg-[#094c73] text-white font-semibold" : "bg-transparent text-gray-700 hover:bg-gray-100"}`}
                aria-pressed={isActive}
                role="tab"
                aria-selected={isActive}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#094c73] to-transparent" />

        <div className="p-4">
          {active === "jodi" && <Jodi />}

          {/* {active === "manual" && <Manual />} */}

          {active === "harraf" && <Haraf />}

          {active === "crossing" && <Crossing />}

          {active === "copy" && <CopyPaste />}
        </div>


      </div>
    </div>

  )
}

export default PlayPage