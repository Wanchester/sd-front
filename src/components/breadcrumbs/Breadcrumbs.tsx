import { Breadcrumb } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

function upperFirstLetter(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

const Breadcrumbs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let currentRoutes = [];
  const exPath = ["team", "session", "player", "statistics"];
  currentRoutes = location.pathname !== "/" ? location.pathname.split("/") : [];
  if (currentRoutes.length > 0) {
    currentRoutes.shift();
    return (
      <Breadcrumb>
        <Breadcrumb.Item
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Breadcrumb.Item>
        {currentRoutes.length === 1 ? (
          <Breadcrumb.Item active>{currentRoutes[0]}</Breadcrumb.Item>
        ) : (
          currentRoutes.map((route, index) => {
            return index !== currentRoutes.length - 1 &&
              !exPath.includes(route) ? (
              <Breadcrumb.Item
                key={index}
                onClick={() => {
                  navigate("/" + route);
                }}
              >
                {upperFirstLetter(decodeURIComponent(route))}
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item key={index} active>
                {index === currentRoutes.length - 1
                  ? decodeURIComponent(route)
                  : upperFirstLetter(decodeURIComponent(route))}
              </Breadcrumb.Item>
            );
          })
        )}
      </Breadcrumb>
    );
  } else {
    return <></>;
  }
};

export default Breadcrumbs;
