import React from 'react';
import styled from 'react-emotion';

const CutAndShadow = styled('div')`
    filter: drop-shadow(0px 10px 12px rgba(0, 0, 0, 0.5));
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: transparent;

    & > div {
        width: 100%;
        height: 100%;
        clip-path: polygon(0% 0%, 0% 90%, 100% 80%, 100% 0%);
    }
`;
const HeaderBody = styled('div')`
    background-image: linear-gradient(-60deg, #0542a3, #86cbf6);
    transform: translateY(-4rem);
    z-index: 0;
    padding: 3rem;
`;

const main = ({ children, style, ...rest }) => (
    <div
        style={{
            position: 'relative',
            zIndex: 0,
            ...style,
        }}
        {...rest}
    >
        <CutAndShadow>
            <HeaderBody>{children}</HeaderBody>
        </CutAndShadow>
        <CutAndShadow
            style={{
                transform: 'translateY(-2rem)',
                zIndex: -2,
            }}
        >
            <div
                style={{
                    backgroundColor: '#86cbf6',
                }}
            />
        </CutAndShadow>
        <CutAndShadow
            style={{
                transform: 'translateY(0rem)',
                zIndex: -4,
            }}
        >
            <div
                style={{
                    backgroundColor: '#3f8edb',
                }}
            />
        </CutAndShadow>
    </div>
);

export default main;
//clip-path: polygon(0% 0%, 0% 90%, 100% 80%, 100% 0%);
//
