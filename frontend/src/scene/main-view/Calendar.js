import React from 'react';
import styled from 'react-emotion';
import moment from 'moment';

const Wrapper = styled('div')`
    padding: 1rem 0;
    color: white;
`;

const Label = styled('div')`
    font-size: 2.5rem;
    * {
        display: inline-block;
        margin: 0;
        font-weight: 400;    
    }
    span {
        margin-right: 3rem;
    }
    h5 {
        opacity: 0.86;
    }
    h4 {
        font-size: 3rem;
        font-weight: 900;
    }
    h4,
    h5 {
        letter-spacing: 3px;
    }
    }
    margin-bottom: 2rem;
`;

const WeekTable = styled('div')`
    width: 100%;
    justify-content: space-between;
    display: flex;
    align-items: center;
`;
const DateColumn = styled('div')`
    font-size: 2rem;
    font-weight: 900;
    display: inline-block;

    * {
        text-align: center;
        display: block;
    }

    & > :last-child {
        margin-top: 2rem;
        font-weight: 400;
        opacity: 0.8;
    }

    ${(props) =>
        props.selected &&
        `
        padding: 6px;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);

        span {
            color: black;
        }
        & > :last-child {
            margin-top: 2rem;
            font-weight: 400;
            color: ${props.theme.main};
        }
    `};
`;

const dates = [0, 1, 2, 3, 4, 5, 6];

//@TODO: Convert all text in this file to use strings from contents.json
class WeeklyCalendar extends React.Component {
    state = {
        next7days: dates.map((i) => {
            const momentObj = moment().add(i, 'day');
            return {
                weekDay: momentObj.format('dd'),
                date: momentObj.format('DD'),
            };
        }),
        selected: moment(), // default to select today
    };
    render() {
        const today = moment();
        return (
            <Wrapper>
                <Label>
                    <span>Päivä</span>
                    <h4>{today.format('DD')}.</h4>
                    <h5>{today.format('MM.YYYY')}</h5>
                </Label>
                <WeekTable>
                    {this.state.next7days.map(({ weekDay, date }, index) => (
                        <DateColumn
                            key={date}
                            selected={date === this.state.selected.format('DD')}
                        >
                            <span>{weekDay}</span>
                            <span>{date}</span>
                        </DateColumn>
                    ))}
                </WeekTable>
            </Wrapper>
        );
    }
}

export default WeeklyCalendar;
