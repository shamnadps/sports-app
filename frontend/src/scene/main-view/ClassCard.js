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
const ScrollContainerBase = posed.div({
    enter: {
        delay: 1500,
        staggerChildren: 300,
    },
});

const ScrollContainer = styled(ScrollContainerBase)`
    overflow: scroll;
`;
const CardWrapper = styled(CardWrapperAnimatable)`
    width: 100%;
    background-color: white;
    margin: 1px 0;
    padding: 2rem 0;
    display: flex;
    color: rgba(0, 0, 0, 0.86);
`;
const TimeArea = styled('div')`
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 2rem;

    * {
        margin-bottom: 1rem;
    }

    & > span:first-child {
        font-weight: bold;
    }
`;
const CourseArea = styled('div')`
    padding-left: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 2rem;

    span:first-child {
        font-size: 2.5rem;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.86);
    }

    span {
        font-size: 2rem;
        display: block;
        margin-bottom: 1.5rem;
    }
    div {
        span {
            display: inline;
            margin-right: 3rem;
            color: ${(props) => props.theme.main};
            text-transform: uppercase;
            font-size: 2.5rem;
        }
        button {
            background-color: ${(props) => props.theme.complementary};
            color: rgba(0, 0, 0, 0.7);
            border: none;
            padding: 2rem;
            font-size: 2rem;
        }
    }
`;

const Card = ({ course, buttonLabel, onButtonClick, ...rest }) => (
    <CardWrapper {...rest}>
        <TimeArea>
            <span>{dateFns.format(course.startDate, 'hh:mm')}</span>
            <span>{dateFns.format(course.endDate, 'hh:mm')}</span>
        </TimeArea>
        <CourseArea>
            <span>{course.name}</span>
            <span>{course.location}</span>
            <div>
                <span>€ {course.price}</span>
                <Button onClick={onButtonClick}>{buttonLabel}</Button>
            </div>
        </CourseArea>
    </CardWrapper>
);

class ClassCard extends React.Component {
    selectCourse = (course) => (e) => {
        this.props.CourseStore.selectCourse(course);
    };
    render() {
        const { useMockCourse, isFetchingCourses } = this.props.CourseStore;
        const courses = this.props.CourseStore.getCourses(Date.now());
        const buttonLabel = this.props.ContentStore.content.courseCard.select;

        return (
            <ScrollContainer pose="enter">
                <PoseGroup animateOnMount>
                    {courses.map((el, i) => (
                        <Card
                            key={el.id}
                            course={el}
                            buttonLabel={buttonLabel}
                            onButtonClick={this.selectCourse(el)}
                        />
                    ))}
                </PoseGroup>
            </ScrollContainer>
        );
    }
}

export default connect('CourseStore', 'ContentStore')(ClassCard);
