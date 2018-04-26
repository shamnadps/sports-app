import React from 'react';
import Button from '../../common/Button';
import styled from 'react-emotion';
import { connect } from 'utils';
import { Link } from 'react-router-dom';

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
    a  {
        color: inherit;
    }
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
        const { isAuthenticated, balance } = this.props.UserStore;

        return (
            <AppHeaderWrapper>
                <LogoBar>
                    {isAuthenticated ? (
                        <Button>{content.myAccount}</Button>
                    ) : (
                        <Link to="/login">
                            <Button>{content.login}</Button>
                        </Link>
                    )}
                    <span>{appName}</span>
                    {isAuthenticated && <Button>€ {balance}</Button>}
                </LogoBar>
            </AppHeaderWrapper>
        );
    }
}

export default connect('ContentStore', 'UserStore')(AppHeader);
