import react from "react";
import { Container, Table, Button, Alert } from "react-bootstrap";
import Avatar from "./components/avatar/Avatar";
import UserDescription from "./components/userDescription/UserDescription";
import TrainingSessionList from "./components/trainingSessionList/TrainingSessionList";
import TestImage from "./image/test.jpeg";
import { Row, Col } from "react-bootstrap";
import Teams from "./components/teams/Teams";

export interface UserListInterface {
  user: {
    name: string;
    email: string;
    dateOfBirth: string;
    nationality: null | string;
    height: number;
    weight: number;
    trainingList: {
      running: string;
      walking: string;
    }[];
  };
}
const HomePage = () => {
  const userList = {
    user: {
      name: "Hello World",
      email: "Hello@hello.com",
      dateOfBirth: "12/3/2000",
      nationality: null,
      height: 100,
      weight: 120,
      trainingList: [{ running: "12/12/12", walking: "1/1/12" }],
    },
  } as UserListInterface;
  const teamsList = {
    team: {
      teamName: "TeamName here",
    },
  };
  return (
    <Container fluid>
      <Row>
        <h1>Homepage</h1>
        <hr />
      </Row>
      <Row>
        <Col className="flex-grow-1" sm={6} md={4} lg={3} xl={2}>
          <div className="w-100 border-end">
            <Avatar imageLink={TestImage} />
          </div>
        </Col>
        <Col className=" flex-grow-1 " sm={6} md={7} lg={7} xl={7}>
          <UserDescription userList={userList} />
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
      <Row>
        <Col md={{ span: 6, offset: 2 }}>
          <h2>Teams</h2>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 7, offset: 2 }}>
          <Teams teamsList={teamsList} />
        </Col>
      </Row>
      <Row>
        <Col lg={{ span: 7, offset: 2 }}>
          <TrainingSessionList trainingList={userList.user.trainingList} />
        </Col>
      </Row>
    </Container>
  );
};
export default HomePage;
