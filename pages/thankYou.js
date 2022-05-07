import Head from 'next/head'
import Image from 'next/image'
import { Container } from '@material-ui/core'

const ThankYou = () => {
  return (
    <Container maxWidth="sm">
      <Head>
        <title>Sport-Fun</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '20px' }}>
          <Image src="/logo.jpg" alt="Sport-fun" width="350" height="200" />
        </div>

        <h1 style={{ marginTop: '50px', color: 'green' }}>
          ההרשמה בוצעה בהצלחה.
        </h1>
        <h3 style={{ color: 'violet' }}>
          צוות ספורטפאן יהיה עמכם בקשר לביצוע תשלום והמשך הליך הרישום.
        </h3>
      </main>
    </Container>
  )
}

export default ThankYou
