import expect from 'expect';
import React from 'react';
import { mount, shallow} from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import RegisterPage from './RegisterPage';

function setup(registration) {
  const props = {
      userDetails: {}, registration: registration, errors: {},
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
});
