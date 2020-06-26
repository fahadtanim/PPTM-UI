import styled from "styled-components";

export const MenuBar = styled.div`
  background-color: #1a237e;
  color: #fff;
  width: 100%;
`;

export const MenuButton = styled.button`
  background: none;
  border: 0px;
  padding: 5px 5px;
  &:hover {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 2px;
  }
  &:focus {
    outline: none;
  }
`;
