import styled from "styled-components";

const ButtonStyled = styled.button`
  background-color: transparent;
  border: none;
  
  & img {
    filter: invert(100%);
    width: 20px;
  }
`;

const Button = ({ action, source, name }) => {
  return (
    <ButtonStyled onClick={action}>
      <img src={source} alt={name} />
    </ButtonStyled>
  );
};

export default Button;
