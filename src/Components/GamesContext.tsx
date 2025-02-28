import React, { createContext, useState, ReactNode, useEffect } from "react";
import {
  getAllGames,
  // getGameById,
  createGame as createGameApi,
  updateGame as updateGameApi,
  deleteGame as deleteGameApi,
} from "./gameService";

export interface Game {
  id: number; // Change from string to number to match your API
  name: string;
  genre: string;
  price: string;
  releaseDate: string;
  imageUri: string;
}

interface GamesContextType {
  games: Game[];
  fetchGames: () => Promise<void>;
  addGame: (game: Omit<Game, "id">) => Promise<void>;
  updateGame: (id: number, game: Omit<Game, "id">) => Promise<void>;
  deleteGame: (id: number) => Promise<void>;
}

export const GamesContext = createContext<GamesContextType>({
  games: [],
  fetchGames: async () => {},
  addGame: async () => {},
  updateGame: async () => {},
  deleteGame: async () => {},
});

export const GamesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [games, setGames] = useState<Game[]>([]);

  // Fetch all games from the API
  const fetchGames = async () => {
    try {
      const gamesData = await getAllGames();
      setGames(gamesData);
    } catch (error) {
      console.error("Failed to fetch games:", error);
    }
  };

  // Add a new game
  const addGame = async (game: Omit<Game, "id">) => {
    try {
      const newGame = await createGameApi(game);
      setGames((prevGames) => [...prevGames, newGame]);
    } catch (error) {
      console.error("Failed to add game:", error);
    }
  };

  // Update an existing game
  const updateGame = async (id: number, game: Omit<Game, "id">) => {
    try {
      await updateGameApi(id, game);
      setGames((prevGames) =>
        prevGames.map((g) => (g.id === id ? { ...g, ...game } : g))
      );
    } catch (error) {
      console.error("Failed to update game:", error);
    }
  };

  // Delete a game
  const deleteGame = async (id: number) => {
    try {
      await deleteGameApi(id);
      setGames((prevGames) => prevGames.filter((g) => g.id !== id));
    } catch (error) {
      console.error("Failed to delete game:", error);
    }
  };

  // Fetch games on component mount
  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <GamesContext.Provider
      value={{ games, fetchGames, addGame, updateGame, deleteGame }}
    >
      {children}
    </GamesContext.Provider>
  );
};
