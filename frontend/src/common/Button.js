import React from 'react';
import styled from 'react-emotion';

const Button = styled('button')`
    background-color: rgba(255, 255, 255, 0.13);
    border-radius: 8px;
    border: 1px rgba(255, 255, 255, 0.6) solid;
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
    transition: all 0.5s ease;
    cursor: pointer;

    &:hover {
        color: ${(props) => props.theme.main};
        background-color: white;
        box-shadow: 0px 10px 12px rgba(0, 0, 0, 0.5);
    }
`;

export default Button;
