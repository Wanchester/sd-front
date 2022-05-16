import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { Info, Context } from "./UserDescription.styles";
const UserDescription = ({ userList }: { userList: any }) => {
  const [isEdit, setEdit] = useState(true);
  return (
    <Table responsive borderless hover>
      <tbody>
        {userList &&
          Object.keys(userList.user).map((key, i) => {
            return (
              <tr key={i}>
                <td colSpan={2}>
                  <Context>{key}</Context>
                </td>
                <td colSpan={2}>
                  {isEdit ? (
                    <Info>
                      {userList.user[key]
                        ? userList.user[key]
                        : "Not Available"}
                    </Info>
                  ) : (
                    <input type="text" id={key} />
                  )}
                </td>
                <td>
                  {key.localeCompare("dateOfBirth") === 0 ||
                  key.localeCompare("nationality") === 0 ? (
                    <button onClick={() => setEdit(!isEdit)}>Click me</button>
                  ) : (
                    "Not editable"
                  )}
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};
export default UserDescription;
