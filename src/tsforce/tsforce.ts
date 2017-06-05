import * as fetch from 'node-fetch'
import * as url from 'url'
import { Token } from './oauth2'

export class Force {
  token: Token

  constructor(token: Token) {
    this.token = token
  }

  /**
   * Creating a HTTP request
   * @param  {string} method HTTP verb
   * @param  {string} path   Path to ressource
   * @return {fetch.Request}
   */
  newRequest(method: string, path: string) :fetch.Request {
    let req = new fetch.Request('https://' + this.token.instance_url + path, {
      method,
      headers: {
        'Authorization': 'Bearer ' + this.token.access_token,
        'Content-Type': 'application/json',
      }
    })
    return req
  }

  /**
   * Executing an HTTP request
   * @param  {fetch.Request} request HTTP Request to execute
   * @return {Promise<fetch.Response>}
   */
  async do(request: fetch.Request) :Promise<fetch.Response> {
    let response: fetch.Response = await fetch(request)
    return response
  }

  /**
   * Getting Code Coverage from the Salesforce instance
   * @return Promise<Array<ApexCodeCoverage>>
   */
  async getCoverage() :Promise<Array<ApexCodeCoverage>> {
    let query = encodeURIComponent('SELECT ApexTestClass.Name, ApexTestClassId, TestMethodName, NumLinesUncovered, NumLinesCovered, ApexClassorTrigger.Name, ApexClassOrTriggerId, Coverage FROM ApexCodeCoverage ORDER BY ApexClassOrTrigger.Name ASC, ApexTestClass.Name ASC, TestMethodName ASC')
    let request = this.newRequest('GET', '/services/data/v39.0/tooling/query?q=' + query)
    let response = await this.do(request)
    let body = await response.json()
    return body.records
  }

}

export interface ApexCodeCoverage {
  ApexClassOrTrigger: ApexClass
  ApexClassOrTriggerId: string
  ApexTestClass: ApexClass
  Coverage: Coverage
  NumLinesUncovered: number
  NumsLinesCovered: number
  TestMethodName: string
}

interface ApexClass {
  Name: string
}

interface Coverage {
  coveredLines: Array<number>
  uncoveredLines: Array<number>
}