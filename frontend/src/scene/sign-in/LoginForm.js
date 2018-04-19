import React from 'react';
import styled, { keyframes } from 'react-emotion';
import { connect } from 'utils';
import { autorun } from 'mobx';
import { Redirect } from 'react-router-dom';

const shake = keyframes`
    10%, 90% {
      transform: translate3d(-1px, 0, 0);
    }
    
    20%, 80% {
      transform: translate3d(2px, 0, 0);
    }
  
    30%, 50%, 70% {
      transform: translate3d(-4px, 0, 0);
    }
  
    40%, 60% {
      transform: translate3d(4px, 0, 0);
    }
`;

const Form = styled('form')`
    margin: 0 3rem;
`;
const InputField = styled('div')`
    margin: 2rem 0;
    * {
        outline: none;
        border: none;
    }
    label {
        display: block;
        margin-bottom: 1rem;
        font-size: 2.3rem;
        letter-spacing: 2px;
        color: white;
        font-weight: 700;
        transition: all 0.5s ease;
    }
    div {
        display: flex;
        justify-content: space-between;
    }
    ${(props) =>
        props.error &&
        `
        input {
            background-color: rgba(255, 82, 82, .7) !important;
            animation: ${shake} 1s ease 1;
        }
        label {
            color: rgba(255, 82, 82, .9)
        }
    `};
`;
const TelephoneInput = styled('input')`
    width: 100%;
    height: 6rem;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 0.5rem;
    color: white;
    padding: 2rem;
    font-size: 2rem;
    border: 2px transparent solid;
    transition: all 0.5s ease;

    &:focus {
        border-color: white;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
        transform: scale(1.05) translateY(-4px);
    }
`;
const PinCodeInput = styled(TelephoneInput)`
    width: 7rem;
    height: 6rem;
    display: inline-block;
    text-align: center;
    color: transparent;
    text-shadow: 0 0 0 white;
`;

const FormLink = styled('div')`
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;

    a {
        color: rgba(255, 255, 255, 0.7);
        font-size: 2rem;
        text-decoration: none;
        border-bottom: 1px white solid;
        transition: letter-spacing 0.5s ease;

        &:hover {
            letter-spacing: 4px;
        }
    }
`;

const pinArr = [0, 1, 2, 3];

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        autorun(() => {
            if (this.props.UserStore.authenticationFailed) this.input0.focus();
        });
    }
    onTelephoneInputChange = (e) => {
        this.props.UserStore.setPhoneNumber(e.target.value);
    };
    onPinCodeInputsChange = (key) => (e) => {
        const setResult = this.props.UserStore.setInputCode(
            key,
            e.target.value
        );
        if (setResult && key !== 3) {
            if (key === 3) this[`input0`].focus();
            else this[`input${key + 1}`].focus();
        }
    };
    render() {
        const content = this.props.ContentStore.content;
        const authenticationFailed = this.props.UserStore.authenticationFailed;

        if (this.props.UserStore.isAuthenticated)
            return <Redirect to="/main" />;
        return (
            <Form>
                <InputField error={authenticationFailed}>
                    <label htmlFor="telephone">
                        {authenticationFailed
                            ? content.signIn.form.telIsWrong
                            : content.signIn.form.tel}
                    </label>
                    <TelephoneInput
                        name="telephone"
                        type="tel"
                        value={this.props.UserStore.phoneNumber}
                        onChange={this.onTelephoneInputChange}
                    />
                </InputField>
                <InputField error={authenticationFailed}>
                    <label htmlFor="pinCode">
                        {authenticationFailed
                            ? content.signIn.form.pinCodeIsWrong
                            : content.signIn.form.pinCode}
                    </label>
                    <div>
                        {pinArr.map((key) => (
                            <PinCodeInput
                                innerRef={(instance) =>
                                    (this['input' + key] = instance)
                                }
                                key={key}
                                type="password"
                                onChange={this.onPinCodeInputsChange(key)}
                                value={this.props.UserStore.pinCode[key]}
                                name="pinCode"
                            />
                        ))}
                    </div>
                </InputField>
                <FormLink>
                    <a href="#">{content.signIn.form.register}</a>
                    <a href="#">{content.signIn.form.forgotPassword}</a>
                </FormLink>
            </Form>
        );
    }
}

export default connect('ContentStore', 'UserStore')(LoginForm);
