import Sidebar from "./components/nav/Sidebar";
import { Container, Row } from "react-bootstrap";
const StatisticPage = () => {
  return (
    <Container fluid p-0>
      <Row>
        <Sidebar />
      </Row>
    </Container>
  );
};

export default StatisticPage;
