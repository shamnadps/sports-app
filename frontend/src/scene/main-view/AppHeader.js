import React from 'react';
import Logo from '../../common/Logo';
import Button from '../../common/Button';
import styled from 'react-emotion';
import Header from './Header';
import { connect } from 'utils';

const AppHeaderWrapper = styled(Header)`
    width: 100%;
    margin-bottom: 2rem;
`;

const LogoBar = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    div {
        display: flex;
        align-items: center;
    }
    span {
        font-size: 2.5rem;
        font-weight: bold;
        text-transform: uppercase;
        color: white;
        text-shadow: 0px 4px 24px rgba(0, 0, 0, 0.3);
        letter-spacing: 0.5px;
    }
    svg {
        width: 6rem;
        margin-right: 1.5rem;
        filter: drop-shadow(0px 12px 12px rgba(0, 0, 0, 0.3));
    }
`;
const QuickInfoWidget = styled('div')`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
`;
const BalanceInfoWrapper = styled('div')`
    width: 50%;
    color: white;
    border-right: 1px rgba(255, 255, 255, 0.3) solid;

    h3 {
        margin: 0;
        font-size: 7rem;
        font-weight: 900;
        letter-spacing: 2px;
    }
    span {
        font-size: 2rem;
        text-transform: uppercase;
        font-weight: 900;
    }
`;
const BookedClassInfoWrapper = styled(BalanceInfoWrapper)`
    direction: rtl;
    border: none;
`;

class AppHeader extends React.Component {
    render() {
        const content = this.props.ContentStore.content.appHeader;
        const appName = this.props.ContentStore.content.global.appName;
        return (
            <AppHeaderWrapper>
                <LogoBar>
                    <div>
                        <Logo noText />
                        <span>{appName}</span>
                    </div>
                    <Button>{content.myAccount}</Button>
                </LogoBar>
                <QuickInfoWidget>
                    <BalanceInfoWrapper>
                        <span>{content.balance}</span>
                        <h3>€ 12</h3>
                        <Button>{content.checkBalance}</Button>
                    </BalanceInfoWrapper>
                    <BookedClassInfoWrapper>
                        <span>{content.reservationTimes}</span>
                        <h3>3</h3>
                        <Button>{content.viewReservation}</Button>
                    </BookedClassInfoWrapper>
                </QuickInfoWidget>
            </AppHeaderWrapper>
        );
    }
}

export default connect('ContentStore')(AppHeader);
