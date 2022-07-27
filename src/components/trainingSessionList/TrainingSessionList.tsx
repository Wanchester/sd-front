import React from "react";
import Container from "react-bootstrap/Container";
import { UserListInterface } from "../../HomePage";
import { Col, Row } from "react-bootstrap";
const TrainingSessionList = ({
  trainingList,
}: {
  trainingList: UserListInterface["user"]["trainingList"];
}) => {
  return (
    <>
      <h2>Training Sessions</h2>
      <Container>
        <Row>
          <Col>Training Session Name</Col>
          <Col>Training Date Name</Col>
        </Row>
        <Row>
          {trainingList &&
            trainingList.map((session) =>
              Object.entries(session).map((arr) => {
                return (
                  <Row>
                    <Col>{arr[0]}</Col>
                    <Col>{arr[1] ? arr[1] : "Not Available"}</Col>
                  </Row>
                );
              })
            )}
        </Row>
      </Container>
    </>
  );
};
export default TrainingSessionList;
