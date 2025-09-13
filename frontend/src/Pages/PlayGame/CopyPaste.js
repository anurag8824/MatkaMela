import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../Utils/axiosInstance";
import { toast } from "react-toastify";

const CopyPaste = () => {
  const backUrl = process.env.REACT_APP_BACKEND_URL;
  const gameId = useParams().id
  const [numberInput, setNumberInput] = useState("");
  const [pointsInput, setPointsInput] = useState("");
  const [paltiType, setPaltiType] = useState("with"); // with/without
  const [bets, setBets] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [loading, setLoading] = useState(false); // ✅ loading state

  // Generate separate combination objects for each row
  const generateCombinations = (num, type) => {
    const strNum = num.toString();
    let combinations = [];

    if (type === "with") {
      for (let i = 0; i < strNum.length - 1; i++) {
        const pair = strNum.slice(i, i + 2);
        if (pair.length === 2) {
          combinations.push(pair);
          const reversed = pair[1] + pair[0];
          if (reversed !== pair) combinations.push(reversed);
        }
      }
    } else {
      if (strNum.length % 2 !== 0) {
        alert("Without Palti requires even number of digits!");
        return [];
      }
      for (let i = 0; i < strNum.length; i += 2) {
        combinations.push(strNum.slice(i, i + 2));
      }
    }

    return [...new Set(combinations)]; // unique combinations
  };

  const handleAdd = () => {
    if (!numberInput || !pointsInput) {
      alert("Enter number and points");
      return;
    }

    const combos = generateCombinations(numberInput, paltiType);
    if (combos.length === 0) return;

    const newBets = combos.map((c) => ({
      number: numberInput,
      combination: c,
      points: parseInt(pointsInput),
      paltiType,
    }));

    setBets([...bets, ...newBets]);
    setTotalPoints(
      totalPoints + newBets.reduce((acc, b) => acc + b.points, 0)
    );

    setNumberInput("");
    setPointsInput("");
  };

  const handleDelete = (index) => {
    const removedPoints = bets[index].points;
    const updatedBets = bets.filter((_, idx) => idx !== index);
    setBets(updatedBets);
    setTotalPoints(totalPoints - removedPoints);
  };

  const handlePlaceBet = async () => {
    setLoading(true);
    try {
      const payload = {
        bets: bets.map((b) => ({
          //   inputnumber: b.number,
          number: b.combination,
          points: b.points,
          paltiType: b.paltiType,
        })),
        totalPoints,
        gameId,
      };
      const response = await axiosInstance.post(
        `${backUrl}/api/bet-game-copypaste`,
        payload
      );
      toast.success("Bet placed successfully!"); // ✅ success toast

      // ✅ reset after success
      setBets([]);
      setTotalPoints(0);
      setNumberInput("");
      setPointsInput("");
      setPaltiType("with");
      window.location.reload();

      console.log(response.data);
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message || "Error placing bet");

    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  

  return (
    <div className="form p-3 bg-white rounded shadow-sm">
     
      <div className="ant-form ant-form-vertical css-2q8sxy w-100">
        <div className="ant-form-item mb-3">
          <label htmlFor="numberInput" className="form-label">
            Number
          </label>
          <input
            id="numberInput"
            placeholder="Number"
            type="text"
            inputMode="numeric"
            className="ant-input form-control inputfile"
            value={numberInput}
            onChange={(e) => setNumberInput(e.target.value)}
          />
        </div>

        <div className="d-flex gap-3 mb-3">
          <div className="d-flex gap-2 align-items-center">
            <input
              type="radio"
              name="paltiType"
              id="withPalti"
              value="with"
              checked={paltiType === "with"}
              onChange={() => setPaltiType("with")}
            />
            <label htmlFor="withPalti" className="m-0">
              With Palti
            </label>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <input
              type="radio"
              name="paltiType"
              id="withoutPalti"
              value="without"
              checked={paltiType === "without"}
              onChange={() => setPaltiType("without")}
            />
            <label htmlFor="withoutPalti" className="m-0">
              Without Palti
            </label>
          </div>
        </div>

        <div className="ant-form-item mb-3">
          <label htmlFor="amountInput" className="form-label">
            Points
          </label>
          <input
            id="amountInput"
            placeholder="Points"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="ant-input form-control inputfile"
            value={pointsInput}
            onChange={(e) => setPointsInput(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="btn btn-primary w-100 mb-3"
          onClick={handleAdd}
        >
          Add
        </button>

        <div className="mb-3">
          <strong>Total Points: {totalPoints}</strong>
        </div>

        {/* Show each combination as a separate row */}
        {bets.map((b, idx) => (
          <div
            key={idx}
            className="d-flex justify-content-between align-items-center mb-2 p-2 border rounded"
          >
            <div>
              <strong>{b.number}</strong> ({b.combination}) - {b.points} points
            </div>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDelete(idx)}
            >
              Delete
            </button>
          </div>
        ))}

        {bets.length > 0 && (
          <button
            className="btn btn-success w-100 mt-3"
            onClick={handlePlaceBet}
            disabled={loading} // ✅ disable while loading
          >
            {loading ? "Placing Bet..." : "Place Bet"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CopyPaste;
