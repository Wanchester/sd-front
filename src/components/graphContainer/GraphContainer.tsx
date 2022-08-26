import React from "react";

import { Nav, Tab, Row, Col } from "react-bootstrap";

const GraphContainer = () => {
  return (
    <>
      <Tab.Container id="left-tabs-example" defaultActiveKey="acceleration">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="acceleration">acceleration</Nav.Link>
              </Nav.Item>
              <Nav.Link eventKey="speed">speed</Nav.Link>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="acceleration">
                <h1>ACCELERATION</h1>
              </Tab.Pane>
              <Tab.Pane eventKey="speed">
                <h1>SPEED</h1>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};

export default GraphContainer;
