// import { useEffect, useState } from "react";
// import axiosInstance from "../Utils/axiosInstance";

// export default function ResultHistory() {
//     const [results, setResults] = useState([]);

//     useEffect(() => {
//         const fetchResults = async () => {
//             try {
//                 const res = await axiosInstance.get("/api/game-result-history");
//                 setResults(res.data.data || []);
//             } catch (err) {
//                 console.error("Error fetching game results:", err);
//             }
//         };
//         fetchResults();
//     }, []);

//     // ✅ Group results by date
//     const groupedByDate = results.reduce((acc, item) => {
//         const dateKey = new Date(item.date).toLocaleDateString();
//         if (!acc[dateKey]) acc[dateKey] = [];
//         acc[dateKey].push(item);
//         return acc;
//     }, {});

//     return (
//         <div className="p-4">
//             <h2 className="text-xl font-bold text-center mb-4">
//                 Game Result History
//             </h2>

//             {Object.keys(groupedByDate).map((DATE, idx) => (
//                 <div key={idx} className="mb-6 border rounded-lg shadow-sm bg-white">
//                     {/* Date Header */}
//                     {/* <div className="bg-gray-200 px-4 py-2 font-semibold">{DATE}</div> */}

//                     {/* Results Table */}
//                     <div className="overflow-x-auto">
//                         <table className="w-full border text-sm">
//                             <thead className="bg-gray-100">
//                                 <tr className="text-center">
//                                     <th className="border px-2 py-1">Game</th>
//                                     <th className="border px-2 py-1">Result</th>
//                                     {/* <th className="border px-2 py-1">Result 2</th> */}
//                                     <th className="border px-2 py-1">Time</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {groupedByDate[DATE].map((game, gidx) => (
//                                     <tr key={gidx} className="text-center">
//                                         <td className="border px-2 py-1">{game.GAME_NAME}</td>
//                                         <td className="border px-2 py-1 text-green-600">
//                                             {game.RESULT1}
//                                         </td>
//                                         {/* <td className="border px-2 py-1 text-blue-600">
//                                             {game.RESULT2}
//                                         </td> */}
//                                         <td className="border px-2 py-1">
//                                             {new Date(game.DATE).toLocaleDateString()}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// }

import { useEffect, useState } from "react";
import axiosInstance from "../Utils/axiosInstance";

export default function ResultCalendar() {
    const [games, setGames] = useState([]);
    const [results, setResults] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // current month
    const currentYear = new Date().getFullYear();

    // ✅ Fetch Games
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const res = await axiosInstance.get("/api/get-games");
                setGames(res.data || []);
            } catch (err) {
                console.error("Error fetching games", err);
            }
        };
        fetchGames();
    }, []);

    // ✅ Fetch Results
    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await axiosInstance.get("/api/game-result-history");
                setResults(res.data.data || []);
            } catch (err) {
                console.error("Error fetching results:", err);
            }
        };
        fetchResults();
    }, []);

    // ✅ Calendar Dates
    const daysInMonth = new Date(currentYear, selectedMonth + 1, 0).getDate();
    // ✅ Calendar Dates with full Date objects
    const dates = Array.from({ length: daysInMonth }, (_, i) => {
        return new Date(currentYear, selectedMonth, i + 1); // full date object
    });

    const formatDate = (d) =>
        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

    // ✅ Helper: get result for a game & date
    const getResultForGame = (gameId, dateObj) => {
        const dateString = formatDate(dateObj);
        const result = results.find((r) => formatDate(new Date(r.DATE)) === dateString && r.GAME_ID === String(gameId));
        return result ? result.RESULT1 : "";
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold text-center mb-4">Game Result Calendar</h2>

            {/* ✅ Month Selector */}
            <div className="mb-4 flex justify-center">
                <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(Number(e.target.value))}
                    className="border p-2 rounded"
                >
                    <option value={new Date().getMonth()}>
                        Current Month ({new Date().toLocaleString("default", { month: "long" })})
                    </option>
                    <option value={new Date().getMonth() - 1}>
                        Previous Month ({new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleString("default", { month: "long" })})
                    </option>
                </select>
            </div>

            {/* ✅ Calendar Table */}
            <div className="overflow-x-auto">
                <table className="w-full border text-sm">
                    <thead className="bg-gray-100">
                        <tr className="text-center">
                            <th className="border px-2 py-1">Date</th>
                            {games.map((game) => (
                                <th key={game.ID} className="border px-2 py-1">
                                    {game.NAME}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dates.map((dateObj, idx) => {
                            const formattedDate = dateObj.toLocaleDateString("en-GB");
                            // "03/08/2025" format (dd/mm/yyyy)

                            return (
                                <tr key={idx} className="text-center">
                                    {/* ✅ Proper Date */}
                                    <td className="border px-2 py-1 font-semibold">{formattedDate}</td>

                                    {games.map((game) => (
                                        <td key={game.ID} className="border px-2 py-1 text-green-600">
                                        {getResultForGame(game.ID, dateObj)} 
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
