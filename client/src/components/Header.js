import React from "react";
import styled from "styled-components";

import ElementLogo from "../images/element-logo.png";
import theme from "./theme";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const StyledImage = styled.img`
  width: 80px;
  height: auto;
  align-self: center;
`;

const StyledText = styled.p`
  justify: inline;
  margin: 0;
  font-size: 6px;
  text-transform: uppercase;
  color: ${theme.colors.burgundy}
`;

const StyledHeader = styled.h2`
  margin: 0;
  letter-spacing: 2%;
  font-weight: 700;
  font-size: 16px;
  color: ${theme.colors.fadedPink};
`;

const Header = () => (
  <StyledContainer>
    <ImageContainer>
      <StyledImage src={ElementLogo} />
      <StyledText>presents</StyledText>
    </ImageContainer>
    <StyledHeader>AYM CAMP CHALLENGE</StyledHeader>
  </StyledContainer>
);

export default Header;
