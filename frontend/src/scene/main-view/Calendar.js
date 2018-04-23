import React from 'react';
import styled from 'react-emotion';
import dateFns from 'date-fns';
import fiLocale from 'date-fns/locale/fi';
import { connect } from 'utils';
import posed from 'react-pose';

const getLocale = (lang) => {
    if (lang === 'fi') return fiLocale;
    // add cases for swedish later
};

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
    display: flex;
    align-items: center;
    overflow: scroll;
`;
const DateColumn = styled('div')`
    font-size: 2rem;
    font-weight: 900;
    display: inline-block;
    margin-right: 3rem;
    padding: 8px;
    border-radius: 8px;
    transition: background-color 0.5s ease;
    cursor: pointer;

    &:hover {
        background-color: rgba(255, 255, 255, 0.3);
    }

    * {
        text-align: center;
        display: block;
        text-transform: capitalize;
    }

    & > :last-child {
        margin-top: 2rem;
        font-weight: 400;
        opacity: 0.8;
    }
    ${(props) =>
        props.past &&
        !props.selected &&
        `
        opacity: 0.7
    `};

    ${(props) =>
        props.selected &&
        `
        background-color: white !important;
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

const dates = [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class WeeklyCalendar extends React.Component {
    state = {
        viewableDateRange: dates.map((i) => dateFns.addDays(new Date(), i)),
    };
    setDate = (date) => (e) => {
        this.props.CourseStore.setFilters({
            date,
        });
    };
    render() {
        const today = new Date();
        const seletectedDate = this.props.CourseStore.filters.date;
        return (
            <Wrapper>
                <Label>
                    <span>{this.props.ContentStore.content.calendar.date}</span>
                    <h4>{dateFns.format(today, 'DD')}.</h4>
                    <h5>{dateFns.format(today, 'MM.YYYY')}</h5>
                </Label>
                <WeekTable>
                    {this.state.viewableDateRange.map((date, index) => (
                        <DateColumn
                            key={dateFns.format(date, 'x')}
                            selected={dateFns.isSameDay(date, seletectedDate)}
                            past={dateFns.isBefore(date, today)}
                            onClick={this.setDate(date)}
                        >
                            <span>
                                {dateFns.format(date, 'dd', {
                                    locale: getLocale(
                                        this.props.ContentStore.language
                                    ),
                                })}
                            </span>
                            <span>{dateFns.format(date, 'DD')}</span>
                        </DateColumn>
                    ))}
                </WeekTable>
            </Wrapper>
        );
    }
}

export default connect('ContentStore', 'CourseStore')(WeeklyCalendar);
