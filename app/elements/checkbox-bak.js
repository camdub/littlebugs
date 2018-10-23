import React from 'react';
import colors from './colors';

export default ({ children, onChange, ...props }) => {
  const handleChange = evt => {
    const target = evt.currentTarget;

    if (target.localName === 'label') {
      onChange(target.children[1]);
    } else {
      onChange(evt.currentTarget);
    }
  };

  return (
    <label onClick={handleChange} htmlFor={props.name}>
      {children}
      <input type="checkbox" onChange={onChange} {...props} />
      <div className="indicator" />
      <style jsx>{`
        label {
          display: block;
          cursor: pointer;
          position: relative;
          font-size: 1.2em;
          color: ${colors.text};
          padding-left: 42px;
          margin-right: 20px;
          margin-top: 20px;
          margin-bottom: 5px;
        }

        input {
          position: absolute;
          z-index: -1;
          opacity: 0;
        }

        .indicator {
          position: absolute;
          top: 2px;
          left: 0;
          width: 32px;
          height: 32px;
          background: ${colors.bg2};
        }
        .indicator:after {
          position: absolute;
          display: none;
          content: '';
          top: 2px;
          left: 10px;
          width: 8px;
          height: 18px;
          transform: rotate(45deg);
          border: solid ${colors.text};
          border-width: 0 4px 4px 0;
        }

        input:checked ~ .indicator:after {
          display: block;
        }
      `}</style>
    </label>
  );
};
