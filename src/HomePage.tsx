import { Container, Row, Button, Col } from "react-bootstrap";

import Avatar from "./components/avatar/Avatar";
import UserDescription from "./components/userDescription/UserDescription";
import Teams from "./components/teams/Teams";
import TrainingSession from "./components/trainingSession/TrainingSession";

import apiMethods, { ProfileResponse } from "./API";
import { Link } from "react-router-dom";

const HomePage = ({ player }: { player: ProfileResponse }) => {
  const teamsList = player.teams;
  return (
    <Container fluid>
      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <a
          href="#"
          onClick={async (event) => {
            event.preventDefault();
            await apiMethods.logOut();
            window.location.reload();
          }}
        >
          Logout
        </a>
      </div>
      <Row>
        <h1 className="py-4 mb-0">Homepage</h1>
        <hr />
      </Row>
      <Row>
        <Col className="flex-grow-1" sm={6} md={4} lg={3} xl={2}>
          <div className="w-100 border-end">
            <Avatar imageLink="image/player.jpeg" />
          </div>
        </Col>
        <Col className="flex-grow-1" sm={6} md={7} lg={7} xl={7}>
          <UserDescription userList={player} />
        </Col>
        <Col
          className="d-flex flex-direction: column flex-grow-1 justify-content-right align-self-end"
          sm={6}
          md={4}
          lg={2}
          xl={3}
        >
          <Link to="/statistic">
            <Button>My statistics</Button>
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
          <Teams teamsList={teamsList} />
        </Col>
      </Row>
      <Row className="pt-4">
        <Col md={{ span: 6, offset: 2 }}>
          <h2>Training Session List</h2>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 7, offset: 2 }}>
          <TrainingSession userList={player} />
        </Col>
      </Row>
    </Container>
  );
};
export default HomePage;
