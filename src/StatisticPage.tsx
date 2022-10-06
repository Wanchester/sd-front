import Sidebar from "./components/Nav/Sidebar";
import { Container, Row, Table, Col, Spinner } from "react-bootstrap";
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
    <Container fluid>
      {player ? (
        <>
          <Container fluid>
            <Row>
              <Sidebar />
            </Row>
          </Container>
          {player && (
            <Col>
              <Header content={player.name} />
            </Col>
          )}
          <Table responsive bordered>
            <Row>
              {player && selectedTeam && (
                <GraphContainer
                  isComposed={true}
                  teamReq={selectedTeam.filter((team) => checkExist(team))}
                  nameReq={[player.name]}
                />
              )}
            </Row>
            <Row sm={3} md={3} lg={3} xl={3}>
              {teams && (
                <DropDownButton
                  optionList={teams.filter((team) => checkExist(team))}
                  setValue={(data: string[]) => {
                    setSelectedTeam(data);
                  }}
                />
              )}
            </Row>
          </Table>
          <Table responsive bordered>
            {player && (
              <Row>
                {teams && (
                  <GraphContainer
                    teamReq={teams.filter((team) => checkExist(team))}
                    nameReq={[player.name]}
                  />
                )}
              </Row>
            )}
          </Table>
        </>
      ) : (
        <>{error}</>
      )}

      <Container className="h-100 w-100 d-flex justify-content-center">
        <Spinner animation="border" variant="light" />
      </Container>
    </Container>
  );
};

export default StatisticPage;
