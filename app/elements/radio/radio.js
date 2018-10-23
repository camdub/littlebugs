import React from "react";
import invariant from "invariant";

class RadioOption extends React.Component {
  static displayName = "RadioGroup.Option";

  render() {
    let { name, children: value, checked, onChange } = this.props;

    return (
      <>
        <label htmlFor={name} onChange={onChange}>
          {value}
          <input
            type="radio"
            name={name}
            value={value}
            checked={checked}
            readOnly
          />
        </label>
      </>
    );
  }
}

export class RadioGroup extends React.Component {
  static Option = RadioOption;

  render() {
    let { name, value, onChange, children } = this.props;

    return React.Children.map(children, child => {
      invariant(
        child.type.displayName === RadioOption.displayName,
        "You must render a `<RadioGroup.Option>` inside `<RadioGroup>`"
      );

      return React.cloneElement(child, {
        name,
        onChange,
        checked: value === child.props.children
      });
    });
  }
}
