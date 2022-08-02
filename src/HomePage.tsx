import { Container, Row, Button, Col } from "react-bootstrap";
import Avatar from "./components/avatar/Avatar";
import UserDescription from "./components/userDescription/UserDescription";

import Teams from "./components/teams/Teams";
import apiMethods, { ProfileResponse } from "./API";

const HomePage = () => {
  const teamsList = {
    team: {
      teamName: "TeamName here",
    },
  };
  const player = apiMethods.getPlayer("p_warren");

  return (
    <Container fluid>
      <Row>
        <h1 className="py-4 mb-0">Homepage</h1>
        <hr />
      </Row>
      <Row>
        <Col className="flex-grow-1" sm={6} md={4} lg={3} xl={2}>
          <div className="w-100 border-end">
            <Avatar imageLink="image/test.jpeg" />
          </div>
        </Col>
        <Col className="flex-grow-1" sm={6} md={7} lg={7} xl={7}>
          <UserDescription userList={player} />
          {/* <UserDescription /> */}
        </Col>
        <Col
          className="d-flex flex-direction: column flex-grow-1 justify-content-right align-self-end"
          sm={6}
          md={4}
          lg={2}
          xl={3}
        >
          <Button>My statistics</Button>
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
    </Container>
  );
};
export default HomePage;
