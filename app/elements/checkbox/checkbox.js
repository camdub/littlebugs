import React from 'react';

export class Checkbox extends React.Component {
  render() {
    return (
      <label onClick={this.props.onChange} htmlFor={this.props.name}>
        <input type="checkbox" onChange={this.props.onChange} />
        <span />
        {this.props.children}
      </label>
    );
  }
}
