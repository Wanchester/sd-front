import Sidebar from "./components/Nav/Sidebar";
import { Container, Row, Button, Col } from "react-bootstrap";
const StatsPage = () => {
  return (
    <Container fluid p-0>
      <Row>
        <Sidebar />
      </Row>
    </Container>
  );
};

export default StatsPage;
