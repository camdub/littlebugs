import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render () {
    return (
     <html>
       <Head>
         <link rel="stylesheet" href="/static/sweetalert2.min.css" type="text/css" />
       </Head>
       <body>
         <Main />
         <NextScript />
       </body>
     </html>
    )
  }
}