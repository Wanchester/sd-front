import Sidebar from "./components/Nav/Sidebar";
import { Container, Row } from "react-bootstrap";
const StatisticPage = () => {
  return (
    <Container fluid>
      <Row>
        <Sidebar />
      </Row>
    </Container>
  );
};

export default StatisticPage;
