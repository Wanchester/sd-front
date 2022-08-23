import React, { ChangeEvent, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Info, Context } from "./UserDescription.styles";
import { FaEdit } from "react-icons/fa";
import apiMethods, { ProfileResponse } from "../../API";
const UserDescription = ({ userList }: { userList: ProfileResponse }) => {
  const [isEdit, setEdit] = useState(true);

  const [change, setChange] = useState({
    nationality: userList.nationality,
    height: userList.height,
    weight: userList.weight,
  });

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setChange((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };
  const submitChange = () => {
    apiMethods.putPlayer(change);
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
                          {arr[0] === "nationality" ||
                          arr[0] === "height" ||
                          arr[0] === "weight" ? (
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
