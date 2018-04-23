import React from 'react';
import styled from 'react-emotion';
import FilterGroup from './FilterGroup';
import CardGroup from './CardGroup';
import AppHeader from './AppHeader';
import CourseModal from './CourseModal';
import { connect } from 'utils';
import { Redirect } from 'react-router-dom';

const Wrapper = styled('div')`
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
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
                <CourseModal />
            </Wrapper>
        );
    }
}

export default connect('ContentStore', 'UserStore')(MainView);
