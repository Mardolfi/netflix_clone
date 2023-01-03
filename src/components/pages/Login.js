import logo from "../../img/logo.png";
import styled from "styled-components";
import { RiGlobalFill } from "react-icons/ri";
import FormLogin from "../projects/FormLogin";
import {useNavigate} from 'react-router-dom'

function Login() {
  const navigate = useNavigate();

  function loginUser() {
    navigate('/browse');
  }

  return (
    <LoginContainer>
      <BackOpacity />
      <Header>
        <img src={logo} />
      </Header>
      <FormLogin handleSubmit={loginUser} />
      <Footer>
        <p>
          Dúvidas? Ligue <span>0800 591 8942</span>
        </p>
        <Help>
          <span>Perguntas frequentes</span>
          <span>Central de Ajuda</span>
          <span>Termos de Uso</span>
          <span>Privacidade</span>
          <span>Preferências de cookies</span>
          <span>Informações corporativas</span>
        </Help>
        <Language>
          <RiGlobalFill />
          <select name="select">
            <option value={"pt-BR"}>Português</option>
            <option value={"en"}>English</option>
          </select>
        </Language>
      </Footer>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-image: url("https://assets.nflxext.com/ffe/siteui/vlv3/84526d58-475e-4e6f-9c81-d2d78ddce803/d784d93d-9001-4200-bb75-c0cdc0261d90/BR-pt-20221228-popsignuptwoweeks-perspective_alpha_website_large.jpg");
  background-repeat: no-repeat;
  background-size: 130%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BackOpacity = styled.div`
  background-image: linear-gradient(to top, #00000050, #000);
  width: inherit;
  height: 100%;
  position: absolute;
  opacity: 0.7;
  pointer-events: none;
`;

const Header = styled.div`
  width: 100%;
  height: 100px;
  padding: 0 50px;
  position: relative;

  img {
    width: 180px;
    position: absolute;
    top: -40px;
  }
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  color: #aaa;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 30px 250px 50px 250px;

  span:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Help = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  font-size: 0.8rem;

  span {
    margin-right: 145px;
    padding: 2px;
  }

  span:last-child {
    margin-left: -13px;
  }
`;
const Language = styled.div`
  background: black;
  border: 1px solid #333;
  width: fit-content;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 15px;

  select {
    background: none;
    color: #999;
    border: none;
  }
`;

export default Login;
