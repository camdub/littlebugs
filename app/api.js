import 'isomorphic-unfetch';

export let saveChild = async values => {
  let url = 'https://api.airtable.com/v0/appDbeNzhBZ8GnE4S/Waitlist';
  let res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
    },
    body: JSON.stringify({ fields: values, typecast: true }),
  });
  let data = await res.json();
  await sendConfirmationEmail(data.fields['Child Name'], data.fields.Email);
  return data;
};

let sendConfirmationEmail = async (name, email) => {
  // postmark does not allow cors requests, use a free proxy for now
  let proxy = 'https://cors-anywhere.herokuapp.com';
  let url = 'https://api.postmarkapp.com/email/withTemplate';
  let res = await fetch(`${proxy}/${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Postmark-Server-Token': process.env.POSTMARK_API_KEY,
    },
    body: JSON.stringify({
      TemplateId: 1506622,
      TemplateModel: {
        name: name,
      },
      From: 'paula@rgang.net',
      To: email,
    }),
  });
  const json = await res.json();
  if (json.ErrorCode !== 0) {
    throw new Error(`Postmark: ${json.ErrorCode} - ${json.Message}`);
  }
  return json.SubmittedAt;
};
