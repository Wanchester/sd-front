import { Container, Row, Button, Col } from "react-bootstrap";

import Avatar from "./components/avatar/Avatar";
import UserDescription from "./components/userDescription/UserDescription";
import Teams from "./components/teams/Teams";
import TrainingSession from "./components/trainingSession/TrainingSession";
import Breadcrumbs from "./components/breadcrumbs/Breadcrumbs";

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
  }, [playerName]);
  return (
    <>
      <Row className="flex-grow-1" sm={6} md={4} lg={3} xl={2}>
        <Breadcrumbs />
      </Row>
      {user && (
        <>
          {user.role !== "player" ? (
            <Container fluid>
              <Row className="flex-grow-1" sm={6} md={4} lg={3} xl={2}>
                <Breadcrumbs />
              </Row>
              <Row>
                <h1 className="py-4 mb-0">{playerName}</h1>
                <hr />
              </Row>
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
                  <Link to={`/statistic/${playerName}`}>
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
                  {player && <TrainingSession userList={player} />}
                </Col>
              </Row>
            </Container>
          ) : (
            <>
              <p>{error}</p>
            </>
          )}
        </>
      )}
    </>
  );
};
export default PlayerPage;
