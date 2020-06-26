import styled from "styled-components";
import { Button } from "semantic-ui-react";
import React from "react";
export const PageHeader = styled.div`
  width: 100%;
  margin-top: 15px;
  margin-bottom: 15px;
  border-left: 5px solid #1a237e;
  color: #1a237e;
  background-color: ghostwhite;
  padding-left: 20px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-right: 20px;
  font-weight: bold;
  font-size: 32px;
`;
export const LabelText = styled.b`
  & > span {
    color: #b52504;
    margin-left: 5px;
  }
`;

export function PrimaryButton(props) {
  return (
    <Button primary {...props}>
      {props.children}
    </Button>
  );
}
