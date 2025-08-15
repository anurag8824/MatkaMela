// import React, { useState, useEffect } from 'react';

// const RotatingDiv = () => {
//   const [hoveredIndex, setHoveredIndex] = useState(null);

//   useEffect(() => {
//     const styleId = 'vertical-rotate-keyframes';
//     if (!document.getElementById(styleId)) {
//       const style = document.createElement('style');
//       style.id = styleId;
//       style.innerHTML = `
//         @keyframes verticalRotateUp {
//           0% {
//             transform: rotateY(0deg) translateY(0);
//           }
//           50% {
//             transform: rotateY(180deg) translateY(-100px);
//           }
//           100% {
//             transform: rotateY(360deg) translateY(0);
//           }
//         }
//       `;
//       document.head.appendChild(style);
//     }
//   }, []);

//   return (
//     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxWidth: '600px' }}>
//       {Array.from({ length: 50 }).map((_, index) => (
//         <div
//           key={index}
//           style={{
//             width: '40px',
//             height: '40px',
//             backgroundColor: '#D946EF',
//             animation: hoveredIndex === index ? 'verticalRotateUp 0.2s linear infinite' : 'none',
//             transformStyle: 'preserve-3d',
//             transition: 'all 0.1s ease',
//             display: 'inline-block',
//           }}
//           onMouseEnter={() => setHoveredIndex(index)}
//           onMouseLeave={() => setHoveredIndex(null)}
//         ></div>
//       ))}
//     </div>
//   );
// };

// export default RotatingDiv;



import React, { useEffect, useState } from 'react';

const RotatingDiv = () => {
  const [activeIndexes, setActiveIndexes] = useState([]);

  useEffect(() => {
    // Inject keyframes once
    const styleId = 'vertical-rotate-keyframes';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        @keyframes verticalRotateUp {
          0% {
            transform: rotateY(0deg) translateY(0);
          }
          50% {
            transform: rotateY(180deg) translateY(-20px);
          }
          100% {
            transform: rotateY(360deg) translateY(0);
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const handleMouseEnter = (index) => {
    // Add index to activeIndexes
    if (!activeIndexes.includes(index)) {
      setActiveIndexes((prev) => [...prev, index]);
    }
  };

  const handleMouseLeave = (index) => {
    // Wait 5 seconds then remove the index from activeIndexes
    setTimeout(() => {
      setActiveIndexes((prev) => prev.filter((i) => i !== index));
    }, 1500);
  };

  return (
    <div className='' style={{ display: 'flex', flexWrap: 'wrap', gap: '2px', maxWidth: '100%' }}>
      {Array.from({ length: 10000 }).map((_, index) => (
        <div
          key={index}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: 'black',
            animation: activeIndexes.includes(index)
              ? 'verticalRotateUp 0.5s linear infinite'
              : 'none',
            transformStyle: 'preserve-3d',
            transition: 'all 0.1s ease',
          }}
        ></div>
      ))}
    </div>
  );
};

export default RotatingDiv;
