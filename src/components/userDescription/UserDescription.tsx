import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { UserListInterface } from "../../HomePage";
import { Info, Context } from "./UserDescription.styles";
const UserDescription = ({ userList }: { userList: UserListInterface }) => {
  const [isEdit, setEdit] = useState(true);

  return (
    <Table responsive borderless hover>
      {userList &&
        Object.entries(userList.user).map((arr, i) => {
          if (arr[0].localeCompare("trainingList") === 0) {
            return;
          }
          return (
            <tbody key={i}>
              <tr>
                <td>
                  <Context>{arr[0]}</Context>
                </td>
                <td>
                  {isEdit ? (
                    <Info>
                      {(arr[1] as string)
                        ? (arr[1] as string)
                        : "Not Available"}
                    </Info>
                  ) : (
                    <input type="text" id={arr[0]} />
                  )}
                </td>
                <td>
                  {arr[0].localeCompare("dateOfBirth") === 0 ||
                  (arr[0].localeCompare("nationality") === 0 &&
                    arr[0].localeCompare("trainingList") !== 0) ? (
                    <button onClick={() => setEdit(!isEdit)}>Click me</button>
                  ) : null}
                </td>
              </tr>
            </tbody>
          );
        })}
    </Table>
  );
};
export default UserDescription;
