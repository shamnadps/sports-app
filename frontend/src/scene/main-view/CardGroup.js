import React from 'react';
import styled from 'react-emotion';

const CardWrapper = styled('div')`
    width: 100%;
    background-color: white;
    margin: 1px 0;
    height: 10rem;
`;

const Card = (props) => <CardWrapper {...props} />;

export default class CardGroup extends React.Component {
    render() {
        return (
            <div>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => (
                    <Card key={el} />
                ))}
            </div>
        );
    }
}
