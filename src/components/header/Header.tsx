import { Container, Row, Col, Button } from "react-bootstrap";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import apiMethods from "../../API";
const Header = ({
  content,
  userRole,
}: {
  content: string;
  userRole: string;
}) => {
  return (
    <Container className="py-3 mb-4 m-0 " fluid>
      <Row>
        <Col sm={3} md={3} lg={3} xl={3}>
          <h1 className="mb-0">{content}</h1>
        </Col>
        <Col
          sm={6}
          md={6}
          lg={6}
          xl={6}
          className="d-flex justify-content-center"
        >
          <p>view as {userRole}</p>
        </Col>
        <Col
          sm={3}
          md={3}
          lg={3}
          xl={3}
          className="d-flex justify-content-end "
        >
          <Button
            className="btn btn-secondary align-text-centers"
            size="lg"
            href="#"
            onClick={async (event) => {
              event.preventDefault();
              await apiMethods.logOut();
              window.location.reload();
            }}
          >
            Logout
          </Button>
        </Col>
      </Row>

      <Breadcrumbs />
    </Container>
  );
};
export default Header;
