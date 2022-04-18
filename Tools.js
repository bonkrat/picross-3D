import React from "react";
import styled from "styled-components";

const StyledTools = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  height: 50px;
  padding: 8px;
  box-sizing: border-box;
  background-color: grey;
  align-items: center;
`;

const Tools = ({ onSaveShape, onShowAnswer, mode, setMode }) => {
  return (
    <StyledTools>
      <div></div>
      <div>
        <input type="text" name="name" placeholder="name" />
      </div>
      <select onChange={setMode}>
        <option value="create">Create</option>
        <option value="clue">Paint Clues</option>"
        <option value="paint">Paint</option>
      </select>
      <button onClick={onSaveShape}>Save Shape</button>
    </StyledTools>
  );
};

export default Tools;
