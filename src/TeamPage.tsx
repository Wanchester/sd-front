import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import apiMethods, { PlayerList } from "./API";
import { Link } from "react-router-dom";

const TeamPage = () => {
  const { teamName } = useParams();
  const [playerList, setPlayerList] = useState(null as PlayerList | null);

  useEffect(() => {
    apiMethods.getTeam(teamName).then((team) => {
      console.log(team);
      setPlayerList(team);
    });
  }, [teamName]);

  return (
    <>
      <h1>{teamName}</h1>
      {playerList &&
        playerList.players.map((player) => {
          return (
            <Table>
              <tbody>
                <td>
                  <Link to={`/player/${player.username}`}>
                    <tr>{player.name}</tr>
                  </Link>
                </td>
              </tbody>
            </Table>
          );
        })}
    </>
  );
};
export default TeamPage;
