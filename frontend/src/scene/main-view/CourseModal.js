import React, { Fragment } from 'react';
import styled from 'react-emotion';
import { connect, getLocale, composeFunction } from 'utils';
import Modal, { Content, Title } from '../../components/modal';
import LocationIcon from '../../common/LocationIcon';
import DateLogo from '../../common/DateLogo';
import ClockLogo from '../../common/ClockLogo';
import EuroLogo from '../../common/EuroLogo';
import Button from '../../components/button';
import dateFns from 'date-fns';
import stringInterpolator from 'interpolate';
import posed, { PoseGroup } from 'react-pose';

const CourseContent = styled(Content)`
    width: 100%;
    max-height: 70%;
    overflow-y: scroll;
    overflow-x: hidden;

    ul {
        padding: 0;
        margin: 0;
    }
    p {
        margin: 1rem;
    }
    li {
        padding: 1rem 0;
        margin-left: 1rem;
        display: flex;
        align-items: center;
        text-transform: capitalize;

        svg {
            fill: ${(props) => props.theme.complementary};
            width: 2.5rem;
            height: auto;
            margin-right: 1.5rem;
            flex-shrink: 0;
        }
    }
`;
const BottomSection = styled(Content)`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    & > div {
        width: 100%;
        border-bottom: 1px rgba(0, 0, 0, 0.8) solid;
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
        margin-top: 2rem;
        padding: 2rem;
        flex-basis: 70%;
    }
`;

const ReservationContent = styled(Content)`
    height: 100%;
    display: flex;
    justify-content: baseline;
    align-items: center;
    flex-direction: column;
    margin-top: 10rem;

    strong {
        position: relative;
        padding-top: 4rem;
    }

    span {
        padding-top: 2rem;
        font-size: 6rem;
        font-family: GT-Walsheim, sans-serif;
        color: ${(props) => props.theme.main};
    }

    div {
        padding-top: 4rem;
        font-size: 2rem;
        text-align: center;
    }
`;

const ErrorMessageAnimation = posed.h4({
    hidden: {
        y: -10,
        x: 50,
        opacity: 0,
    },
    shown: {
        y: -10,
        x: 0,
        opacity: 1,
    },
});

const ErrorMessageTag = styled(Content)`
    color: ${(props) => props.theme[props.color]};
    font-size: 2.3rem;
    font-weight: bold;
    display: block;
    padding: 1rem;
    margin: 0;
`;

const MainModal = ({
    course,
    seletectedDate,
    onConfirm,
    disabled,
    errorDetail,
    clear,
}) => (
    <Modal show={course} onClear={clear}>
        {course && (
            <Fragment>
                <CourseContent>
                    <Title>{course.name}</Title>
                    <ul>
                        <li>
                            <LocationIcon />
                            {course.location}
                        </li>
                        <li>
                            <DateLogo />
                            <strong>
                                {dateFns.format(
                                    seletectedDate,
                                    'dddd DD.MM.YYYY',
                                    { locale: getLocale() }
                                )}
                            </strong>
                        </li>
                        <li>
                            <ClockLogo />
                            <strong>
                                {dateFns.format(course.startDate, 'HH:mm')} -
                                {dateFns.format(course.endDate, 'HH:mm')}
                            </strong>
                        </li>
                    </ul>
                    <p>{course.description}</p>
                </CourseContent>
                <BottomSection>
                    <div>
                        <div>
                            <span>
                                Kesto{' '}
                                {dateFns.distanceInWords(
                                    course.endDate,
                                    course.startDate,
                                    { locale: getLocale() }
                                )}
                            </span>
                            <span>
                                {course.single_payment_count -
                                    course.reservedCount}{' '}
                                vapaana
                            </span>
                        </div>
                        <span>3 €</span>
                    </div>
                    {!course.isAvailable ? (
                        <div>
                            <div>
                                <ErrorMessageTag
                                    key="3"
                                    color={errorDetail.colorCode}
                                >
                                    {errorDetail.longMessage}
                                </ErrorMessageTag>
                            </div>
                            <Button alternative disabled bold>
                                Varaa
                            </Button>
                        </div>
                    ) : (
                        <Button
                            style={{ display: 'block' }}
                            alternative
                            bold
                            onClick={onConfirm}
                        >
                            Varaa
                        </Button>
                    )}
                </BottomSection>
            </Fragment>
        )}
    </Modal>
);

const ConfirmationModal = ({ course, seletectedDate, reserve, clear }) => (
    <Modal show={course} onClear={clear}>
        {course && (
            <Fragment>
                <CourseContent>
                    <Title>Vahvista varaus</Title>
                    <ul>
                        <h4>Olet varaamassa kurssia</h4>
                        <li>
                            <Title>{course.name}</Title>
                        </li>
                        <li>
                            <LocationIcon />
                            {course.location}
                        </li>
                        <li>
                            <DateLogo />
                            {dateFns.format(seletectedDate, 'dd DD.MM.YYYY', {
                                locale: getLocale(),
                            })}
                        </li>
                        <li>
                            <ClockLogo />
                            {dateFns.format(course.startDate, 'HH:mm')} -
                            {dateFns.format(course.endDate, 'HH:mm')}
                        </li>
                        <li>
                            <EuroLogo />
                            <strong>
                                {Number(course.price).toLocaleString('fi')}
                            </strong>
                        </li>
                    </ul>
                    <p>{course.description}</p>
                </CourseContent>
                <BottomSection>
                    <Button color="red" onClick={clear}>
                        Keskeytä
                    </Button>
                    <Button bold onClick={() => reserve(course)}>
                        Vahvista
                    </Button>
                </BottomSection>
            </Fragment>
        )}
    </Modal>
);

const ReservationModal = ({ course, seletectedDate, clear }) => (
    <Modal show={course} onClear={clear}>
        {course && (
            <Fragment>
                <ReservationContent>
                    <Title>Varaus Onnistui</Title>
                    <strong>Varasit tunnin hintaan</strong>
                    <span>{Number(course.price).toLocaleString('fi')} €</span>
                    <div>
                        Saat varauksesta tekstiviestivahvistuksen puhelimeesi
                    </div>
                </ReservationContent>
                <BottomSection>
                    <Button onClick={clear}>Sulje</Button>
                </BottomSection>
            </Fragment>
        )}
    </Modal>
);

class CourseModal extends React.Component {
    state = {
        showDetails: true,
        showConfirm: false,
        showReserve: false,
        reservedCourse: null,
    };

    clear = () => {
        this.props.courseStore.selectCourse(null);
        this.setState({
            showDetails: true,
            showConfirm: false,
            showReserve: false,
        });
    };

    onConfirm = () => {
        this.setState({
            showDetails: false,
            showConfirm: true,
            showReserve: false,
        });
    };

    reserve = (course) => {
        this.props.courseStore.reserveCourse(course);
        this.setState({
            showDetails: true,
            showConfirm: false,
            showReserve: true,
            reservedCourse: course,
        });
    };

    removeFocusesCourse = () => {
        this.props.courseStore.reserveCourse(null);
    };

    getErrorDetail = (course) => {
        if (!course || !course.reasons) return;
        const types = course.reasons;
        const errorMessages = this.props.i18nStore.content.courseCard
            .errorMessages;
        const {
            openTime,
            closeTime,
            resource,
            auth,
            reserved,
            noTickets,
        } = errorMessages;

        if (types.indexOf('auth') > -1) {
            return {
                longMessage: auth.longMessage,
                shortMessage: auth.shortMessage,
                colorCode: 'errorReservationAuth',
                type: 'auth',
            };
        } else if (types.indexOf('reserved') > -1) {
            return {
                longMessage: reserved.longMessage,
                shortMessage: reserved.shortMessage,
                colorCode: 'green',
                type: 'reserved',
            };
        } else if (types.indexOf('noTickets') > -1) {
            return {
                longMessage: noTickets.longMessage,
                shortMessage: noTickets.shortMessage,
                colorCode: 'errorReservationNoTicket',
                type: 'noTickets',
            };
        } else if (types.indexOf('openTime') > -1) {
            return {
                longMessage: stringInterpolator(openTime.longMessage, {
                    date: dateFns.format(
                        dateFns.subDays(course.startDate, 3),
                        'DD.MM'
                    ),
                    time: dateFns.format(course.startDate, 'HH:mm'),
                }),
                shortMessage: openTime.shortMessage,
                colorCode: 'errorReservationTime',
                type: 'openTime',
            };
        } else if (types.indexOf('closingTime') > -1) {
            return {
                longMessage: stringInterpolator(closeTime.longMessage, {
                    numberOfFreeSeats:
                        course.single_payment_count - course.reservedCount,
                }),
                shortMessage: closeTime.shortMessage,
                colorCode: 'errorReservationTime',
                type: 'closingTime',
            };
        } else if (types.indexOf('resource') > -1) {
            return {
                longMessage: resource.longMessage,
                shortMessage: resource.shortMessage,
                colorCode: 'errorReservationResource',
                type: 'resource',
            };
        }
    };

    render() {
        const seletectedDate = this.props.courseStore.filters.date;
        const course = this.props.courseStore.courseInFocus;
        const i18nContent = this.props.i18nStore.content;
        const disabled = !this.props.userStore.isAuthenticated;
        const errorDetail = this.getErrorDetail(course) || {};

        return (
            <div>
                {this.state.showDetails && (
                    <MainModal
                        course={course}
                        seletectedDate={seletectedDate}
                        onConfirm={this.onConfirm}
                        disabled={disabled}
                        errorDetail={errorDetail}
                        clear={this.clear}
                    />
                )}
                {this.state.showConfirm && (
                    <ConfirmationModal
                        course={course}
                        seletectedDate={seletectedDate}
                        reserve={this.reserve}
                        clear={this.clear}
                    />
                )}
                {this.state.showReserve && (
                    <ReservationModal
                        course={this.state.reservedCourse}
                        seletectedDate={seletectedDate}
                        clear={composeFunction(
                            this.clear,
                            this.removeFocusesCourse
                        )}
                    />
                )}
            </div>
        );
    }
}

export default connect('i18nStore', 'courseStore', 'userStore')(CourseModal);
