import react from "react";
import Table from "react-bootstrap/Table";
import Avatar from "./components/avatar/Avatar";
import UserDescription from "./components/userDescription/UserDescription";
import TrainingSessionList from "./components/trainingSessionList/TrainingSessionList";
import TestImage from "./image/test.jpeg";
import Teams from "./components/teams/Teams";

export interface UserListInterface {
  user: {
    name: string;
    email: string;
    dateOfBirth: string;
    nationality: null | string;
    trainingList: {
      running: string;
      walking: string;
    }[];
  };
}
const HomePage = () => {
  const userList = {
    user: {
      name: "Hello World",
      email: "Hello@hello.com",
      dateOfBirth: "12/3/2000",
      nationality: null,
      trainingList: [{ running: "12/12/12", walking: "1/1/12" }],
    },
  } as UserListInterface;
  const teamsList = {
    team: {
      teamName: "TeamName here",
    },
  };
  
  return (
    <>
      <Table responsive borderless hover>
        <tbody>
          <tr>
            <td colSpan={2}>
              <Avatar imageLink={TestImage} />
            </td>
            <td colSpan={2}>
              <UserDescription userList={userList} />
            </td>
          </tr>
        </tbody>
      </Table>
      <Table responsive borderless hover>
        <tbody>
          <tr>
            <td colSpan={6}>
              <Teams teamsList={teamsList} />
            </td>
          </tr>
        </tbody>
      </Table>
      <Table responsive borderless hover>
        <tbody>
          <tr>
            <td colSpan={6}>
              <TrainingSessionList trainingList={userList.user.trainingList} />
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
export default HomePage;
