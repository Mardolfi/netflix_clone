import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

function Input({ type, id, text, handleOnChange, buttonType, toggleShow, error, errorType }) {

  const [isActive, setIsActive] = useState()
  const [textData, setTextData] = useState('')

  const input = useRef()

  function onChange(e) {
    setTextData(e.target.value)
    handleOnChange(e.target.value)
  }

  useEffect(() => {
    if(textData.length > 0){
      setIsActive(true)
    } else {
      setIsActive(false)
    }
  }, [textData])

  return (
    <InputContainer active={isActive} ifError={error}>
      <input type={type} id={id} onChange={onChange} ref={input}/>
      <label htmlFor={id}>{text}</label>
      <ErrorType>{errorType}</ErrorType>
      {buttonType && <p onClick={() => {
        toggleShow();
        input.current.focus();
      }}>{buttonType}</p>}
    </InputContainer>
  );
}

const ErrorType = styled.div`
  color: #E87C03;
  pointer-events: none;
  position: absolute;
  font-size: 0.8rem;
  bottom: -20px;
  width: 110%;
  left: 0px;
`

const InputContainer = styled.div`
  padding: 20px 20px 10px 20px;
  background: #333;
  border-radius: 5px;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  border-bottom: ${props => props.ifError ? '2px solid #E87C03' : ''};

  input {
    color: #fff;
    border: none;
    outline: none;
    background: none;
    font-size: 1.1rem;
  }

  label {
    position: absolute;
    left: 20px;
    bottom: 15px;
    color: #999;
    pointer-events: none;
    transition: 0.3s;
    transform: ${props => props.active ? 'translate(-15%, -15px) scale(0.7)' : ''};
  }

  input:focus ~ label {
    transform: translate(-15%, -15px) scale(0.7);
  }

  input:focus ~ p {
    opacity: 1;
  }

  p{
    position: absolute;
    right: 10px;
    bottom: 10px;
    color: #999;
    font-size: 0.9rem;
    transition: 0.3s;
    cursor: pointer;
    padding: 5px;
    opacity: ${props => props.active ? '1': '0'};
    transition: 0.3s;
  }
`;

export default Input;
