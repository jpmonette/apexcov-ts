import { ApexCodeCoverage } from './tsforce/tsforce'

export default function format(coverageResponse: Array<ApexCodeCoverage>): string {
  let body = 'TN:\n'

  let coverageMap: Map<String, Map<number, number>> = new Map<String, Map<number, number>>()

  coverageResponse.forEach((coverage) => {
    let path: string

    if (coverage.ApexClassOrTriggerId.startsWith('01p')) {
      path = __dirname + '/src/classes/' + coverage.ApexClassOrTrigger.Name + '.cls'
    } else {
      path = __dirname + '/src/triggers/' + coverage.ApexClassOrTrigger.Name + '.trigger'
    }

    if (!coverageMap.has(path)) {
      coverageMap.set(path, new Map<number, number>())
    }

    coverage.Coverage.coveredLines.forEach((lineNo) => {
      if (!coverageMap.get(path).has(lineNo)) {
        coverageMap.get(path).set(lineNo, 0)
      }
      coverageMap.get(path).set(lineNo, coverageMap.get(path).get(lineNo) + 1)
    })

    coverage.Coverage.uncoveredLines.forEach((lineNo) => {
      if (!coverageMap.get(path).has(lineNo)) {
        coverageMap.get(path).set(lineNo, 0)
      }
    })
  })

  coverageMap.forEach((value, key) =>  {
    console.log('Add coverage for ' + key + '...')

    body += 'SF:' + key + '\n'

    value.forEach((value, key) =>  {
      body += 'DA:' + key + ',' + value + '\n'
    })
    body += 'end_of_record\n'
  })

  return body
}