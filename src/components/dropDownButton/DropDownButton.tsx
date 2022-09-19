import { ChangeEvent, useEffect, useState } from "react";
import { Form, Container } from "react-bootstrap";
const DropDownButton = ({
  optionList,
  setValue,
}: {
  optionList: string[];
  setValue: (data: string[]) => void;
}) => {
  const [options, setOptions] = useState(["All"]);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  useEffect(() => {
    setOptions(["All", ...optionList]);
  }, [optionList]);

  return (
    <>
      <Container fluid className="bg-white">
        <Form.Select
          defaultValue={selectedOption}
          value={selectedOption}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            setSelectedOption(e.currentTarget.value);
            if (e.currentTarget.value === "All") {
              setValue([]);
            } else {
              setValue([e.currentTarget.value]);
            }
          }}
        >
          {options && options.map((o) => <option value={o}>{o}</option>)}
        </Form.Select>
      </Container>
    </>
  );
};
export default DropDownButton;
