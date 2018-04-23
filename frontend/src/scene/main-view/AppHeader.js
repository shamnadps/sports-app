import React from 'react';
import Logo from '../../common/Logo';
import Button from '../../common/Button';
import styled from 'react-emotion';
import { connect } from 'utils';

const AppHeaderWrapper = styled('div')`
    width: 100%;
    background-color: white;
    padding: 2rem;
`;

const LogoBar = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${(props) => props.theme.main};

    button {
        border-color: ${(props) => props.theme.main};
        color: inherit;
        flex-shrink: 0;

        &:hover {
            color: white;
            background-color: ${(props) => props.theme.main};
            border-color: transparent;
        }
    }

    span {
        font-size: 2.5rem;
        font-weight: bold;
        text-transform: uppercase;
        text-align: center;
    }
`;

class AppHeader extends React.Component {
    render() {
        const content = this.props.ContentStore.content.appHeader;
        const appName = this.props.ContentStore.content.global.appName;
        return (
            <AppHeaderWrapper>
                <LogoBar>
                    <Button>{content.myAccount}</Button>
                    <span>{appName}</span>
                    <Button>€ 12</Button>
                </LogoBar>
            </AppHeaderWrapper>
        );
    }
}

export default connect('ContentStore')(AppHeader);
