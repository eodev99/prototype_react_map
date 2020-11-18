import React from 'react'

import MapPanel from './components/MapPanel'
import ControlPanel from './components/ControlPanel'
import styled from "styled-components";
import { GroupsProvider } from './context/GroupsState';

const StyledDiv = styled.div`
    display:flex;
    justify-content: center;
    aligh-items: center;
    font-size: 32px;
    width: 100%;
    `;

function App() {
  return (
    <GroupsProvider>
    <StyledDiv>
      <ControlPanel/>
      <MapPanel/>
    </StyledDiv>
    </GroupsProvider>
  );
}

export default App;
