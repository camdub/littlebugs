import React from 'react';
import { saveChild } from '../app/api';
import { Flex } from 'rebass';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string, number } from 'yup';
import { RadioGroup } from '../app/elements/radio';
import { Checkbox } from '../app/elements/checkbox';
import Swal from 'sweetalert2';

export default class Waitlist extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    Swal('Oh No!', 'Let Paula know something went wrong', 'error');
  }

  handleSubmit = async values => {
    let result = await saveChild(values, 'POST');
    Swal(
      'Hooray!',
      `${result.fields['Child Name']} was added to the list!`,
      'success'
    );
  };

  render() {
    let initialValues = {
      'Parent Name': '',
      'Child Name': '',
      Email: 'cameron29w@gmail.com',
      Age: 2,
      Gender: 'Female',
      Preference: ['MW', 'TTH'],
      PreK: false,
    };

    return (
      <Flex flexDirection="column">
        <img alt="ladybug icon" src="/static/ladybug.svg" />

        <Formik
          initialValues={initialValues}
          validationSchema={object().shape({
            'Parent Name': string().required('Required'),
            Email: string()
              .email('Not a valid email')
              .required('Required'),
            'Child Name': string().required('Required'),
            Age: number()
              .min(2, 'Too young')
              .max(5, 'Too Old')
              .required('Required'),
            Gender: string().required('Required'),
            Preference: string().required('Required'),
          })}
          onSubmit={this.handleSubmit}
        >
          {({ setFieldValue, values, isValid }) => (
            <Flex as={Form} flexDirection="column" width="400px" mx="auto">
              <Field name="Parent Name" placeholder="Parent Name" />
              <ErrorMessage name="Parent Name" />
              <Field name="Email" placeholder="Email" />
              <ErrorMessage name="Email" />
              <Field name="Child Name" placeholder="Child Name" />
              <ErrorMessage name="Child Name" />
              <Field
                name="Age"
                placeholder="Age between 2 and 5"
                type="number"
              />
              <ErrorMessage name="Age" />
              <Field name="Gender">
                {({ field }) => (
                  <RadioGroup {...field}>
                    <RadioGroup.Option>Male</RadioGroup.Option>
                    <RadioGroup.Option>Female</RadioGroup.Option>
                  </RadioGroup>
                )}
              </Field>
              <Field name="Preference">
                {({ field }) => {
                  // Handle Airtable specifc fields so they can be typecast on save
                  // Preference is an Airtable multiselect so needs to be an array
                  // https://airtable.com/appDbeNzhBZ8GnE4S/api/docs
                  let fieldProps = {
                    ...field,
                    value: field.value.length === 2 ? 'Either' : field.value[0],
                    onChange: event =>
                      setFieldValue(
                        'Preference',
                        event.target.value === 'Either'
                          ? ['MW', 'TTH']
                          : [event.target.value],
                        false
                      ),
                  };
                  return (
                    <RadioGroup {...fieldProps}>
                      <RadioGroup.Option>MW</RadioGroup.Option>
                      <RadioGroup.Option>TTH</RadioGroup.Option>
                      <RadioGroup.Option>Either</RadioGroup.Option>
                    </RadioGroup>
                  );
                }}
              </Field>

              <Field name="PreK">
                {({ field }) => {
                  // PreK is an airtable boolean so needs to convert value to bool
                  let fieldProps = {
                    onChange: event =>
                      setFieldValue('PreK', event.target.checked, false),
                  };
                  return (
                    <Checkbox {...fieldProps}>
                      I am interested in Pre-K (Friday)
                      <small>
                        only children attending TK or Kindergarden next year
                      </small>
                    </Checkbox>
                  );
                }}
              </Field>
              <button type="submit" disabled={!isValid}>
                Join Waitlist
              </button>
              <pre style={{ width: '200px' }}>{JSON.stringify(values)}</pre>
            </Flex>
          )}
        </Formik>
      </Flex>
    );
  }
}
