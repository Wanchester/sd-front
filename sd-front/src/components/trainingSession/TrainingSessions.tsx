import { Table } from "react-bootstrap";
import { Interface1 } from "../../HomePage";
import React from "react";
import { Container, Row, Button, Col } from "react-bootstrap";

const TrainingSession = ({ interfaceP }: { interfaceP: Interface1 }) => {
  return (
    <Table responsive bordered variant="dark" className="table-condensed mb-0">
      {interfaceP &&
        Object.entries(interfaceP.user.trainingSessions).map((arr, i) => {
          return (
            <Container key={i}>
              <Row>
                <Col>{interfaceP.user.trainingSessions[i].sessionName}</Col>
                <Col>{interfaceP.user.trainingSessions[i].sessionDate}</Col>
              </Row>
            </Container>
          );
        })}
    </Table>
  );
};
export default TrainingSession;
