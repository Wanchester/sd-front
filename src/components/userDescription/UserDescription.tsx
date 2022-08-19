import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Info, Context } from "./UserDescription.styles";
import { FaEdit } from "react-icons/fa";
import apiMethods, { ProfileResponse } from "../../API";
const UserDescription = ({ userList }: { userList: ProfileResponse }) => {
  const [isEdit, setEdit] = useState(true);

  const [nation, setNationality] = useState(userList.nationality);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const currentNation = event.currentTarget.value;
    if (currentNation) {
      setNationality(currentNation);
    } else {
      setNationality(userList.nationality);
    }
  };
  const submitChange = () => {
    const newChange = { nationality: nation };
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
        {userList &&
          Object.entries(userList).map((arr, i) => {
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
