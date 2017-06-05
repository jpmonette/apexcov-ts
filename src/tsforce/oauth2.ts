import * as fetch from 'node-fetch'
import * as url from 'url'

const SESSION_ID_RE = /<sessionId>([\s\S]*?)<\/sessionId/
const SERVER_URL_RE = /<serverUrl>([\s\S]*?)<\/serverUrl/
const FAULT_STRING_RE = /<faultstring>([\s\S]*?)<\/faultstring/

export default class OAuth2 {

  /**
   * Authenticating User to the Salesforce instance
   * @param  {string} instance URL to the Salesforce Instance
   * @param  {string} username Salesforce Username
   * @param  {string} password Salesforce Password
   * @return {Promise<Token>}
   */
  async auth(instance: string, username: string, password: string) :Promise<Token> {
    let options: fetch.RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml',
        'SOAPAction': 'login'
      }
    }

    options.body = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
              xmlns:urn="urn:partner.soap.sforce.com">
            <soapenv:Body>
              <urn:login>
                  <urn:username>${username}</urn:username>
                  <urn:password>${password}</urn:password>
              </urn:login>
            </soapenv:Body>
        </soapenv:Envelope>`

    let response:fetch.Response = await fetch(instance + '/services/Soap/u/39.0', options)
    let body = await response.text()

    if (!response.ok) {
      throw Error(FAULT_STRING_RE.exec(body)[1])
    }

    return {
      access_token: SESSION_ID_RE.exec(body)[1],
      instance_url: url.parse(SERVER_URL_RE.exec(body)[1]).hostname
    }
  }

}

export interface Token {
    access_token: string
    instance_url: string
}

