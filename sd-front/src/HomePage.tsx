import { Container, Row, Button, Col } from "react-bootstrap";
import Avatar from "./components/avatar/Avatar";
import UserDescription from "./components/userDescription/UserDescription";
// import TestImage from "./image/test.jpeg";
import Teams from "./components/teams/Teams";
import apiMethods from "./API";
import Sidebar from "./components/Nav/Sidebar";
import { Link } from "react-router-dom";
import TrainingSession from "./components/trainingSession/TrainingSessions";

export interface UserListInterface {
  user: {
    name: string;
    email: string;
    dateOfBirth: string;
    nationality: null | string;
    height: number;
    weight: number;
  };
}
export interface Interface1 {
  user: {
    username: string;
    name: string;
    email: string;
    dob: string;
    nationality: string;
    height: number;
    weight: number;
    role: string;
    teams: string[];
    trainingSessions: TrainingSession[];
  };
}

export interface TrainingSession {
  sessionName: string;
  sessionDate: string;
  sessionTime: string;
  teamName: string;
  duration: string;
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
    },
  } as UserListInterface;
  const teamsList = {
    team: {
      teamName: "TeamName here",
    },
  };
  const interfaceP = {
    user: {
      username: "p_warren",
      name: "Warren",
      email: "warren@gmail.com",
      dob: "02051970",
      nationality: "Vn",
      height: 100,
      weight: 100,
      role: "player",
      teams: ["Team Wanchester", "TeamBit"],
      trainingSessions: [
        {
          sessionName: "Cig",
          sessionDate: "25-07-2022",
          sessionTime: "16:02",
          teamName: "TeamBit",
          duration: "03:41:35",
        },
        {
          sessionName: "Holy",
          sessionDate: "25-07-2023",
          sessionTime: "16:02",
          teamName: "TeamBit",
          duration: "01:12:48",
        },
        {
          sessionName: "Ketchup",
          sessionDate: "25-07-2024",
          sessionTime: "16:02",
          teamName: "Team Wanchester",
          duration: "03:50:30",
        },
      ],
    },
  };
  const player = apiMethods.getPlayer("p_warren");
  // apiMethods
  //   .createLocationApi()
  //   .then((data) => {
  //     console.log(data.data, 123456789);
  //   })
  //   .catch((err) => console.log(err, 98765));
  return (
    <Container fluid p-0>
      <Row>
        <h1>Homepage</h1>
      </Row>
      <Row>
        <Col className="flex-grow-1" sm={6} md={4} lg={3} xl={2}>
          <div className="w-100 border-end">
            {/* <Avatar imageLink={TestImage} /> */}
          </div>
        </Col>
        <Col className="flex-grow-1" sm={6} md={7} lg={7} xl={7}>
          <UserDescription userList={userList} />
        </Col>
        <Col
          className="d-flex flex-direction: column flex-grow-1 justify-content-right align-self-end"
          sm={6}
          md={4}
          lg={2}
          xl={3}
        >
          <Link to="/StatsPage">
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
      <Container>
        <Row className="color: #686868;">
          <Col><h2>Session name</h2></Col>
          <Col><h2>Session date</h2></Col>
        </Row>
      </Container>
      <Row>
        <TrainingSession interfaceP={interfaceP} />
      </Row>
    </Container>
  );
};
export default HomePage;
