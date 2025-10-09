// /**
//  * Returns adjusted bet date based on game rules.
//  * 
//  * For normal games: returns today
//  * For game ID 5 (DISAWAR):
//  *   - If current time is before TIME2 (next day early morning), return previous day
//  * 
//  * @param {number} gameId - ID of the game
//  * @param {string} gameTIME2 - TIME2 from games table (format: "HH:MM:SS")
//  * @returns {string} - formatted date "YYYY-MM-DD" for bets table
//  */
// export const getAdjustedBetDate = (gameId, gameTIME2) => {
//     const now = new Date();
//     let betDate = new Date();
  
//     if (gameId === 5 && gameTIME2) {
//       const [h2, m2, s2] = gameTIME2.split(":").map(Number);
  
//       // If current time is before TIME2 (early morning)
//       if (now.getHours() < h2 || (now.getHours() === h2 && now.getMinutes() < m2)) {
//         // shift date to previous day
//         betDate.setDate(betDate.getDate() - 1);
//       }
//     }
  
//     // Format to YYYY-MM-DD
//     return betDate.toISOString().slice(0, 10);
//   };
  




/**
 * Returns adjusted bet datetime based on game rules.
 * 
 * For normal games: returns current datetime
 * For game ID 5 (DISAWAR):
 *   - If current time is before TIME2 (next day early morning), shift date to previous day
 *   - Time remains same
 * 
 * @param {number} gameId - ID of the game
 * @param {string} gameTIME2 - TIME2 from games table (format: "HH:MM:SS")
 * @returns {string} - formatted datetime "YYYY-MM-DD HH:MM:SS" for DATE_TIME column
 */
export const getAdjustedBetDateTime = (gameId, gameTIME2) => {
    const now = new Date(); // current datetime
    const adjusted = new Date(now); // copy

    console.log("Current datetime:", now);
    console.log("Game ID:", typeof gameId, "TIME2:", gameTIME2);
    console.log("Initial adjusted datetime:", adjusted);
  
    if (Number(gameId) === 5 && gameTIME2) {
      const [h2, m2, s2] = gameTIME2.split(":").map(Number);
  
      // If current time is before TIME2 (early morning)
      if (now.getHours() < h2 || (now.getHours() === h2 && now.getMinutes() < m2)) {
        // shift date to previous day, keep same time
        adjusted.setDate(adjusted.getDate() - 1);
      }
    }
  
    // Format to "YYYY-MM-DD HH:MM:SS"
    const yyyy = adjusted.getFullYear();
    const mm = String(adjusted.getMonth() + 1).padStart(2, "0");
    const dd = String(adjusted.getDate()).padStart(2, "0");
    const hh = String(adjusted.getHours()).padStart(2, "0");
    const min = String(adjusted.getMinutes()).padStart(2, "0");
    const ss = String(adjusted.getSeconds()).padStart(2, "0");

    console.log("Final adjusted datetime:", `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`);
  
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
  };
  