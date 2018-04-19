import React from 'react';
import styled from 'react-emotion';
import Calendar from './Calendar';

const Wrapper = styled('section')`
    background-color: #183552;
    width: 100%;
    padding: 3rem;
    margin-top: -2rem;
    height: 30rem;
`;

export default class FilterGroup extends React.Component {
    render() {
        return (
            <Wrapper>
                <Calendar />
            </Wrapper>
        );
    }
}
