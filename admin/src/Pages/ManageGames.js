import React, { useState, useEffect } from "react";
import { Table, Form, Button, Alert, Row, Col, Breadcrumb, Card } from 'react-bootstrap'
import axios from "axios";

import {useNavigate} from "react-router-dom"

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
    navigate (`/edit-result/${game}`)
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this game?")) {
      try {
        await axios.delete(`/api/games/${id}`);
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

  return (
    <div className="p-3" style={{ marginTop: "60px"}}>
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
      <Card className="mb-4">
        <Card.Body>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Game Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Game Name"
                    required
                    value={editGame.name}
                    onChange={(e) => setEditGame({ ...editGame, name: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Time 1</Form.Label>
                  <Form.Control
                    type="time"
                    required
                    value={editGame.time1}
                    onChange={(e) => setEditGame({ ...editGame, time1: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Time 2</Form.Label>
                  <Form.Control
                    type="time"
                    required
                    value={editGame.time2}
                    onChange={(e) => setEditGame({ ...editGame, time2: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Days</Form.Label>
                  <Form.Control
                    as="select"
                    value={editGame.days}
                    onChange={(e) => setEditGame({ ...editGame, days: e.target.value })}
                  >
                    <option value="7">Monday to Sunday</option>
                    <option value="6">Monday to Saturday</option>
                    <option value="5">Monday to Friday</option>
                    <option value="4">Monday to Thursday</option>
                    <option value="3">Monday to Wednesday</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Button type="submit" variant="primary">
              {editGame.id ? "Update" : "Add"}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Games Table with Holiday Checkbox */}
      <Form onSubmit={handleHolidaySubmit}>
        <Table bordered hover responsive>
          <thead className="bg-primary text-white text-center">
            <tr>
              <th>ID</th>
              <th>Game</th>
              <th>Result 1 Time</th>
              <th>Result 2 Time</th>
              <th>Holiday</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.id}>
                <td>{game.ID}</td>
                <td>{game.NAME}</td>
                <td>{game.time1}</td>
                <td>{game.time2}</td>
                <td className="text-center">
                  <Form.Check
                    type="checkbox"
                    checked={holidays[game.id] || false}
                    onChange={() => handleHolidayChange(game.id)}
                  />
                </td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleEdit(game.ID)}>
                    <i className="fa fa-pen"></i>
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(game.id)}
                  >
                    <i className="fa fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="4"></td>
              <td>
                <Button type="submit" variant="primary">
                  Update
                </Button>
              </td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </Form>
    </div>
  );
}
