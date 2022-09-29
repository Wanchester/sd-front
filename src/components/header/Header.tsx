import { Container } from "react-bootstrap";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
const Header = ({ content }: { content: string }) => {
  return (
    <Container className="py-3 mb-4 m-0 d-flex" fluid>
      <Container className="align-items-left mx-auto">
        <h1 className="mb-0">{content}</h1>
        <Breadcrumbs />
      </Container>
    </Container>
  );
};
export default Header;
