import react from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const LogInPage = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <div className="col-md-8">
          <Card>
            <div className="card-header">Log in</div>
            <div className="card-body">
              <Form>
                <Row className="form-group">
                  <label
                    htmlFor="username"
                    className="col-md-4 col-form-label text-md-right"
                  >
                    User Name
                  </label>
                  <div className="col-md-6">
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      name="email-address"
                    />
                  </div>
                </Row>
                <Row className="form-group">
                  <label
                    htmlFor="password"
                    className="col-md-4 col-form-label text-md-right"
                  >
                    Password
                  </label>
                  <div className="col-md-6">
                    <input
                      type="text"
                      id="password"
                      className="form-control"
                      name="email-address"
                    />
                  </div>
                  <div className="col-md-6 offset-md-4">
                    <Button type="submit" className="btn btn-primary">
                      Register
                    </Button>
                    <a href="#" className="btn btn-link">
                      Forgot Your Password?
                    </a>
                  </div>
                </Row>
              </Form>
            </div>
          </Card>
        </div>
      </Row>
    </Container>
  );
};
export default LogInPage;
