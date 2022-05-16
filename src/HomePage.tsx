import react from "react";
import Table from "react-bootstrap/Table";
import Avatar from "./components/avatar/Avatar";
import UserDescription from "./components/userDescription/UserDescription";
import TestImage from "./image/test.jpeg";
const HomePage = () => {
  const userList = {
    user: {
      name: "Hello World",
      email: "Hello@hello.com",
      dateOfBirth: "12/3/2000",
    },
  };
  return (
    <>
      <Table responsive borderless hover>
        <tbody>
          <td colSpan={2}>
            <Avatar imageLink={TestImage} />
          </td>
          <td colSpan={2}>
            <UserDescription userList={userList} />
          </td>
        </tbody>
      </Table>
    </>
  );
};
export default HomePage;
