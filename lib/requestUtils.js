import Wreck from '@hapi/wreck'

import { Logger } from './logger'

const getRequestOption = ({ method, body, mockHeader }) => {
  const requestOptions = {
    method,
    gunzip: true,
    json: true,
    headers: {
      ...mockHeader,
    },
    rejectUnauthorized: false, // The service's certificate is self-signed
  }
  if (method === 'POST' || method === 'PUT') {
    requestOptions.payload =
      typeof body === 'string' ? body : JSON.stringify(body || {})
    requestOptions.headers['Content-Type'] = 'application/json'
  }

  return requestOptions
}

const parseResponse = async (options, response, componentName, url) => {
  try {
    const body = await Wreck.read(response, options)

    Logger.info(`Got response from ${componentName}`)

    return body
  } catch (error) {
    Logger.error(`Could not read the ${componentName}, error: ${error.message}`)

    throw error
  }
}

const fetchFromComponent = async ({
  componentName = 'nextJs',
  url,
  method = 'GET',
  body,
  mockHeader = {},
}) => {
  Logger.info(`Calling ${url}`)

  const requestOptions = getRequestOption({
    method,
    body,
    mockHeader,
  })
  const response = await Wreck.request(method, url, requestOptions)
  return parseResponse(requestOptions, response, componentName, url)
}

export { fetchFromComponent }
