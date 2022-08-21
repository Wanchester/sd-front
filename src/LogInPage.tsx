import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import apiMethods, { Credential } from "./API";

const LogInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const login = async () => {
    if (!loggingIn) {
      const credential: Credential = {
        username: username,
        password: password,
      };

      setLoggingIn(true);
      try {
        await apiMethods.logIn(credential);
        window.location.reload();
      } catch (err) {
        setLoggingIn(false);
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <div className="col-md-8">
          <Card>
            <div className="card-header">Log in</div>
            <div className="card-body">
              <Form
                onSubmit={(event) => {
                  event.preventDefault();
                  login();
                }}
              >
                <Row className="form-group mb-2">
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
                      name="username"
                      onChange={(e) => setUsername(e.currentTarget.value)}
                    />
                  </div>
                </Row>
                <Row className="form-group mb-2">
                  <label
                    htmlFor="password"
                    className="col-md-4 col-form-label text-md-right"
                  >
                    Password
                  </label>
                  <div className="col-md-6">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                  </div>
                  <div className="col-md-6 offset-md-4 mt-2">
                    <Button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loggingIn}
                    >
                      {loggingIn ? "Logging In" : "Log In"}
                    </Button>
                    <a href="#" className="btn btn-link px-2 px-md-0 px-lg-2">
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
