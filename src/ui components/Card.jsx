import styled from "styled-components";

const CardStyled = styled.div`
  background-image: url(${({ image })=> image});
  width: 700px;
  height: 200px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius:10px;
  color: white;
  `;

const Card = ({image, children}) => {
    return (
      <CardStyled image={image}>
        {children}
      </CardStyled>
    );
  };

export default Card;
