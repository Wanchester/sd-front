import { Container, Row, Col } from "react-bootstrap";
import { LoadingSpinner } from "./components/loadingSpinner/LoadingSpinner";
import { useParams } from "react-router-dom";
import DropDownButton from "./components/dropDownButton/DropDownButton";
import GraphContainer from "./components/graphContainer/GraphContainer";
import Header from "./components/header/Header";
import { useEffect, useState } from "react";
import apiMethods, { ProfileResponse } from "./API";

const StatisticPage = ({ user }: { user: ProfileResponse }) => {
  const { playerName } = useParams();
  const [player, setPlayer] = useState(null as ProfileResponse | null);
  const [teams, setTeams] = useState(null as ProfileResponse["teams"] | null);
  const [selectedTeam, setSelectedTeam] = useState([] as string[] | null);
  const [error, setError] = useState("");
  const checkExist = (team: string) => {
    if (user) return user.teams.includes(team);
  };
  useEffect(() => {
    if (playerName && user.role === "coach") {
      apiMethods
        .getPlayer(playerName)
        .then((p) => setPlayer(p))
        .catch((e) => {
          console.error(e);
          setError(e.response.data.error);
        });
    } else setPlayer(user);
  }, [playerName, user]);
  useEffect(() => {
    if (player) {
      setTeams(player.teams);
      setSelectedTeam(teams);
    }
  }, [player, teams]);
  return (
    <Container>
      {player ? (
        <>
          <Header content={player.name} userRole={user.role} />
          {player && selectedTeam && (
            <GraphContainer
              isComposed={true}
              teamReq={selectedTeam.filter((team) => checkExist(team))}
              nameReq={[player.name]}
            />
          )}
          <Row className="justify-content-center py-4">
            <Col>
              {teams && (
                <DropDownButton
                  optionList={teams.filter((team) => checkExist(team))}
                  setValue={(data: string[]) => {
                    setSelectedTeam(data);
                  }}
                />
              )}
            </Col>
          </Row>
          {player && teams && (
            <GraphContainer
              teamReq={teams.filter((team) => checkExist(team))}
              nameReq={[player.name]}
            />
          )}
        </>
      ) : error ? (
        <>{error}</>
      ) : (
        <LoadingSpinner />
      )}
    </Container>
  );
};

export default StatisticPage;
