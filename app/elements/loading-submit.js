import React from 'react';
import colors from './colors';

const SubmitButton = ({ loading, value, ...props }) => {
  // don't really like this approach but unsure how to do this with styled-jsx
  let btn;
  if (loading) {
  }

  return (
    <div>
      {loading ? (
        <input className="submit" disabled value="Submitting..." {...props} />
      ) : (
        <input className="submit" value={value} {...props} />
      )}
      <style jsx>{`
        input[type='submit'] {
          width: 100%;
          margin-top: 1em;
          border: 4px solid ${colors.text};
          padding: 0.5em;
          border-radius: 8px;
          font-size: 1.5em;
          color: ${colors.text};
          background-color: transparent;
          cursor: pointer;
        }

        input[type='submit']:disabled {
          cursor: not-allowed;
          color: ${colors.text_transparency(0.5)};
          border: 4px solid ${colors.text_transparency(0.5)};
        }
      `}</style>
    </div>
  );
};

export default SubmitButton;
