import React from 'react';
import styled from 'react-emotion';
import Logo from '../../common/Logo';
import LoginForm from './LoginForm';
import { connect } from 'utils';

const StyledWrapper = styled('section')`
    position: relative;
    background: ${(props) => {
        const { color1, color2 } = props.theme.signInBackGround;
        return `linear-gradient(to bottom, ${color1}, ${color2})`;
    }};
    padding: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
`;
const AppBrand = styled('div')`
    display: flex;
    align-items: center;
    flex-direction: column;

    div {
        flex: inherit;
        align-items: center;
        text-align: center;
    }
`;
const AppName = styled('h1')`
    font-size: 6rem;
    font-weight: bold;
    color: ${(props) => props.theme.complementary};
    margin: 0;
`;

const AppHeadLine = styled('span')`
    font-size: 3rem;
    color: white;
    font-weight: bold;
`;

const SizedLogo = styled(Logo)`
    width: 13rem;
    height: 13rem;
`;

class SignIn extends React.Component {
    render() {
        return (
            <StyledWrapper>
                <AppBrand>
                    <div>
                        <AppName>
                            {this.props.i18nStore.content.global.appName}
                        </AppName>
                        <AppHeadLine>
                            {this.props.i18nStore.content.global.appHeadLine}
                        </AppHeadLine>
                    </div>
                </AppBrand>
                <LoginForm />
                <SizedLogo />
            </StyledWrapper>
        );
    }
}

export default connect('i18nStore')(SignIn);
