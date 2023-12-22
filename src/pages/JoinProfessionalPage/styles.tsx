import styled from "styled-components";
const Wrapper = styled.div`
  width: 100%;
  .ant-input {
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #cccccc00;
    :hover {
      border-color: #ccc;
    }
    :focus {
      border-color: #ccc;
      outline: none;
      box-shadow: none;
    }
  }
  .ant-select {
    border-radius: 5px;
    border-color: #ccc;
    :hover {
      border-color: #ccc;
    }
    :focus {
      border-color: #ccc;
      outline: none;
      box-shadow: none;
    }
  }
  .avatar-uploader > .ant-upload {
    width: 200px;
    height: 200px;
    .ant-upload-text {
      font-size: 1.25em;
      font-weight: 700;
      color: black;
      display: inline-block;
      font-family: sans-serif;
      cursor: pointer;
      line-height: 200px;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    width: 903px;
    margin: auto;
    box-shadow: 0 2px 0px rgba(0, 0, 0, 0.15), 0 0.5px 0px rgba(0, 0, 0, 0.12),
      1px 0px 0px rgba(0, 0, 0, 0.12), -1px 0px 0px rgba(0, 0, 0, 0.12);
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    @media (max-width: 966px) {
      width: 95%;
    }
    .ant-collapse-header {
      margin-top: 0;
      margin-bottom: 0.5em;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 500;
    }
  }
  .collapse {
    .ant-collapse-item {
      border-bottom: 0 !important;
    }
  }
  .specialities-label {
    color: rgba(0, 0, 0, 0.54);
    padding: 0;
    font-size: 1rem;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    line-height: 4;
    letter-spacing: 0.00938em;
  }
  .submit-btn {
    background-color: #162a33;
    font-size: 17px;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
    border: none;
    padding: 0 32px;
    text-align: center;
    border-radius: 5px;
    :hover {
      background-color: #162a33;
      color: #fff;
    }
    :focus {
      background-color: #162a33;
      color: #fff;
      outline: none;
      box-shadow: none;
    }
  }
  .add-btn {
    background-color: #303036;
    height: 40px;
    width: 160px;
    font-size: 17px;
    color: white;
    border: none;
    text-align: center;
    border-radius: 5px;
    line-height: 1px;
    .anticon svg {
      font-size: 1.4rem;
    }
    :hover {
      background-color: #303036;
      color: #fff;
    }
    :focus {
      background-color: #303036;
      color: #fff;
      outline: none;
      box-shadow: none;
    }
  }
  .ant-select-selection-placeholder {
    color: rgba(0, 0, 0, 0.5) !important;
  }
  .selector {
    .ant-select-selection-item {
      width: 100%;
      white-space: pre-wrap;
    }
    .ant-select-selection-placeholder {
      width: 100%;
      white-space: pre-wrap;
    }
  }
  .dynamic-delete-button {
    margin: 0 0 0 12px;
    font-size: 19px;
    @media (max-width: 547px) {
      margin: 0 0 0 3px !important;
      font-size: 13px;
    }
  }
`;
export default Wrapper;
