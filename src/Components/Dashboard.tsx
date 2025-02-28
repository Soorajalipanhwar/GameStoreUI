import React, { useContext, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { TextField, Typography } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { GamesContext } from "./GamesContext";
import { Game } from "./GamesContext";

const Dashboard: React.FC = () => {
  const { games } = useContext(GamesContext); // Use shared games state
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleManageClick = () => {
    navigate("/management");
  };

  const handleGameClick = (game: Game) => {
    setSelectedGame(game);
  };
  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container fluid>
      <Row className="d-flex justify-content-between align-items-center border border-info border-start-0 rounded-end">
        <Col>
          <Typography
            variant="h1"
            sx={{
              color: "steelblue",
              fontSize: { xs: "1rem", sm: "1.5rem", md: "2.5rem" },
              fontWeight: "bold",
              width: "fit-content",
            }}
          >
            List of Games
          </Typography>
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <Button
            color="primary"
            style={{
              margin: "1rem 0rem",
              boxShadow: "0 2px 15px rgba(0, 0, 0, 0.1)",
              width: "150px",
            }}
            onClick={handleManageClick}
          >
            Manage
          </Button>
        </Col>
      </Row>

      <Row className="mt-3 d-flex order-1 order-md-2">
        <Col md={5}>
          <Form.Group controlId="searchBox">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search for games..."
              value={searchQuery}
              style={{ width: "100%" }}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form.Group>
          <div className="game-list">
            <h3>Games</h3>
            {filteredGames.map((game) => (
              <div
                key={game.id}
                className="game-item d-flex justify-content-between align-items-center p-2"
                onClick={() => handleGameClick(game)}
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    selectedGame?.id === game.id ? "#e3f2fd" : "transparent",
                  // border: "1px solid coral",
                  borderRadius: "5px",
                  marginBottom: "2px",
                  // padding: "10px",
                  boxShadow: "0 0px 1px rgba(0,0,0,0.1)",
                }}
              >
                <div>{game.name}</div>
                <img
                  src={game.imageUri}
                  alt={game.name}
                  style={{
                    width: "30px",
                    maxWidth: "30px",
                    height: "auto",
                    marginRight: "1rem",
                  }}
                />
              </div>
            ))}
          </div>
        </Col>
        <Col md={6} className="d-flex justify-content-center">
          <div className="game-images">
            <h3>Selected Game</h3>
            {selectedGame ? (
              <div
                className="card"
                style={{
                  width: "20rem",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <img
                  src={selectedGame.imageUri}
                  className="card-img-top"
                  alt={selectedGame.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                    borderRadius: "8px 8px 0 0",
                  }}
                />
                <div className="card-body">
                  <h5
                    className="card-title "
                    style={{
                      width: "100%",
                      // border: "1px solid red",
                      marginBottom: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {selectedGame.name}
                  </h5>
                  <p className="card-text">
                    <strong>Genre : </strong>
                    {selectedGame.genre}&nbsp;
                  </p>
                  <p className="card-text">
                    <strong>Price:</strong> ${selectedGame.price}
                  </p>
                  <p className="card-text">
                    <strong>Release Date:</strong>{" "}
                    {new Date(selectedGame.releaseDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ) : (
              <p>Select a game to view its details.</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
