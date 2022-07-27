import react from "react";
import { Container, Table, Button } from "react-bootstrap";
import Avatar from "./components/avatar/Avatar";
import UserDescription from "./components/userDescription/UserDescription";
import TrainingSessionList from "./components/trainingSessionList/TrainingSessionList";
import TestImage from "./image/test.jpeg";
import { Row, Col } from "react-bootstrap";

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
  return (
    <Container fluid>
      <Row>
        <Col className="flex-grow-1" sm={6} md={4} lg={3} xl={2}>
          <div className="w-100 border-end">
            <Avatar imageLink={TestImage} />
          </div>
        </Col>
        <Col className="flex-grow-1" sm={6} md={7} lg={8} xl={7}>
          <UserDescription userList={userList} />
        </Col>
        <Col className="flex-grow-1" sm={6} md={4} lg={3} xl={3}>
          <Button>My statistics</Button>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 8, offset: 3 }}>
          <TrainingSessionList trainingList={userList.user.trainingList} />
        </Col>
      </Row>
    </Container>
  );
};
export default HomePage;
