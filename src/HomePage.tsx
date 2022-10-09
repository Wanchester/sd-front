import { Container, Row, Button, Col } from "react-bootstrap";

import Avatar from "./components/avatar/Avatar";
import UserDescription from "./components/userDescription/UserDescription";
import Teams from "./components/teams/Teams";
import TrainingSession from "./components/trainingSession/TrainingSession";
import Header from "./components/header/Header";

import { ProfileResponse } from "./API";
import { Link } from "react-router-dom";

const HomePage = ({ user }: { user: ProfileResponse }) => {
  const teamsList = user.teams;
  return (
    <>
      {user && (
        <Container fluid>
          <Row className="flex-grow-1 m-0">
            <Col>
              <Header content={"Home"} userRole={user.role} />
            </Col>
          </Row>
          <Row>
            <Col className="flex-grow-1" sm={2} md={2} lg={2} xl={2}>
              <div className="w-100 border-end">
                <Avatar imageLink="image/player.jpeg" />
              </div>
            </Col>
            <Col className="flex-grow-1" sm={6} md={7} lg={7} xl={7}>
              <UserDescription userList={user} isPlayer={true} />
            </Col>
            <Col
              className="d-flex flex-direction: column flex-grow-1 justify-content-right align-self-end"
              sm={6}
              md={4}
              lg={2}
              xl={3}
            >
              {user.role === "player" && (
                <Link to={`/statistics/${user.name}`}>
                  <Button>My statistics</Button>
                </Link>
              )}
            </Col>
          </Row>
          <Row className="pt-4">
            <Col md={{ span: 6, offset: 2 }}>
              <h2>Teams</h2>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 7, offset: 2 }}>
              <Teams teamsList={teamsList} user={user} />
            </Col>
          </Row>
          <Row className="pt-4">
            <Col md={{ span: 6, offset: 2 }}>
              <h2>Training Session List</h2>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 7, offset: 2 }}>
              <TrainingSession trainingList={user.trainingSessions} />
            </Col>
          </Row>{" "}
        </Container>
      )}
    </>
  );
};
export default HomePage;
