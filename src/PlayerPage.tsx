import { Container, Row, Button, Col } from "react-bootstrap";
import { LoadingSpinner } from "./components/loadingSpinner/LoadingSpinner";
import Avatar from "./components/avatar/Avatar";
import UserDescription from "./components/userDescription/UserDescription";
import Teams from "./components/teams/Teams";
import TrainingSession from "./components/trainingSession/TrainingSession";
import Header from "./components/header/Header";
import apiMethods, { ProfileResponse } from "./API";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const PlayerPage = ({ user }: { user: ProfileResponse }) => {
  const { playerName } = useParams();
  const [player, setPlayer] = useState(null as ProfileResponse | null);
  const [error, setError] = useState("");
  useEffect(() => {
    if (playerName)
      apiMethods
        .getPlayer(playerName)
        .then((p) => {
          setPlayer(p);
        })
        .catch((e) => {
          setError(e.response.data.error);
        });
  });
  const checkExist = (team: string) => {
    return user.teams.includes(team);
  };

  return (
    <>
      {player ? (
        <Container>
          {user.role !== "player" ? (
            <>
              <Header content={player.name} userRole={user.role} />
              <Row>
                <Col className="flex-grow-1" md={4} lg={3}>
                  <div className="w-100 border-end">
                    <Avatar imageLink="/image/avatar.jpeg" />
                  </div>
                </Col>
                <Col className="flex-grow-1 mt-2 mt-md-0" md={8} lg={9}>
                  {player && (
                    <UserDescription userList={player} isPlayer={false} />
                  )}
                  <Link to={`/statistics/${playerName}`}>
                    <Button>{playerName} statistics</Button>
                  </Link>
                </Col>
              </Row>
              <Row className="pt-5">
                <Col md={{ span: 8, offset: 4 }} lg={{ span: 9, offset: 3 }}>
                  <h2>Teams</h2>
                </Col>
                <Col md={{ span: 8, offset: 4 }} lg={{ span: 9, offset: 3 }}>
                  {player && <Teams teamsList={player.teams} user={user} />}
                </Col>
              </Row>
              <Row className="pt-5">
                <Col md={{ span: 8, offset: 4 }} lg={{ span: 9, offset: 3 }}>
                  <h2>Training Session List</h2>
                </Col>
                <Col md={{ span: 8, offset: 4 }} lg={{ span: 9, offset: 3 }}>
                  {player && (
                    <TrainingSession
                      trainingList={player.trainingSessions.filter((session) =>
                        checkExist(session.teamName)
                      )}
                    />
                  )}
                </Col>
              </Row>
            </>
          ) : (
            error
          )}
        </Container>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};
export default PlayerPage;
