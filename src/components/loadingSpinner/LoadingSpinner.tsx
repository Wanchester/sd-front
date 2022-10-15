import SpinnerContainer from "./LoadingSpinner.styles";
import { Container, Row, Spinner } from "react-bootstrap";
export const LoadingSpinner = ({
  isComponent,
  componentTitle,
}: {
  isComponent?: boolean;
  componentTitle?: string;
}) => {
  return (
    <>
      {isComponent ? (
        <Container className="flex-column align-items-center">
          <Row className="justify-content-center">
            <Spinner animation="border" variant="light" />
          </Row>
          <Row className="justify-content-center">
            <p className="text-light text-center">
              Loading {componentTitle}...
            </p>
          </Row>
        </Container>
      ) : (
        <SpinnerContainer>
          <Spinner animation="border" variant="light" />
        </SpinnerContainer>
      )}
    </>
  );
};
