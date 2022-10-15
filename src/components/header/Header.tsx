import { Row, Col, Button } from "react-bootstrap";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import apiMethods from "../../API";
import { Link } from "react-router-dom";
const Header = ({
  content,
  userRole,
}: {
  content: string;
  userRole: string;
}) => {
  return (
    <div className="mb-4">
      <Row className="py-3 mb-2">
        <Col className="flex-grow-0">
          <h1 className="mb-0 text-nowrap">
            <Link title="Homepage" to="/">
              <img
                src="/image/logo.jpeg"
                style={{ height: "4rem", width: "4rem" }}
              />
            </Link>
            <span className="ms-4 align-middle">{content}</span>
          </h1>
        </Col>
        <Col className="d-none d-sm-flex justify-content-center align-items-center">
          <p className="mb-0">Viewing as {userRole}</p>
        </Col>
        <Col className="flex-sm-grow-0 d-flex justify-content-end align-self-center">
          <Button
            className="btn btn-secondary align-text-center"
            type="button"
            onClick={async (event) => {
              event.preventDefault();

              if (confirm("Are you sure to log out?")) {
                await apiMethods.logOut();
                window.location.reload();
              }
            }}
          >
            Logout
          </Button>
        </Col>
      </Row>

      <Breadcrumbs />
    </div>
  );
};
export default Header;
