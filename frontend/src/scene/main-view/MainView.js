import React from 'react';
import styled from 'react-emotion';
import FilterGroup from './FilterGroup';
import ClassCard from './ClassCard';
import AppHeader from './AppHeader';
import CourseModal from './CourseModal';
import ConfirmationModal from './ConfirmationModal';
import BalanceView from '../balance';
import PaymentView from '../payment';
import { connect } from 'utils';

const Wrapper = styled('div')`
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
`;
class MainView extends React.Component {
    state = {
        showCourseBalance: false,
        showPaymentConfirmationModal: false,
    };
    render() {
        return (
            <Wrapper>
                <AppHeader
                    requestShowBalance={() =>
                        this.setState({ showCourseBalance: true })
                    }
                />
                <FilterGroup />
                <ClassCard />
                <CourseModal />
                <ConfirmationModal />
                <BalanceView
                    show={this.state.showCourseBalance}
                    onClear={() => this.setState({ showCourseBalance: false })}
                />
                <PaymentView />
            </Wrapper>
        );
    }
}

export default connect('i18nStore', 'userStore')(MainView);
