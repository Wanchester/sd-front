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
        <Container>
          <Header content={"Home"} userRole={user.role} />
          <Row>
            <Col className="flex-grow-1 text-center" md={4} lg={3}>
              <div className="w-100 border-end mb-2">
                <Avatar imageLink="/image/avatar.jpeg" />
              </div>
              {user.role === "player" && (
                <Link to={`/statistics/${user.name}`}>
                  <Button>My statistics</Button>
                </Link>
              )}
            </Col>
            <Col className="flex-grow-1 mt-2 mt-md-0" md={8} lg={9}>
              <UserDescription userList={user} isPlayer={true} />
            </Col>
          </Row>
          <Row className="pt-5">
            <Col
              xs={12}
              md={{ span: 8, offset: 4 }}
              lg={{ span: 9, offset: 3 }}
            >
              <h2>Teams</h2>
            </Col>
            <Col
              xs={12}
              md={{ span: 8, offset: 4 }}
              lg={{ span: 9, offset: 3 }}
            >
              <Teams teamsList={teamsList} user={user} />
            </Col>
          </Row>
          <Row className="pt-5">
            <Col
              xs={12}
              md={{ span: 8, offset: 4 }}
              lg={{ span: 9, offset: 3 }}
            >
              <h2>Training Session List</h2>
            </Col>
            <Col
              xs={12}
              md={{ span: 8, offset: 4 }}
              lg={{ span: 9, offset: 3 }}
            >
              <TrainingSession trainingList={user.trainingSessions} />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};
export default HomePage;
