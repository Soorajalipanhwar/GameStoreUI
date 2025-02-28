import axios from "axios";

const API_URL = "http://localhost:5062/games"; // Adjust the URL as needed

// Fetch all games
export const getAllGames = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Fetch a single game by ID
export const getGameById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create a new game
export const createGame = async (game: any) => {
  const response = await axios.post(API_URL, game);
  return response.data;
};

// Update an existing game
export const updateGame = async (id: number, game: any) => {
  await axios.put(`${API_URL}/${id}`, game);
};

// Delete a game by ID
export const deleteGame = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
