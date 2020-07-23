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

const Tools = ({ onGenerateNumbers }) => (
  <StyledTools>
    <div></div>
    <div>
      <input type="text" name="name" placeholder="name" />
    </div>
    <button onClick={onGenerateNumbers}>Generate Numbers</button>
    <button>Save Puzzle</button>
  </StyledTools>
);

export default Tools;
