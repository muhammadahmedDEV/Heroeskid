import styled from 'styled-components';
const Wrapper = styled.div`
  width: 100%;
  .ant-input {
    border-radius: 5px;
    border: 1px solid #ccc;
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
  .content {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: auto;
    box-shadow: 0 2px 0px rgba(0, 0, 0, 0.15), 0 0.5px 0px rgba(0, 0, 0, 0.12),
      1px 0px 0px rgba(0, 0, 0, 0.12), -1px 0px 0px rgba(0, 0, 0, 0.12);
    border-radius: 5px;
    justify-content: center;
    align-items: center;

  }


`;
export default Wrapper;
