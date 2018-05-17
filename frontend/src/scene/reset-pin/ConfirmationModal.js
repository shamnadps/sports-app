import React from 'react';
import styled from 'react-emotion';
import Modal, { Content, Title } from '../../components/modal';
import Button from '../../components/button';
import { Link } from 'react-router-dom';

const SmallModal = styled(Modal)`
    height: 40%;
    display: flex;
`;

const ModalAction = styled('div')`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
`;
const CustomTitle = styled(Title)`
    font-weight: 400;

    strong {
        color: ${(props) => props.theme.main};
    }
`;

export default class ConfirmationModal extends React.Component {
    render() {
        const { i18nContent, show } = this.props;
        return (
            <SmallModal show={show} hideCloseButton>
                <div>
                    <CustomTitle>
                        {i18nContent.resetPinForm.welcome}
                    </CustomTitle>
                    <Content>
                        <p>{i18nContent.resetPinForm.congratulationMessage}</p>
                        <p>{i18nContent.resetPinForm.promptPinCode}</p>
                    </Content>
                    <ModalAction>
                        <Link to="/login">
                            <Button bold>{i18nContent.appHeader.login}</Button>
                        </Link>
                    </ModalAction>
                </div>
            </SmallModal>
        );
    }
}
