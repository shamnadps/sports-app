import React from 'react';
import styled from 'react-emotion';
import { connect } from 'utils';
import Modal, { Title, Content as ModalContent } from '../../components/modal';
import LocationIcon from '../../common/LocationIcon';
import ClockLogo from '../../common/ClockLogo';
import Button from '../../common/Button';
import dateFns from 'date-fns';

const Content = styled(ModalContent)`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    div {
        display: inherit;
        flex-direction: column;
        text-align: center;
        margin: 4rem;

        * {
            margin: 1rem;
        }
        span {
            font-size: 8rem;
            font-family: GT-Walsheim, sans-serif;
            color: ${(props) => props.theme.main};
        }
    }
`;
const CourseContent = styled(ModalContent)`
    margin: 2rem 0;
    width: 100%;
    max-height: 90%;
    overflow-y: scroll;
    overflow-x: hidden;

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

class ConfirmationModal extends React.Component {
    clear = (e) => {
        this.props.courseStore.clearReservedCourseList();
    };
    render() {
        const reservedCourse = this.props.courseStore.reservedCourse;
        const i18nContent = this.props.i18nStore.content;
        return (
            <Modal show={reservedCourse || false} onClear={this.clear}>
                {reservedCourse && (
                    <Content>
                        <CourseContent>
                            <Title>
                                {
                                    i18nContent.reservationConfirmationForm
                                        .success.title
                                }
                            </Title>
                            <Title>{reservedCourse.name}</Title>
                            <ul>
                                <li>
                                    <LocationIcon />
                                    {reservedCourse.location}
                                </li>
                                <li>
                                    <ClockLogo />
                                    <strong>
                                        {dateFns.format(
                                            reservedCourse.startDate,
                                            'HH:MM'
                                        )}
                                    </strong>
                                    -{' '}
                                    {dateFns.format(
                                        reservedCourse.endDate,
                                        'HH:MM'
                                    )}
                                </li>
                            </ul>
                            <Title>
                                {
                                    i18nContent.reservationConfirmationForm
                                        .success.reservationAmountDesc
                                }
                            </Title>
                            <span>{reservedCourse.price} €</span>
                            <Button
                                onClick={() =>
                                    this.props.courseStore.clearReservedCourseList()
                                }
                            >
                                {
                                    i18nContent.reservationConfirmationForm
                                        .dismiss
                                }
                            </Button>
                        </CourseContent>
                    </Content>
                )}
            </Modal>
        );
    }
}

export default connect('i18nStore', 'courseStore')(ConfirmationModal);
