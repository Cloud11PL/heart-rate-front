import * as React from "react";
import styled from "styled-components";

const BarWrapper = styled.div`
  width: 10rem;
  height: 3rem;
  border-radius: 0.5rem;
  background: rgb(255, 0, 85);
  background: linear-gradient(
    90deg,
    rgba(255, 0, 85, 1) 0%,
    rgba(255, 128, 0, 1) 75%,
    rgba(255, 253, 0, 1) 85%,
    rgba(85, 254, 8, 1) 95%,
    rgba(0, 185, 9, 1) 100%
  );
  position: relative;
`;

const LoadingBar = styled.div`
  position: absolute;
  right: 0;
  width: 5%;
  background-color: gray;
  z-index: 10;
  height: 100%;
  border-radius: 0.5rem;
  /* border-radius: 0 0.5rem 0.5rem 0; */
`;

const SpoBar: React.FC = () => {
  return (
    <>
      <p>SPO value:</p>
      <BarWrapper>
        <LoadingBar>.</LoadingBar>
      </BarWrapper>
    </>
  );
};

export default SpoBar;
