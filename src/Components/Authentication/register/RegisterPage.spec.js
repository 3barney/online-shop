import expect from 'expect';
import React from 'react';
import { mount, shallow} from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import {RegisterPage} from './RegisterPage';

global.window = { localStorage: 'shopID_token' };

function setup(registration) {
  const props = {
      userData: {}, registration: registration, errors: {},
      onRegister: () => {},
      onChange: () => {}
  };

  return shallow(<RegisterPage {...props } />);
}

describe('Registration page component test', () => {
  it('renders form and h1 element', () => {
    const wrapper = setup(false);
    expect(wrapper.find('form'));
    expect(wrapper.find('h1').text()).toEqual('User Registration');
  });

  it('renders 6 FormFields, labels and inputs', () => {
    const wrapper = setup(false);
    expect(wrapper.find('FormField').length).toBe(6);
    expect(wrapper.find('label').length).toBe(6);
    expect(wrapper.find('Input').length).toBe(3);
    expect(wrapper.find('input').length).toBe(3);
  });

  it('renders Input fields for firstName, secondName, email', () => {
    const wrapper = setup(false);
    expect(wrapper.find('Input').get(0).props.name).toBe('firstName');
    expect(wrapper.find('Input').get(1).props.name).toBe('secondName');
    expect(wrapper.find('Input').get(2).props.name).toBe('email');
  });

  it('renders input fields for phoneNumber, password and confirmPassword', () => {
    const wrapper = setup(false);
    expect(wrapper.find('input').get(0).props.name).toBe('phoneNumber');
    expect(wrapper.find('input').get(1).props.name).toBe('password');
    expect(wrapper.find('input').get(2).props.name).toBe('confirmPassword');
  });

  it('renders Register button', () => {
    const wrapper = setup(false);
    expect(wrapper.find('Button').length).toBe(1);
    expect(wrapper.find('Button').props().content).toEqual('Register');
  });

  it('Login button is labeled "REGISTER" when not Registering', () => {
    const wrapper = setup(false);
    expect(wrapper.find('Button').props().content).toEqual('Register');
  });

  it('sets error message when trying to send no data', () => {
    const props = {
      loggingIn: false,
      userData: {userData : {firstName: '', secondName: '', phoneNumber: '', email: '', password: ''}},
      actions: { onRegister: () => { return Promise.resolve(); }}
    };
    const wrapper = mount(
      <RegisterPage {...props} />
    );
    const loginButton = wrapper.find('Button').first();
    expect(loginButton.prop('content')).toBe('Login');
    loginButton.simulate('click');
    expect(wrapper.state().errors.firstName).toBe('First Name is required!');
    expect(wrapper.state().errors.phoneNumber).toBe('Phone Number is required!');
    expect(wrapper.state().errors.email).toBe('Not a Valid email Address');
    expect(wrapper.state().errors.password).toBe('Password to short');
    wrapper.setState({});
  });
});
