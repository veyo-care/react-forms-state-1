'use babel'
// @flow

import React from 'react';
import { fromJS, is } from "immutable";

export default function FormController(
  applyControl = state => state,
  convertIn = value => value,
  convertOut = value => value
): () => React.Component<any, any, any> {
  return function(WrappedComponent: React.Component<any, any, any>): React.Component<any, any, any> {
    return class Controller extends React.Component {
      constructor(props) {
        super();
        this.state = this._getInitialValue(props);
      }

      componentWillReceiveProps(nextProps) {
        if (!is(fromJS(this._getInitialValue(nextProps)), fromJS(this._getInitialValue(this.props))))
          this.setState(this._getInitialValue(nextProps));
      }

      _getInitialValue(props) {
        let v = typeof props.initial != 'function' ? props.initial : props.initial(props);
        return convertIn(v);
      }

      render() {
        return (
          <WrappedComponent
            onChange={value => this.setState(applyControl(value))}
            value={this.state}
            onSubmit={() => this.props.onSubmit(convertOut(this.state))}
            {...fromJS(this.props).remove('onSubmit').remove('initial').toJS()}
          />
        );
      }
    };
  };
}