import styled from "styled-components";

export const ContextMenu = styled.div`
  max-width: 160px;
  min-width: 160px;
  width: 160px;
  position: absolute;
  z-index: 1000;
  display: none;
  background-color: #fff;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  & > button {
    background: none;
    border:0px;
    width:100%;
    height auto;
    padding: 7px 10px 7px 10px;
    color: #878787cc;
    font-size: 12px;
    margin:0px;
    position:relative;
    text-align:left;
    cursor:pointer;
    transition: 0.3s;
  }
  & > button:focus{
    outline: none;
  }
  & > button:hover{
    background: rgba(0,0,0,.05);
    font-weight:bold;
    color: #1a237e;
  }
`;

export const LabelText = styled.b`
  & > span {
    color: #b52504;
    margin-left: 5px;
  }
`;
