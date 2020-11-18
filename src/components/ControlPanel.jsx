import React from 'react'
import styled from "styled-components";

const groupButton = styled.button`
    background-color: #f35434;
    font-size: 32px;
    color: white;
    `;

const makeGroup = () => {
    
}

const ControlPanel = () => {
    return (
        <div>
            <h1>CPANEL</h1>
            <groupButton onClick={makeGroup}> Make Group </groupButton>
        </div>
    )
}

export default ControlPanel
