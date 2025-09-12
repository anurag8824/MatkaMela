import React, { useState, useEffect } from "react";
import { Table, Form, Button, Alert, Row, Col, Breadcrumb, Card } from 'react-bootstrap'
import axios from "axios"

import { useNavigate } from "react-router-dom"
import axiosInstance from "../Utils/axiosInstance"


export default function ManageGames() {
  const backUrl = process.env.REACT_APP_BACKEND_URL;
  const [games, setGames] = useState([]);
  const [editGame, setEditGame] = useState({
    id: "",
    name: "",
    time1: "",
    time2: "",
    days: "7",
  });
  const [message, setMessage] = useState("");
  const [holidays, setHolidays] = useState({});

  // Fetch all games
  useEffect(() => {
    fetchGames()
  }, []);



  const fetchGames = async () => {
    try {
      const res = await axios.get(`${backUrl}/api/get-games`); // Replace with your backend API
      setGames(res.data);
      // Prepare holiday checkboxes
      const holidayState = {};
      res.data.forEach((g) => {
        holidayState[g.id] = g.holiday === "checked";
      });
      setHolidays(holidayState);
    } catch (error) {
      console.error("Error fetching games", error);
    }
  };

  const navigate = useNavigate()

  const handleEdit = (game) => {
    // setEditGame({
    //   id: game.id,
    //   name: game.name,
    //   time1: game.time1Raw || "",
    //   time2: game.time2Raw || "",
    //   days: game.days || "7",
    // });
    navigate(`/public/administrator/game/edit-game/${game}`)
  };

  const handleDelete = async (ID) => {
    if (window.confirm("Are you sure you want to delete this game?")) {
      try {
        await axiosInstance.post(`/api/delete-game`, { id: ID });
        setMessage("Game Deleted!");
        fetchGames();
      } catch (error) {
        console.error("Error deleting game", error);
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editGame.id) {
        await axios.put(`/api/games/${editGame.id}`, editGame);
        setMessage("Game Updated!");
      } else {
        await axios.post(`/api/games`, editGame);
        setMessage("Game Added!");
      }
      fetchGames();
      setEditGame({ id: "", name: "", time1: "", time2: "", days: "7" });
    } catch (error) {
      console.error("Error saving game", error);
    }
  };

  const handleHolidayChange = (id) => {
    setHolidays({ ...holidays, [id]: !holidays[id] });
  };

  const handleHolidaySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/games/holidays", holidays);
      setMessage("Holidays Updated!");
    } catch (error) {
      console.error("Error updating holidays", error);
    }
  };

  //   marginLeft: "250px" 


  const [gameName, setGameName] = useState("");
  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: gameName,
        time1: time1,
        time2: time2,
      };

      const response = await axiosInstance.post("admin/add-new-game", payload);
      console.log("Game Added:", response.data);

      // clear form after submit
      setGameName("");
      setTime1("");
      setTime2("");
      window.location.reload();

    } catch (error) {
      console.error("Error adding game:", error);
    }
  };

  return (
    <div className="p-3" style={{ marginTop: "60px" }}>
      <Row className="mb-2">
        <Col>
          <h1 className="text-dark">Manage Games</h1>
        </Col>
        <Col>
          <Breadcrumb className="float-right">
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Manage Games</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>

      {message && (
        <Alert variant="success" onClose={() => setMessage("")} dismissible>
          {message}
        </Alert>
      )}

      {/* Game Form */}
      <div className="p-1 borderj rounded shakdow w-full">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Game Name */}
            <div>
              <label className="block mb-1 font-medium">Game Name</label>
              <input
                type="text"
                placeholder="Enter game name"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            {/* Time 1 */}
            <div>
              <label className="block mb-1 font-medium">Time 1</label>
              <input
                type="time"
                value={time1}
                onChange={(e) => setTime1(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            {/* Time 2 */}
            <div>
              <label className="block mb-1 font-medium">Time 2</label>
              <input
                type="time"
                value={time2}
                onChange={(e) => setTime2(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>

          {/* Button aligned right */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </form>

      </div>

      {/* Games Table with Holiday Checkbox */}
      <Form onSubmit={handleHolidaySubmit}>
        <Table bordered hover responsive>
          <thead className="bg-primary text-white text-center">
            <tr>
              <th>ID</th>
              <th>Game</th>
              <th>Open Time</th>
              <th>Close Time</th>
              <th>Game Position</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game, idx) => (
              <tr key={game.id}>
                <td className="text-center">{game.ID}</td>
                <td className="text-center">{game.NAME}</td>
                <td className="text-center">{game.TIME1}</td>
                <td className="text-center">{game.TIME2}</td>
                <td className="text-center">{game.POSITION}</td>

                <td className="text-center hidden">
                  <Form.Check
                    type="checkbox"
                    checked={holidays[game.id] || false}
                    onChange={() => handleHolidayChange(game.id)}
                  />
                </td>
                {game.NAME === "DISAWAR" ? <td>
                  <Button variant="warning" size="sm" onClick={() => handleEdit(game.ID)}>
                    <i className="fa fa-pen"></i>
                  </Button>{" "}
                  
                </td> : <td>
                  <Button variant="warning" size="sm" onClick={() => handleEdit(game.ID)}>
                    <i className="fa fa-pen"></i>
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(game.ID)}
                  >
                    <i className="fa fa-trash"></i>
                  </Button>
                </td>}
              </tr>
            ))}
            <tr>
              <td colSpan="4"></td>
              {/* <td>
                <Button type="submit" variant="primary">
                  Update
                </Button>
              </td> */}
              <td></td>
            </tr>
          </tbody>
        </Table>
      </Form>
    </div>
  );
}
