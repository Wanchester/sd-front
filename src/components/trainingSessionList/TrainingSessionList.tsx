import React from "react";
import Table from "react-bootstrap/Table";
import { UserListInterface } from "../../HomePage";
const TrainingSessionList = ({
  trainingList,
}: {
  trainingList: UserListInterface["user"]["trainingList"];
}) => {
  return (
    <>
      <h2>Training Sessions</h2>
      <Table responsive hover>
        <thead>
          <tr>
            <th colSpan={6}>Training Session Name</th>
            <th colSpan={6}>Training Session Date</th>
          </tr>
        </thead>
        <tbody>
          {trainingList &&
            trainingList.map((session) =>
              Object.entries(session).map((arr) => {
                return (
                  <tr>
                    <td colSpan={6}>{arr[0]}</td>
                    <td colSpan={6}>{arr[1] ? arr[1] : "Not Available"}</td>
                  </tr>
                );
              })
            )}
        </tbody>
      </Table>
    </>
  );
};
export default TrainingSessionList;
