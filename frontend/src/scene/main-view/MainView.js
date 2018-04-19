import React from 'react';
import styled from 'react-emotion';
import FilterGroup from './FilterGroup';
import CardGroup from './CardGroup';
import AppHeader from './AppHeader';
import { connect } from 'utils';
import { Redirect } from 'react-router-dom';

const Wrapper = styled('div')`
    position: relative;
`;

class MainView extends React.Component {
    render() {
        if (!this.props.UserStore.isAuthenticated) {
            return <Redirect to="/login" />;
        }
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
