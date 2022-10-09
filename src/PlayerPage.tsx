import { Container, Row, Button, Col } from "react-bootstrap";

import { LoadingSpinner } from "./components/loadingSpinner/LoadingSpinner";
import Avatar from "./components/avatar/Avatar";
import UserDescription from "./components/userDescription/UserDescription";
import Teams from "./components/teams/Teams";
import TrainingSession from "./components/trainingSession/TrainingSession";
import Header from "./components/header/Header";

import apiMethods, { ProfileResponse } from "./API";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

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
        <Container fluid>
          {user.role !== "player" ? (
            <Container>
              <Col>
                <Header content={player.name} userRole={user.role} />
              </Col>

              <Row>
                <Col className="flex-grow-1" sm={6} md={4} lg={3} xl={2}>
                  <div className="w-100 border-end">
                    <Avatar imageLink="/image/player.jpeg" />
                  </div>
                </Col>
                <Col className="flex-grow-1" sm={6} md={7} lg={7} xl={7}>
                  {player && (
                    <UserDescription userList={player} isPlayer={false} />
                  )}
                </Col>
                <Col
                  className="d-flex flex-direction: column flex-grow-1 justify-content-right align-self-end"
                  sm={6}
                  md={4}
                  lg={2}
                  xl={3}
                >
                  <Link to={`/statistics/${playerName}`}>
                    <Button>{playerName} statistics</Button>
                  </Link>
                </Col>
              </Row>
              <Row className="pt-4">
                <Col md={{ span: 6, offset: 2 }}>
                  <h2>Teams</h2>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 7, offset: 2 }}>
                  {player && <Teams teamsList={player.teams} user={user} />}
                </Col>
              </Row>
              <Row className="pt-4">
                <Col md={{ span: 6, offset: 2 }}>
                  <h2>Training Session List</h2>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 7, offset: 2 }}>
                  {player && (
                    <TrainingSession
                      trainingList={player.trainingSessions.filter((session) =>
                        checkExist(session.teamName)
                      )}
                    />
                  )}
                </Col>
              </Row>
            </Container>
          ) : (
            <>{error}</>
          )}
        </Container>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};
export default PlayerPage;
