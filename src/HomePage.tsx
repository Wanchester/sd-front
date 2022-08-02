import { Container, Row, Button, Col } from "react-bootstrap";
import Avatar from "./components/avatar/Avatar";
import UserDescription from "./components/userDescription/UserDescription";
<<<<<<< HEAD

import Teams from "./components/teams/Teams";
import apiMethods, { ProfileResponse } from "./API";

const HomePage = () => {
=======
// import TestImage from "./image/test.jpeg";
import Teams from "./components/teams/Teams";
import apiMethods from "./API";

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
>>>>>>> f96e761a243e9d5550684b9df86dd975361bb23d
  const teamsList = {
    team: {
      teamName: "TeamName here",
    },
  };
  const player = apiMethods.getPlayer("p_warren");
<<<<<<< HEAD
=======
  // apiMethods
  //   .createLocationApi()
  //   .then((data) => {
  //     console.log(data.data, 123456789);
  //   })
  //   .catch((err) => console.log(err, 98765));
>>>>>>> f96e761a243e9d5550684b9df86dd975361bb23d
  return (
    <Container fluid>
      <Row>
        <h1 className="py-4 mb-0">Homepage</h1>
        <hr />
      </Row>
      <Row>
        <Col className="flex-grow-1" sm={6} md={4} lg={3} xl={2}>
          <div className="w-100 border-end">
<<<<<<< HEAD
            <Avatar imageLink="image/test.jpeg" />
          </div>
        </Col>
        <Col className="flex-grow-1" sm={6} md={7} lg={7} xl={7}>
          <UserDescription userList={player} />
          {/* <UserDescription /> */}
=======
            {/* <Avatar imageLink={TestImage} /> */}
          </div>
        </Col>
        <Col className="flex-grow-1" sm={6} md={7} lg={7} xl={7}>
          <UserDescription userList={userList} />
>>>>>>> f96e761a243e9d5550684b9df86dd975361bb23d
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
