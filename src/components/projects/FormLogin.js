import { useState } from "react";
import styled from "styled-components";
import Input from "../form/Input";

function FormLogin({ handleSubmit }) {
  const [showPassword, setShowPassword] = useState("password");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const [passwordErrorType, setPasswordErrorType] = useState(false);
  const [nameErrorType, setNameErrorType] = useState(false);

  function checkInputs(e) {
    e.preventDefault();

    if (password.length > 3 && password.length < 60) {
      setPasswordError(false);
      setPasswordErrorType("");
    } else {
      setPasswordError(true);
      setPasswordErrorType("A senha deve ter entre 4 e 60 caracteres.");
      return;
    }

    if (name.includes("@") && name.includes(".com")) {
      setNameError(false);
      setNameErrorType("");
    } else {
      setNameError(true);
      setNameErrorType("Informe um email ou número de telefone válido.");
      return;
    }

    handleSubmit(password, name);
  }

  return (
    <FormLoginContainer>
      <h1>Entrar</h1>
      <form onSubmit={checkInputs}>
        <FormInputs>
          <Input
            type={"text"}
            text={"Email ou número de telefone"}
            id={"email"}
            error={nameError}
            errorType={nameErrorType}
            handleOnChange={(text) => setName(text)}
          />
          <Input
            text={"Senha"}
            buttonType={showPassword == "password" ? "MOSTRAR" : "OCULTAR"}
            type={showPassword}
            error={passwordError}
            errorType={passwordErrorType}
            toggleShow={() => {
              if (showPassword == "password") {
                setShowPassword("text");
              } else {
                setShowPassword("password");
              }
            }}
            id={"password"}
            handleOnChange={(text) => setPassword(text)}
          />
        </FormInputs>
        <FormControl>
          <button>Entrar</button>
          <FormHelp>
            <CheckBox>
              <input type={"checkbox"} id={"remember"} />
              <label htmlFor="remember">Lembre-se de mim</label>
            </CheckBox>
            <p>Precisa de ajuda?</p>
          </FormHelp>
        </FormControl>
      </form>
    </FormLoginContainer>
  );
}

const FormLoginContainer = styled.div`
  width: fit-content;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2;
  margin: 0 auto;
  padding: 70px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 10px;
  margin-bottom: 100px;

  form {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
`;
const FormInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  button {
    width: 100%;
    padding: 12px;
    background: #e50914;
    color: white;
    font-weight: 600;
    font-size: 1rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
`;
const FormHelp = styled.div`
  display: flex;
  color: #999;
  font-size: 0.8rem;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const CheckBox = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

export default FormLogin;
