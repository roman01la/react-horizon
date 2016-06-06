import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { HorizonProvider, HorizonRoute } from '../src/index';

export const TestComp = () => <div />;

export function Horizon({ connect, status } = {}) {
  const hz = Horizon;
  hz.watch = () => ({ subscribe: (handler) => handler(['subscription']) });
  hz.connect = connect || (() => undefined);
  hz.status = status || (() => undefined);
  return hz;
}

export function assertStatus(type) {

  const status = (onNext, onError) => onNext({ type });

  const wrapper = mount((
    <HorizonProvider instance={Horizon({ status })}>
      <HorizonRoute />
    </HorizonProvider>
  ));

  expect(wrapper.find(HorizonRoute).nodes[0].state.status).to.equal(type);
}

export function assertStatusPropCall(type, propName) {

  let called = false;
  const status = (onNext, onError) => onNext({ type });
  const handler = () => (called = true, null);
  const props = { [propName]: handler };

  const wrapper = mount((
    <HorizonProvider instance={Horizon({ status })}>
      <HorizonRoute {...props} />
    </HorizonProvider>
  ));

  expect(called).to.equal(true);
}
