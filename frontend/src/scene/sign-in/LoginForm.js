import React from 'react';
import styled from 'react-emotion';
import { connect } from 'utils';
import SignInState from './SignInState';

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
        color: rgba(255, 255, 255, 0.76);
        font-weight: 700;
    }
    div {
        display: flex;
        justify-content: space-between;
    }
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
    transition: border-color 0.5s ease;

    &:focus {
        border-color: white;
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
        this.signInState = new SignInState();
    }

    onTelephoneInputChange = (e) => {
        this.signInState.setPhoneNumber(e.target.value);
    };
    onPinCodeInputsChange = (key) => (e) => {
        const setResult = this.signInState.setInputCode(key, e.target.value);
        if (setResult && key !== 3) {
            if (key === 3) this[`input0`].focus();
            else this[`input${key + 1}`].focus();
        }
    };
    render() {
        const content = this.props.ContentStore.content;
        return (
            <Form>
                <InputField>
                    <label htmlFor="telephone">{content.signIn.form.tel}</label>
                    <TelephoneInput
                        name="telephone"
                        type="tel"
                        value={this.signInState.phoneNumber}
                        onChange={this.onTelephoneInputChange}
                    />
                </InputField>
                <InputField>
                    <label htmlFor="pinCode">
                        {content.signIn.form.pinCode}
                    </label>
                    <div>
                        {pinArr.map((key) => (
                            <PinCodeInput
                                innerRef={(instance) =>
                                    (this['input' + key] = instance)
                                }
                                key={key}
                                type="text"
                                onChange={this.onPinCodeInputsChange(key)}
                                value={this.signInState.pinCode[key]}
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

export default connect('ContentStore')(LoginForm);
