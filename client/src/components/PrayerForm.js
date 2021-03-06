import React, { useState } from "react";
import styled from "styled-components";

import theme from "./theme";
import accomplishmentTypes from "../constants/accomplishmentTypes";

import { useBreakpoint } from "../providers/BreakpointProvider";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  padding: 30px;
  width: 388px;
  height: 392px;
  background: ${theme.colors.white};
  box-shadow: 0px 0px 20px ${theme.colors.shadow};
  border-radius: 10px;

  h3 {
    margin: 0;
    font-size: 19px;
    font-weight: 700;
    text-transform: uppercase;
    color: ${theme.colors.burgundy};
    text-align: center;
  }

  form {
    flex: 1;
    display: flex;
    flex-direction: column;

    input,
    textarea,
    select {
      margin-top: 10px;
      width: 100%;
      background: ${theme.colors.white};
      border: 1px solid ${theme.colors.background};
      border-radius: 5px;
      padding: 10px 8px;
      font-size: 16px;
      ::placeholder {
        color: ${theme.colors.placeholder};
      }
    }

    select {
      height: 35px;
    }

    input {
      height: 41px;
    }

    textarea {
      flex: 1;
      margin-bottom: 20px;
      resize: none;
    }

    button {
      width: 100%;
      height: 39px;
      background: ${theme.colors.fadedGreen};
      color: ${theme.colors.white};
      font-size: 14px;
      font-weight: 700;
      border-radius: 5px;
    }
  }

  ${(props) =>
    props.breakpoint === "sm" &&
    `
    margin: 0 auto;
    padding: 0;
    width: 100%;
    box-shadow: none;
    background: ${theme.colors.background};

    form select {
      height: auto;
    }
  `}
`;

const PrayerForm = ({ submitAccomplishment }) => {
  const { breakpoint } = useBreakpoint();

  const defaultState = { name: "", note: "", type: "prayer" };
  const [inputs, setInputs] = useState(defaultState);

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }

    try {
      await submitAccomplishment(inputs);
      setInputs(defaultState);
    } catch (error) {
      console.log("failed to submit", error);
    }
  };

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <StyledContainer breakpoint={breakpoint}>
      <h3>Share What You Accomplished!</h3>
      <form onSubmit={handleSubmit}>
        <select name="type" value={inputs.type} onChange={handleInputChange}>
          {accomplishmentTypes.map((type) => (
            <option value={type.value}>{type.description}</option>
          ))}
        </select>
        <input
          type="text"
          name="name"
          placeholder="Name (Optional)"
          onChange={handleInputChange}
          value={inputs.name}
        />
        <textarea
          name="note"
          placeholder="Any more details? (Optional)"
          onChange={handleInputChange}
          value={inputs.note}
        />
        <button type="submit">SUBMIT</button>
      </form>
    </StyledContainer>
  );
};

export default PrayerForm;
