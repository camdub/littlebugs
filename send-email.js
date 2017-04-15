import 'isomorphic-fetch';

const url = 'https://api.postmarkapp.com/email/withTemplate';

export default async (name, email) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Postmark-Server-Token': POSTMARK_API_KEY
    },
    body: JSON.stringify({
      TemplateId: 1506622,
      TemplateModel: {
        name: name
      },
      From: 'paula@rgang.net',
      To: email
    })
  });
  const json = await res.json();
  if (json.ErrorCode !== 0) {
    return false;
  }
  return true;
};