import React from 'react';
import styled, { css } from 'react-emotion';
import posed, { PoseGroup } from 'react-pose';
import { connect } from 'utils';
import { createPortal } from 'react-dom';
import CloseIcon from '../../common/CloseIcon';
import LocationIcon from '../../common/LocationIcon';
import ClockLogo from '../../common/ClockLogo';
import Button from '../../common/Button';
import dateFns from 'date-fns';

// @TODO: clean the css mess of this file

// this class will be added to "root" element
// when the modal is open
// to simulate blur effect
const rootBlurred = css`
    filter: blur(8px) brightness(80%);
`;
const ModalAnimatable = posed.div({
    enter: {
        scale: 1,
        opacity: 1,
        delayChildren: 100,
        staggerChildren: 100,
        y: '0%',
    },
    exit: {
        y: '30%',
        scale: 0,
        opacity: 0,
        delay: 300,
        staggerChildren: 100,
    },
});
const CloseButton = posed.span({
    enter: {
        y: 0,
        scale: 1,
    },
    exit: {
        y: -20,
        scale: 0,
    },
});
const Wrapper = styled('div')`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10000;
    top: 0;
    left: 0;
    display: flex;
    ${(props) => !props.block && 'pointer-events: none'};
`;

const ModalWrapper = styled(ModalAnimatable)`
    height: 70%;
    width: 80%;
    margin: auto;
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    background-color: white;
    position: relative;
    padding: 2rem;
    font-size: 2rem;
    color: rgba(0, 0, 0, 0.86);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & > span {
        transform: scale(0);
        position: fixed;
        right: 1rem;
        top: 1rem;
        padding: 1rem;
        border-radius: 4px;
        transition: background-color 0.5s ease;

        &:hover {
            svg {
                fill: white;
            }
            background-color: #ef5350;
        }

        svg {
            width: 2rem;
            fill: red;
            transition: fill 0.5s ease;
        }
    }
`;

const ModalContentAnimatable = posed.div({
    enter: {
        y: 0,
        opacity: 1,
    },
    exit: {
        y: 20,
        opacity: 0,
    },
});
const ModalContent = styled(ModalContentAnimatable)`
    margin: 2rem 0;
    width: 100%;
    overflow: scroll;

    h4 {
        margin: 0 0 2rem 0;
        font-size: 3rem;
    }
    ul {
        padding: 0;
        margin: 0;
    }
    p {
        margin-left: 1rem;
    }
    li {
        margin: 1rem 0;
        padding-left: 1rem;
        display: flex;
        align-items: center;

        svg {
            fill: ${(props) => props.theme.main};
            width: 2.5rem;
            height: 2.5rem;
            margin-right: 1rem;
            flex-shrink: 0;
        }
    }
`;
const PaymentSection = styled(ModalContentAnimatable)`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(to top, transparent, white 40%);

    & > div {
        width: 100%;
        border-bottom: 1px rgba(0, 0, 0, 0.2) solid;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;
        & > span {
            font-size: 3rem;
            font-weight: bold;
            color: ${(props) => props.theme.main};
        }
        & > div {
            display: flex;
            flex-direction: column;
            margin-bottom: 1rem;

            span {
                text-transform: uppercase;
                font-weight: bold;
            }

            & > span:last-child {
                color: ${(props) => props.theme.green};
            }
        }
    }
    & > button {
        background-color: ${(props) => props.theme.complementary};
        margin: 2rem;
        border: none !important;
        box-shadow: none !important;
        padding: 2rem;

        &: hover {
            background-color: ${(props) => props.theme.complementary};
            color: white;
        }
    }
`;

class Blur extends React.Component {
    componentDidMount() {
        // apply blur effect to root
        window.setTimeout(() => {
            const root = document.querySelector('#root');
            root.className = rootBlurred;
        }, 100);
    }
    render() {
        return null;
    }
    // remove the blur effect to root
    componentWillUnmount() {
        document.querySelector('#root').className = '';
    }
}

class CourseModal extends React.Component {
    clear = (e) => {
        this.props.CourseStore.selectCourse(null);
    };
    render() {
        const course = this.props.CourseStore.courseInFocus;
        return createPortal(
            <Wrapper block={course || false}>
                <PoseGroup animateOnMount>
                    {course && (
                        <ModalWrapper key="modal">
                            <CloseButton onClick={this.clear}>
                                <CloseIcon />
                            </CloseButton>

                            <ModalContent>
                                <h4>{course.name}</h4>
                                <ul>
                                    <li>
                                        <LocationIcon />
                                        {course.location}
                                    </li>
                                    <li>
                                        <ClockLogo />
                                        <strong>
                                            {dateFns.format(
                                                course.startDate,
                                                'HH:MM'
                                            )}
                                        </strong>
                                        -{' '}
                                        {dateFns.format(
                                            course.endDate,
                                            'HH:MM'
                                        )}
                                    </li>
                                </ul>
                                <p>{course.description}</p>
                            </ModalContent>
                            <PaymentSection>
                                <div>
                                    <div>
                                        <span>Kesto 60 min</span>
                                        <span>3 vapaana</span>
                                    </div>
                                    <span>2.5€</span>
                                </div>
                                <Button>Varaa ja Maksa</Button>
                            </PaymentSection>
                            <Blur />
                        </ModalWrapper>
                    )}
                </PoseGroup>
            </Wrapper>,
            document.querySelector('body')
        );
    }
}

export default connect('CourseStore')(CourseModal);
