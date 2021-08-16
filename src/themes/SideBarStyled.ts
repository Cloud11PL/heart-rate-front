import styled from 'styled-components';

const SideBarStyled = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 5rem;
  border-right: 1px solid black;
  border-radius: 0 0.5rem 0.5rem 0;
  background-color: white;
  display: flex;
  z-index: 1000;
`;

export default SideBarStyled;
