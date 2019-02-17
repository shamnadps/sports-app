import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import styled from 'react-emotion';
import posed, { PoseGroup } from 'react-pose';
import Button from '../../components/button';
import { connect } from 'utils';

const ItemAnimation = posed.div({
    enter: {
        y: '0%',
        opacity: 1,
    },
    exit: {
        y: '200%',
        opacity: 0,
    },
    preEnter: {
        opacity: 0,
        y: '200%',
    },
});

const NotificationWrapper = styled(ItemAnimation)`
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 2rem;
    background-color: white;
    box-shadow: 0 -6px 12px rgba(0, 0, 0, 0.3);
    justify-content: space-between;
    @media only screen and (min-width: 600px) {
        border-radius: 0 0 2rem 2rem;
    }

    button {
        padding: auto;
    }
    div {
        display: inherit;
        align-items: center;

        span {
            font-size: 2rem;
            margin-right: 2rem;
        }
    }
`;

class NotificationBanner extends Component {
    state = {
        show: false,
    };
    componentDidMount() {
        setInterval(this.checkForUpdates, 60000);
        const okay = window.localStorage.getItem('cookieSetRefreshFlag');
        if (okay === null || okay === 'false') {
            window.setTimeout(() => this.setState({ show: true }), 3000);
        } else this.setState({ show: false });
    }

    checkForUpdates = () => {
        let updateAvailble = window['updateAvailble'];
        if (updateAvailble) {
            this.setState({ show: true });
        }
    };
    agree = (e) => {
        window.localStorage.setItem('cookieSetRefreshFlag', 'true');
        let serviceWorkerVar = window['serviceWorkerVar'];
        try {
            serviceWorkerVar.postMessage({ action: 'skipWaiting' });
        } catch (error) {
            console.log(error);
        }
        this.setState({ show: false });
    };
    render() {
        const i18nContent = this.props.i18nStore.content;
        return createPortal(
            <PoseGroup animateOnMount preEnterPose="preEnter">
                {this.state.show && (
                    <NotificationWrapper key="1">
                        <div>
                            <span>
                                {i18nContent.notificationBanner.message}
                            </span>
                        </div>
                        <Button bold onClick={this.agree}>
                            {i18nContent.notificationBanner.buttonLabel}
                        </Button>
                    </NotificationWrapper>
                )}
            </PoseGroup>,
            document.querySelector('body')
        );
    }
}

export default connect('i18nStore')(NotificationBanner);
