import React from 'react';
import styled from 'react-emotion';
import dateFns from 'date-fns';
import { connect } from 'utils';
import Button from '../../common/Button';
import posed, { PoseGroup } from 'react-pose';

const CardWrapperAnimatable = posed.div({
    enter: {
        y: '0%',
        opacity: 1,
    },
    exit: {
        y: '100%',
        opacity: 0,
    },
});
const Coordinator = posed.div({
    enter: {
        delay: 1500,
        staggerChildren: 500,
    },
});

const CardWrapper = styled(CardWrapperAnimatable)`
    width: 100%;
    background-color: white;
    margin: 1px 0;
    height: 20rem;
    padding: 2rem 0;
    display: flex;
`;
const TimeArea = styled('div')`
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-size: 2rem;

    & > span:first-child {
        font-weight: bold;
    }

    div {
        height: 100%;
        width: 3px;
        border-radius: 5rem;
        background: ${(props) =>
            `linear-gradient(to bottom, transparent, rgba(63, 142, 219))`};
    }
`;
const CourseArea = styled('div')`
    width: 70%;
    padding-left: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 2rem;

    span:first-child {
        font-size: 2.5rem;
        color: ${(props) => props.theme.main};
    }

    span {
        font-size: 2rem;
        display: block;
    }
    div {
        span {
            display: inline;
            margin-right: 3rem;
            color: ${(props) => props.theme.main};
            text-transform: uppercase;
            font-size: 3rem;
        }
        button {
            background-color: ${(props) => props.theme.main};
            border: none;
        }
    }
`;

const Card = ({ course, buttonLabel, ...rest }) => (
    <CardWrapper {...rest}>
        {course ? (
            <React.Fragment>
                <TimeArea>
                    <span>{dateFns.format(course.startDate, 'hh:mm')}</span>
                    <div />
                    <span>{dateFns.format(course.endDate, 'hh:mm')}</span>
                </TimeArea>
                <CourseArea>
                    <span>{course.name}</span>
                    <span>{course.location}</span>
                    <div>
                        <span>€ {course.price}</span>
                        <Button>{buttonLabel}</Button>
                    </div>
                </CourseArea>
            </React.Fragment>
        ) : (
            <div />
        )}
    </CardWrapper>
);

class CardGroup extends React.Component {
    render() {
        const {
            useMockCourse,
            isFetching,
        } = this.props.CourseStore.useMockCourse;
        const courses = this.props.CourseStore.getCourse(Date.now());
        const buttonLabel = this.props.ContentStore.content.courseCard.select;

        return (
            <Coordinator pose="enter">
                <PoseGroup animateOnMount>
                    {/* {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el, i) => (
                        <Card key={el * 2} />
                    ))} */}
                    {courses.map((el, i) => (
                        <Card key={i} course={el} buttonLabel={buttonLabel} />
                    ))}
                </PoseGroup>
            </Coordinator>
        );
    }
}

export default connect('CourseStore', 'ContentStore')(CardGroup);
