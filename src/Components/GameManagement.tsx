import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { GamesContext } from "./GamesContext";
// import { ClassNames } from "@emotion/react";

const GameManagement: React.FC = () => {
  const { games, addGame, updateGame, deleteGame } = useContext(GamesContext);
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
  const [name, setName] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [releaseDate, setReleaseDate] = useState<string>("");
  const [imageUri, setImageUri] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleGameSelect = (event: any) => {
    const gameId = event.target.value;
    setSelectedGameId(gameId);
    const selectedGame = games.find((game) => game.id === gameId);
    if (selectedGame) {
      setName(selectedGame.name);
      setGenre(selectedGame.genre);
      setPrice(selectedGame.price);
      setReleaseDate(selectedGame.releaseDate);
      setImageUri(selectedGame.imageUri);
    } else {
      resetForm();
    }
  };

  const handleEdit = async () => {
    if (selectedGameId !== null && validateForm()) {
      await updateGame(selectedGameId, {
        name,
        genre,
        price,
        releaseDate,
        imageUri,
      });
      resetForm();
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!name) {
      newErrors.name = "Name is required.";
    } else if (name.length > 50) {
      newErrors.name = "Name must be 50 characters or less.";
    }

    // Genre validation
    if (!genre) {
      newErrors.genre = "Genre is required.";
    } else if (genre.length > 20) {
      newErrors.genre = "Genre must be 20 characters or less.";
    }

    // Price validation
    if (!price) {
      newErrors.price = "Price is required.";
    } else if (
      isNaN(Number(price)) ||
      Number(price) < 1 ||
      Number(price) > 100
    ) {
      newErrors.price = "Price must be a number between 1 and 100.";
    }

    // Release Date validation
    if (!releaseDate) {
      newErrors.releaseDate = "Release Date is required.";
    }

    // Image URL validation
    if (!imageUri) {
      newErrors.imageUri = "Image URL is required.";
    } else if (!/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(imageUri)) {
      newErrors.imageUri = "Image URL must be a valid URL.";
    } else if (imageUri.length > 100) {
      newErrors.imageUri = "Image URL must be 100 characters or less.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleAdd = async () => {
    if (validateForm()) {
      console.log(name + genre + price + releaseDate + imageUri);
      if (!name || !genre || !price || !releaseDate || !imageUri) return;

      await addGame({ name, genre, price, releaseDate, imageUri });

      resetForm(); // Reset form after adding new game
    }
  };

  const handleDelete = async () => {
    if (selectedGameId !== null) {
      if (window.confirm("Are you sure you want to delete this game?")) {
        await deleteGame(selectedGameId);
        resetForm();
      }
    }
  };

  const resetForm = () => {
    setSelectedGameId(null);
    setName("");
    setGenre("");
    setPrice("");
    setReleaseDate("");
    setImageUri("");
    setErrors({});
  };

  return (
    <Container fluid>
      <Row className="d-flex justify-content-between align-items-center border border-info border-start-0 rounded-end">
        <Col>
          <Typography
            variant="h1"
            className="responsive-text"
            sx={{
              color: "steelblue",
              fontSize: { xs: "1rem", sm: "1.5rem", md: "2.5rem" },
              fontWeight: "bold",
              width: "fit-content",
            }}
          >
            Manage Games
          </Typography>
        </Col>
        <Col className="d-flex justify-content-end align-items-center ">
          <Button
            color="primary"
            style={{
              margin: "1rem 0rem",
              boxShadow: "0 2px 15px rgba(0, 0, 0, 0.1)",
              width: "150px",
            }}
            onClick={() => navigate("/")}
          >
            Dashboard view
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={4} className="m-2 mt-2 order-2 order-md-1">
          <Col>
            <h3>Games</h3>
          </Col>
          <Col className="d-flex flex-column justify-content-center">
            <div className="list" style={{ cursor: "pointer" }}>
              {games.map((game) => (
                <div
                  key={game.id}
                  className="mb-2 d-flex justify-content-between align-items-center"
                  onClick={() =>
                    handleGameSelect({ target: { value: game.id } })
                  }
                >
                  <div>{game.name}</div>
                  <div>
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
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGameSelect({ target: { value: game.id } });
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete();
                      }}
                      className="ms-2"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Col>
        <Col
          md={6}
          className="mx-auto border border-info mt-2 d-flex flex-column align-items-center justify-content-center order-1 order-md-2"
          style={{ maxWidth: "400px" }}
        >
          <h3 style={{ fontSize: "2rem" }} className="m-0">
            Game Details
          </h3>
          <Form style={{ transform: "scale(1)", maxWidth: "100%" }}>
            <FormControl fullWidth variant="outlined" className="mb-0">
              {" "}
              {/* Increased spacing */}
              <InputLabel
                id="game-id-label"
                shrink={!!selectedGameId}
                style={{ fontSize: "0.9rem" }}
              >
                Id
              </InputLabel>
              <Select
                labelId="game-id-label"
                value={selectedGameId}
                onChange={handleGameSelect}
                label="Id"
                style={{ fontSize: "0.9rem", height: "40px" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {games.map((game) => (
                  <MenuItem key={game.id} value={game.id}>
                    {game.id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
              className="mb-0" // Increased spacing
              style={{ fontSize: "0.9rem", height: "40px" }}
            />

            <TextField
              fullWidth
              label="Genre"
              variant="outlined"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              error={!!errors.genre}
              helperText={errors.genre}
              className="mt-2" // Increased spacing
              style={{ fontSize: "0.9rem", height: "40px" }}
            />

            <TextField
              fullWidth
              label="Price"
              variant="outlined"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              error={!!errors.price}
              helperText={errors.price}
              className="mt-2" // Increased spacing
              style={{ fontSize: "0.9rem", height: "40px" }}
            />

            <TextField
              fullWidth
              label="Image URL"
              variant="outlined"
              value={imageUri}
              onChange={(e) => setImageUri(e.target.value)}
              error={!!errors.imageUri}
              helperText={errors.imageUri}
              className="mt-2" // Increased spacing
              style={{ fontSize: "0.9rem", height: "40px" }}
            />

            <TextField
              fullWidth
              label="Release Date"
              variant="outlined"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              error={!!errors.releaseDate}
              helperText={errors.releaseDate}
              className="mt-2" // Increased spacing
              style={{ fontSize: "0.9rem", height: "40px" }}
            />

            <div className="d-flex gap-3 mt-2">
              {" "}
              {/* Increased gap between buttons */}
              <Button
                variant="contained"
                color="primary"
                onClick={handleEdit}
                disabled={!selectedGameId}
                style={{ fontSize: "0.8rem", padding: "5px 15px" }}
              >
                Update
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleAdd}
                disabled={!!selectedGameId}
                style={{ fontSize: "0.8rem", padding: "5px 15px" }}
              >
                Add
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default GameManagement;
