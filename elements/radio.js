import React from 'react';
import colors from './colors';

export default ({ children, onChange, ...props }) => {
  const handleChange = evt => {
    const target = evt.currentTarget;

    if (target.localName === 'label') {
      onChange(target.children[0]);
    } else {
      onChange(evt.currentTarget)
    }
  };

  return (
    <label onClick={handleChange} htmlFor={props.name}>{children}
      <input type="radio" onChange={onChange} {...props} />
      <div className="indicator"></div>
      <style jsx>{`
        label {
          display: block;
          cursor: pointer;
          position: relative;
          font-size: 1.2em;
          color: ${colors.text};
          padding-left: 42px;
          line-height: 2em;
          margin-right: 20px;
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
          border-radius: 50%;
        }
        .indicator:after {
          position: absolute;
          display: none;
          content: '';
          top: 10px;
          left: 10px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: ${colors.text}
        }

        input:checked ~ .indicator:after {
          display: block;
        }
      `}</style>
    </label>
  );
};