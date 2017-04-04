import React from 'react';
import { shallow, mount } from 'enzyme';
import StateInjector from './StateInjector';
import Rx from 'rxjs';
import { INITIAL_CHANGE_EVENT_TYPE } from './FormController';

describe('StateInjector', () => {

  class Context extends React.Component {
    getChildContext() {
      return {
        rootValueChangeObs: this.props.obs,
        statePath: "test",
        completeStatePath: "test",
      };
    }

    render() {
      return React.cloneElement(this.props.children);
    }
  }

  Context.childContextTypes = {
    rootValueChangeObs: React.PropTypes.any,
    statePath: React.PropTypes.any,
    completeStatePath: React.PropTypes.any,
  };


  it('should update when statePath is "infos" and watchPath "infos.name"', (done) => {
    const obs = Rx.Observable.of({
      statePath: 'infos',
      value: 'salut'
    })
    let spy = jest.fn(() => (
      <div>

      </div>
    ));
    let subject = mount(
      <Context obs={obs}>
        <StateInjector watchPath="infos.name">
          {spy}
        </StateInjector>
      </Context>
    );

    obs.subscribe(e => {
      expect(spy.mock).toMatchSnapshot();
      done();
    });
  });

  it('should update when statePath is "infos.name" and watchPath "infos"', (done) => {
    const obs = Rx.Observable.of({
      statePath: 'infos.name',
      value: 'salut'
    })
    let spy = jest.fn(() => (
      <div>

      </div>
    ));
    let subject = mount(
      <Context obs={obs}>
        <StateInjector watchPath="infos">
          {spy}
        </StateInjector>
      </Context>
    );

    obs.subscribe(e => {
      expect(spy.mock).toMatchSnapshot();
      done();
    });
  });

  it('should not update when statePath is "infos.name" and watchPath "name"', (done) => {
    const obs = Rx.Observable.of({
      statePath: 'infos.name',
      value: 'salut'
    })
    let spy = jest.fn(() => (
      <div>

      </div>
    ));
    let subject = mount(
      <Context obs={obs}>
        <StateInjector watchPath="name">
          {spy}
        </StateInjector>
      </Context>
    );

    obs.subscribe(e => {
      expect(spy.mock).toMatchSnapshot();
      done();
    });
  });

  it("should throw if children isn't a function", () => {
    const obs = Rx.Observable.of({
      statePath: 'infos.name',
      value: 'salut'
    })
    expect(() => mount(
      <Context obs={obs}>
        <StateInjector watchPath="age">
          <div>

          </div>
        </StateInjector>
      </Context>
    )).toThrowErrorMatchingSnapshot();
  });

  it('should accept a function as watchPath taking current statePath as parameter', (done) => {
    const obs = Rx.Observable.of({
      statePath: 'infos',
      value: 'salut'
    })
    let spy = jest.fn(() => (
      <div>

      </div>
    ));
    let watchSpy = jest.fn((currentStatePath) => `${currentStatePath}.newPath`);
    let subject = mount(
      <Context obs={obs}>
        <StateInjector watchPath={watchSpy}>
          {spy}
        </StateInjector>
      </Context>
    );

    obs.subscribe(e => {
      expect(spy.mock).toMatchSnapshot();
      expect(watchSpy.mock).toMatchSnapshot();
      done();
    });
  });

  it('should handle initial change', (done) => {
    const obs = Rx.Observable.of({
      value: 'salut',
      type: INITIAL_CHANGE_EVENT_TYPE
    })
    let spy = jest.fn(() => (
      <div>

      </div>
    ));
    let subject = mount(
      <Context obs={obs}>
        <StateInjector watchPath="infos">
          {spy}
        </StateInjector>
      </Context>
    );

    obs.subscribe(e => {
      expect(spy.mock).toMatchSnapshot();
      done();
    });
  });
});