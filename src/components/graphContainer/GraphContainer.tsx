import React from "react";
import { Nav, Tab, Row, Col, Container } from "react-bootstrap";

const GraphContainer = () => {
  return (
    <Container className="responsive h-100 w-100">
      <Tab.Container id="left-tabs-example" defaultActiveKey="acceleration">
        <Row>
          <Col sm={3} md={3} lg={3} xl={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="acceleration">acceleration</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="speed">speed</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9} md={9} lg={9} xl={9}>
            <Tab.Content className="h-50 d-inline-block">
              <Tab.Pane
                eventKey="acceleration"
                className="pb-1 postition-relative"
              >
                <h1>ACCELERATION</h1>
              </Tab.Pane>
              <Tab.Pane eventKey="speed" className="pb-1 postition-relative">
                <h1>SPEED</h1>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default GraphContainer;
