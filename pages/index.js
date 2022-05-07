import Head from 'next/head'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { create } from 'jss'
import rtl from 'jss-rtl'
import purple from '@material-ui/core/colors/purple'
import green from '@material-ui/core/colors/green'
import { StylesProvider, jssPreset } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'

import { RegistrationForm } from '../pagesComponents/index/RegistrationForm'

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] })
const theme = createMuiTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
})

function Home({ dictionaries }) {
  const router = useRouter()
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(`/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values }),
      })
      const json = await response.json() // parses JSON response into native JavaScript objects
      setSubmitting(false)
      if (json.kid && json.rounds) {
        router.push('/thankYou')
      } else {
        console.log(json)
        throw new Error('The save operation failed: unknown response schema')
      }
    } catch (error) {
      console.error(error)
      // @@@ Falta hacer que en los errores de select y group sean en rojo también los textos
      //@@@ cambiar
      alert('קרתה שגיאה')
    }
  }

  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <Head>
            <title>Sport-Fun</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main>
            <div style={{ marginBottom: '20px' }}>
              <Image src="/logo.jpg" alt="Sport-fun" width="350" height="200" />
            </div>
            {/* <h1>ההרשמה סגורה</h1>
            <h2>לפרטים: 052-367-0576</h2> */}
            <RegistrationForm
              dictionaries={dictionaries}
              onSubmit={handleSubmit}
            />
          </main>

          <style jsx>{`
            main {
              padding: 5rem 0;
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }

            a {
              color: inherit;
              text-decoration: none;
            }

            .title a {
              color: #0070f3;
              text-decoration: none;
            }

            .title a:hover,
            .title a:focus,
            .title a:active {
              text-decoration: underline;
            }

            .title {
              margin: 0;
              line-height: 1.15;
              font-size: 4rem;
              text-align: center;
            }
          `}</style>

          <style jsx global>{`
            html,
            body {
              padding: 0;
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                sans-serif;
            }

            * {
              box-sizing: border-box;
            }
          `}</style>

          {/* Material UI overrides */}
          <style jsx global>
            {`
              .MuiFormHelperText-root {
                font-size: 1rem !important;
                color: #f44336;
              }
            `}
          </style>
        </Container>
      </ThemeProvider>
    </StylesProvider>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(
    `https://summer-camp-manager.herokuapp.com/api/dictionaries`,
  )
  const dictionaries = await res.json()

  // Pass data to the page via props
  return { props: { dictionaries } }
}

export default Home
