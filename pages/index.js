import React from 'react';
import send from '../send-email';

export default class Waitlist extends React.Component {
  state = {
    loading: false,
    fields: {
      'Child Name': 'C',
      'Parent Name': 'C',
      'Age': 2,
      'Email': 'paula@rgang.net',
      'Gender': 'Male',
      'Preference': ['MW'],
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
    this.setState({ loading: false });

    send(data['Child Name'], data.Email);
  }

  onChange = evt => {
    const target = evt.currentTarget;
    const { fields } = this.state;

    let value = target.value;
    // Handle Airtable specifc fields so they can be typecast on save
    // https://airtable.com/appDbeNzhBZ8GnE4S/api/docs
    if (target.name === 'Preference')
      value = target.checked
        ? [ ...fields[target.name], target.value ]
        : fields[target.name].filter(p => p !== target.value);
    else if (target.name === 'PreK')
      value = target.checked;

    this.setState({
      fields: {
        ...fields,
        [target.name]: value,
      }
    })
  }

  isPreferenceChecked = val => {
    return this.state.fields.Preference.indexOf(val) !== -1;
  }

  render() {
    const { fields } = this.state;

    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <label htmlFor="Parent Name">Your Name</label>
          <input
            type="text"
            required
            name="Parent Name"
            onChange={this.onChange}
            value={fields['Parent Name']}
          />

          <label htmlFor="Email">Email</label>
          <input
            type="email"
            required
            name="Email"
            onChange={this.onChange}
            value={fields['Email']}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$"
          />

          <label htmlFor="Child Name">Child's Name</label>
          <input
            type="text"
            required
            name="Child Name"
            onChange={this.onChange}
            value={fields['Child Name']}
          />

          <label htmlFor="Age">Child's Age</label>
          <input
            type="number"
            required
            min="0"
            max="5"
            maxLength="1"
            name="Age"
            onChange={this.onChange}
            value={fields["Age"]}
          />

          <label htmlFor="Gender">Gender</label>
          <input
            type="radio"
            name="Gender"
            value="Male"
            required
            onChange={this.onChange}
            checked={fields.Gender === 'Male'}
          />Male
          <input
            type="radio"
            name="Gender"
            value="Female"
            required
            onChange={this.onChange}
            checked={fields.Gender === 'Female'}
          />Female

          <label htmlFor="Preference">Day Preference</label>
          <input
            type="checkbox"
            name="Preference"
            value="MW"
            checked={this.isPreferenceChecked("MW")}
            onChange={this.onChange}
          />Monday/Wednesday
          <input
            type="checkbox"
            name="Preference"
            value="TTH"
            checked={this.isPreferenceChecked("TTH")}
            onChange={this.onChange}
          />Tuesday/Thursday

          <label htmlFor="PreK">I am interested in Pre-K (Friday) <small>only kids attending public school following year</small></label>
          <input type="checkbox" name="PreK" value="PreK" checked={fields['PreK']} onChange={this.onChange} />

          <input type="submit" value="Sign Up!" />
        </form>
        <style jsx>{`
          .container {
            display: flex;
            margin: 0 auto;
            width: 30%;
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

          input:valid {
            color: green;
          }

          input:invalid {
            color: red;
          }
        `}</style>
      </div>
    );
  }
}
