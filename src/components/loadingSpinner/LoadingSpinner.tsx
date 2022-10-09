import { Spinner } from "react-bootstrap";
import SpinnerContainer from "./LoadingSpinner.styles";
export const LoadingSpinner = () => {
  return (
    <SpinnerContainer>
      <Spinner animation="border" variant="light" />
    </SpinnerContainer>
  );
};
