import Head from 'next/head';
import React from 'react';
import send from '../send-email';
import Checkbox from '../elements/checkbox';
import Radio from '../elements/radio';
import colors from '../elements/colors';
import Submit from '../elements/loading-submit';

let swal = undefined;
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  swal = require('sweetalert2');
}

export default class Waitlist extends React.Component {
  state = {
    loading: false,
    fields: {
      'Child Name': '',
      'Parent Name': '',
      'Age': null,
      'Email': '',
      'Gender': 'Male',
      'Preference': ['MW', 'TH'],
      'PreK': false,
    }
  };

  onSubmit = async evt => {
    evt.preventDefault();
    this.setState({ loading: true });

    const data = {
      ...this.state.fields,
      'Date Added': new Date()
    }

    try {
      const url = 'https://api.airtable.com/v0/appDbeNzhBZ8GnE4S/Waitlist';
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`
        },
        body: JSON.stringify({ fields: data, typecast: true })
      });
      const json = res.json();

      await send(data['Child Name'], data.Email);
    }
    catch(err) {
      swal('Oops...', 'Something went wrong', 'error')
    }
    finally {
      this.setState({ loading: false })
    }

    swal('Success!', 'Look out for an email with more details', 'success')
  }

  /**
   * @param (Event | HTMLElement)
   */
  onChange = evt => {
    const target = evt instanceof HTMLElement ? evt : evt.currentTarget;
    const { fields } = this.state;

    let value = target.value;
    // Handle Airtable specifc fields so they can be typecast on save
    // https://airtable.com/appDbeNzhBZ8GnE4S/api/docs
    if (target.name === 'Preference')
      value = target.value === 'None' ? ['MW', 'TH'] : [target.value];
    else if (target.name === 'PreK')
      value = !target.checked;

    this.setState({
      fields: {
        ...fields,
        [target.name]: value,
      }
    })
  }

  isPreferenceChecked = val => {
    if (this.state.fields.Preference.length === 2) return true;
    return this.state.fields.Preference.indexOf(val) !== -1;
  }

  render() {
    const { fields } = this.state;

    return (
      <div className="container">
        <img src="/static/ladybug.svg" />
        <Head>
          <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <form onSubmit={this.onSubmit}>
          <label className="fieldLabel" htmlFor="Parent Name">Your Name</label>
          <input
            type="text"
            required
            name="Parent Name"
            onChange={this.onChange}
            value={fields['Parent Name']}
          />

          <label className="fieldLabel" htmlFor="Email">Email</label>
          <input
            type="email"
            required
            name="Email"
            onChange={this.onChange}
            value={fields['Email']}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$"
          />

          <label className="fieldLabel" htmlFor="Child Name">Child's Name</label>
          <input
            type="text"
            required
            name="Child Name"
            onChange={this.onChange}
            value={fields['Child Name']}
          />

          <label className="fieldLabel" htmlFor="Age">Child's Age</label>
          <input
            type="number"
            required
            min="0"
            max="5"
            maxLength="1"
            name="Age"
            onChange={this.onChange}
            value={fields["Age"] ? fields["Age"] : ''}
          />

          <div className="fieldLabel">Gender</div>
          <div className="radioRow">
            <Radio
              name="Gender"
              value="Male"
              required
              onChange={this.onChange}
              checked={fields.Gender === 'Male'}
            >
              Male
            </Radio>
            <Radio
              name="Gender"
              value="Female"
              required
              onChange={this.onChange}
              checked={fields.Gender === 'Female'}
            >
              Female
            </Radio>
          </div>

          <div className="fieldLabel">Day Preference</div>
          <div className="radioRow">
            <Radio
              name="Preference"
              value="MW"
              checked={this.isPreferenceChecked("MW")}
              onChange={this.onChange}
            >
              Mon / Wed
            </Radio>
            <Radio
              name="Preference"
              value="TTH"
              checked={this.isPreferenceChecked("TTH")}
              onChange={this.onChange}
            >
              Tue / Thurs
            </Radio>
            <Radio
              name="Preference"
              value="None"
              checked={this.isPreferenceChecked("")}
              onChange={this.onChange}
            >
              Either
            </Radio>
          </div>

          <Checkbox name="PreK" value="PreK" checked={fields['PreK']} onChange={this.onChange}>
            I am interested in Pre-K (Friday) <small>only children attending TK or Kindergarden next year</small>
          </Checkbox>

          <Submit type="submit" value="Join Waitlist" loading={this.state.loading} />
        </form>
        <style jsx>{`
          .watermark {
            position: absolute;
            bottom: 0;
            text-align: center;
            max-width: 30em;
            padding-bottom: 20px;
            color: ${colors.bg2};
          }
          .container {
            display: flex;
            flex-direction: column;
            margin: 0 auto;
            max-width: 30rem;
            padding-left: 1.5rem;
            padding-right: 1.5rem;
            margin-left: auto;
            margin-right: auto;
          }
          small {
            display: block;
            color: ${colors.bg2} !important;
          }

          form {
            display: flex;
            flex-direction: column;
          }
          input[type=number]::-webkit-inner-spin-button,
          input[type=number]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          ::-moz-selection { /* Code for Firefox */
            border: 1px solid ${colors.text};
          }

          :global(input:focus) {
            border: 1px solid ${colors.text};
          }

          .fieldLabel {
            margin: 20px 0 5px 0;
            color: ${colors.text};
            font-size: 0.8em;
            font-weight: 300;
          }

          input[type=text], input[type=number], input[type=email] {
            border: none;
            border-bottom: 3px solid ${colors.text};
            background: transparent;
            border-radius: 2px;
            line-height: 2em;
            font-size: 1.2em;
            padding-left: 20px;
            font-family: 'Lato', sans-serif !important;
            outline: none;
          }

          :global(html) {
            background-color: ${colors.bg};
            font-family: 'Lato', sans-serif !important;
          }
          .radioRow {
            display: flex;
            flex-direction: row;
          }

          @media (max-width: 500px) {
            .radioRow {
              flex-direction: column;
            }
          }
        `}</style>
      </div>
    );
  }
}
