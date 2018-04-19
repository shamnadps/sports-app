import React from 'react';
import styled from 'react-emotion';
import FilterGroup from './FilterGroup';
import CardGroup from './CardGroup';
import AppHeader from './AppHeader';
import { connect } from 'utils';

const Wrapper = styled('div')`
    position: relative;
`;

class MainView extends React.Component {
    render() {
        return (
            <Wrapper>
                <AppHeader />
                <FilterGroup />
                <CardGroup />
            </Wrapper>
        );
    }
}

export default connect('ContentStore', 'UserStore')(MainView);
