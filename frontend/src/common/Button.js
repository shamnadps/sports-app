import React from 'react';
import styled from 'react-emotion';

const Button = styled('button')`
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    border: 1px white solid;
    padding: 1rem;
    color: white;
    font-size: 2rem;
    line-height: 0.5rem;
    display: inline-block;
    height: 5rem;
    font-family: Calibri, sans-serif !important;
    letter-spacing: 0.5px;
    outline: none;
    font-weight: bold;
    &:hover {
        color: ${(props) => props.theme.main};
        background-color: white;
    }
`;

export default Button;
