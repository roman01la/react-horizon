import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { connect, HorizonProvider, HorizonRoute } from '../src/index';

function Horizon() {
  const hz = Horizon;
  hz.watch = () => ({ subscribe: (handler) => handler(['subscription']) });
  hz.connect = () => undefined;
  return hz;
}

const TestComp = () => <div />;

describe('connect', () => {

  it('should return React component with 2 subscriptions', () => {

    const TestCompContainer = connect(TestComp, {
      subscriptions: {
        items: (hz) => hz('items'),
        users: (hz) => hz('users'),
      }
    });

    const wrapper = mount((
      <HorizonProvider instance={Horizon()}>
        <TestCompContainer />
      </HorizonProvider>
    ));

    expect(wrapper.nodes[0]._subscriptions).to.have.length(2);
  });

  it('should return React component with 2 mutations', () => {

    const TestCompContainer = connect(TestComp, {
      mutations: {
        removeItem: (hz) => (id) => hz('items').remove(id),
        addUser: (hz) => (name) => hz('users').store({ name }),
      }
    });

    const wrapper = mount((
      <HorizonProvider instance={Horizon()}>
        <TestCompContainer />
      </HorizonProvider>
    ));

    expect(wrapper.nodes[0]._mutations).to.include.keys(['removeItem', 'addUser']);
  });
});
