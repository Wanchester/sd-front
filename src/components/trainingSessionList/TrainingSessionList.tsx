import React from "react";
import Container from "react-bootstrap/Container";
import { UserListInterface } from "../../HomePage";
import { Table } from "react-bootstrap";
const TrainingSessionList = ({
  trainingList,
}: {
  trainingList: UserListInterface["user"]["trainingList"];
}) => {
  return (
    <>
      <h2>Training Sessions</h2>
      <Table
        bordered
        responsive
        variant="dark"
        className="border-light rounded"
      >
        <thead>
          <th>Training Session Name</th>
          <th>Training Date Name</th>
        </thead>
        <tbody>
          {trainingList &&
            trainingList.map((session) =>
              Object.entries(session).map((arr) => {
                return (
                  <tr>
                    <td>{arr[0]}</td>
                    <td>{arr[1] ? arr[1] : "Not Available"}</td>
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
