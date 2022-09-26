import { useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const Breadcrumbs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let currentRoutes = [];
  useEffect(() => {
    console.log(navigate);
    console.log(location);
  }, [navigate, location]);
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
            return index !== currentRoutes.length - 1 ? (
              <Breadcrumb.Item
                onClick={() => {
                  navigate("/" + route);
                }}
              >
                {decodeURIComponent(route)}
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item active>
                {decodeURIComponent(route)}
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