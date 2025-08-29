import { useEffect, useState } from "react";
import axiosInstance from "../Utils/axiosInstance";

export default function ResultHistory() {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await axiosInstance.get("/api/game-result-history");
                setResults(res.data.data || []);
            } catch (err) {
                console.error("Error fetching game results:", err);
            }
        };
        fetchResults();
    }, []);

    // ✅ Group results by date
    const groupedByDate = results.reduce((acc, item) => {
        const dateKey = new Date(item.date).toLocaleDateString();
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(item);
        return acc;
    }, {});

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold text-center mb-4">
                Game Result History
            </h2>

            {Object.keys(groupedByDate).map((DATE, idx) => (
                <div key={idx} className="mb-6 border rounded-lg shadow-sm bg-white">
                    {/* Date Header */}
                    <div className="bg-gray-200 px-4 py-2 font-semibold">{DATE}</div>

                    {/* Results Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full border text-sm">
                            <thead className="bg-gray-100">
                                <tr className="text-center">
                                    <th className="border px-2 py-1">Game</th>
                                    <th className="border px-2 py-1">Result</th>
                                    {/* <th className="border px-2 py-1">Result 2</th> */}
                                    <th className="border px-2 py-1">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupedByDate[DATE].map((game, gidx) => (
                                    <tr key={gidx} className="text-center">
                                        <td className="border px-2 py-1">{game.GAME_NAME}</td>
                                        <td className="border px-2 py-1 text-green-600">
                                            {game.RESULT1}
                                        </td>
                                        {/* <td className="border px-2 py-1 text-blue-600">
                                            {game.RESULT2}
                                        </td> */}
                                        <td className="border px-2 py-1">
                                            {new Date(game.DATE).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
}
