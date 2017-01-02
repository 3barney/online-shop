import expect from 'expect';
import React from 'react';
import { mount, shallow} from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import {LoginPage} from './LoginPage';
import sinon from 'sinon';

global.window = { localStorage: 'shopID_token' };

function setup(loggingIn) {
  const props = {
      credentials: {}, loggingIn: loggingIn, errors: {},
      onLogin: () => {},
      onChange: () => {}
  };

  return shallow(<LoginPage {...props } />);
}

describe('Login page component test', () => {

  it('renders form and h1', () => {
    const wrapper = setup(false);
    expect(wrapper.find('Form').length).toBe(1);
    expect(wrapper.find('h1').text()).toEqual('Welcome');
  });

  it("renders two FormField's and two labels", () => {
    const wrapper = setup(false);
    expect(wrapper.find('FormField').length).toBe(2);
    expect(wrapper.find('label').length).toBe(2);
    expect(wrapper.find('label').first().text()).toEqual('Email Address');
    expect(wrapper.find('label').last().text()).toEqual('Password');
  });

  it('renders to inputs fields for Email(Input) and password(input)', () => {
    const wrapper = setup(false);
    expect(wrapper.find('Input').length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('Input').props().name).toBe('email');
    expect(wrapper.find('input').props().name).toBe('password');
  });

  it('renders two Buttons, Login and Register', () => {
    const wrapper = setup(false);
    expect(wrapper.find('Button').length).toBe(2);
    expect(wrapper.find('Button').last().props().content).toEqual('Register');
  });

  it('Login button is labeled "LOGIN" when not Logging in', () => {
    const wrapper = setup(false);
    expect(wrapper.find('Button').first().props().content).toEqual('Login');
  });

  it('sets error message when trying to login with empty email and password', () => {
    const props = {
      loggingIn: false,
      credentials: {credentials : {email: '', password: ''}},
      actions: { onLogin: () => { return Promise.resolve(); }}
    };
    const wrapper = mount(
      <LoginPage {...props} />
    );
    const loginButton = wrapper.find('Button').first();
    expect(loginButton.prop('content')).toBe('Login');
    loginButton.simulate('click');
    expect(wrapper.state().errors.email).toBe('Not a Valid email Address!');
    expect(wrapper.state().errors.password).toBe('Password to short');
    wrapper.setState({});
  });

  it('sets error message when trying to login with incorrect email and password', () => {
    const props = {
      credentials: {credentials : {email: 'bababa@baba', password: 'ba'}},
      actions: { onLogin: () => { return Promise.resolve(); }}
    };
    const wrapper = mount(
      <LoginPage {...props} />
    );
    const loginButton = wrapper.find('Button').first();
    expect(loginButton.prop('content')).toBe('Login');
    loginButton.simulate('click');
    expect(wrapper.state().errors.email).toBe('Not a Valid email Address!');
    expect(wrapper.state().errors.password).toBe('Password to short');
    wrapper.setState({});
  });

});
