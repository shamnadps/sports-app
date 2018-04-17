import React from 'react';
import Logo from '../../common/Logo';
import Button from '../../common/Button';
import styled from 'react-emotion';
import Header from './Header';
import { connect } from 'utils';

const Wrapper = styled('div')`
    display: flex;
    position: relative;
`;

const AppHeader = styled(Header)`
    width: 100%;
    padding: 3rem;
    height: 30rem;

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
const Aligner = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 4rem;

    div {
        display: flex;
        align-items: center;
    }
`;
const StyledHeader = styled(Header)`
    width: 100vw;
    height: 30rem;
`;
const MainHeader = styled('div')``;

class MainView extends React.Component {
    render() {
        return (
            <Wrapper>
                <AppHeader>
                    <Aligner>
                        <div>
                            <Logo noText />
                            <span>Liikkuva Vantaa</span>
                        </div>
                        <Button>Oma Tilini</Button>
                    </Aligner>
                </AppHeader>
            </Wrapper>
        );
    }
}

export default connect('ContentStore', 'UserStore')(MainView);
