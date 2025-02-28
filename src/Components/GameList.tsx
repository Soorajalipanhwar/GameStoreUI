import React, { useEffect, useState } from "react";
import { getAllGames } from "./gameService";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const GameList: React.FC = () => {
  const [games, setGames] = useState<any[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesData = await getAllGames();
        setGames(gamesData);
      } catch (error) {
        console.error("Failed to fetch games:", error);
      }
    };

    fetchGames();
  }, []);

  return (
    <List>
      {games.map((game) => (
        <ListItem key={game.id} disablePadding>
          <ListItemButton>
            <ListItemText primary={game.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default GameList;
