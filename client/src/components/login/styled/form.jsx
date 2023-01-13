import Styled from '@emotion/styled';

export const FormContainer = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

export const FieldContainer = Styled.div`
  margin: min(5%,5vh);
  min-width: 200px;
  width: auto;
  max-width: 65vw;

`;

export const ButtonContainer = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  button {
    min-width: 200px;
    width: auto;
    max-width: 65vw;
    margin-top: ${({ isMobile }) => (isMobile ? '4%' : '8%')};
    height: ${({ isMobile }) => (isMobile ? '80%' : '90%')};
  }
`;

export const Button = Styled.div`
  margin-top: 16px;
  margin-left: 16px;
  margin-right: 16px;
`;
