import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { connect, HorizonProvider } from '../src/index';
import { Horizon, TestComp } from './utils';

describe('connect', () => {

  it('should create container component with 2 subscriptions', () => {

    const TestCompContainer = connect(TestComp, {
      subscriptions: {
        items: (hz) => hz('items').watch(),
        users: (hz) => hz('users').watch(),
      }
    });

    const wrapper = mount((
      <HorizonProvider instance={Horizon()}>
        <TestCompContainer />
      </HorizonProvider>
    ));

    expect(wrapper.find(TestCompContainer).nodes[0]._subscriptions)
      .to.have.length(2);
  });

  it('should create container component with 2 mutations', () => {

    const TestCompContainer = connect(TestComp, {
      mutations: {
        createItem: (hz) => (item) => hz('items').store(item),
        addUser: (hz) => (user) => hz('users').store(user),
      }
    });

    const wrapper = mount((
      <HorizonProvider instance={Horizon()}>
        <TestCompContainer />
      </HorizonProvider>
    ));

    expect(wrapper.find(TestCompContainer).nodes[0]._mutations)
      .to.have.keys(['createItem', 'addUser']);
  });
});
