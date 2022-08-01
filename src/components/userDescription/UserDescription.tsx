import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Info, Context } from "./UserDescription.styles";
import { FaEdit } from "react-icons/fa";
import { ProfileResponse } from "../../API";
import apiMethods from "../../API";
const UserDescription = ({
  userList,
}: {
  userList: Promise<ProfileResponse>;
}) => {
  const [isEdit, setEdit] = useState(true);
  const [nation, setNationality] = useState("");
  const [userListVal, setUserListVal] = useState({
    username: "N/A",
    name: "N/A",
    email: "N/A",
    dob: "01-01-1970",
    nationality: "N/A",
    height: 0,
    weight: 0,
    role: "player",
    teams: [],
    trainingSessions: [],
  } as ProfileResponse);

  userList.then((newUserListVal) => {
    setUserListVal(newUserListVal);
  });

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setNationality(event.currentTarget.value);
  };
  const submitChange = () => {
    const newChange: ProfileResponse = { ...userListVal, nationality: nation };
    apiMethods.postPlayer(newChange);
    setEdit(!isEdit);
  };
  return (
    <>
      <Table
        responsive
        bordered
        variant="dark"
        className="table-condensed mb-0"
      >
        {userListVal &&
          Object.entries(userListVal).map((arr, i) => {
            return (
              <tbody key={i}>
                {arr[0] !== "teams" && arr[0] !== "trainingSessions" ? (
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
                        <>
                          {arr[0] === "nationality" ? (
                            <input
                              type="text"
                              id={arr[0]}
                              name={arr[0]}
                              defaultValue={arr[1] ?? ""}
                              onChange={handleChange}
                            />
                          ) : (
                            arr[1]
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                ) : null}
              </tbody>
            );
          })}
      </Table>

      {isEdit ? (
        <Button onClick={() => setEdit(!isEdit)}>
          <FaEdit />
        </Button>
      ) : (
        <Button onClick={() => submitChange()}>Save changes</Button>
      )}
    </>
  );
};
export default UserDescription;
<form action="">
  <input type="text" />
</form>;
