"use strict";
exports.__esModule = true;
function format(coverageResponse) {
    var body = 'TN:\n';
    var coverageMap = new Map();
    coverageResponse.forEach(function (coverage) {
        var path;
        if (coverage.ApexClassOrTriggerId.startsWith('01p')) {
            path = __dirname + '/src/classes/' + coverage.ApexClassOrTrigger.Name + '.cls';
        }
        else {
            path = __dirname + '/src/triggers/' + coverage.ApexClassOrTrigger.Name + '.trigger';
        }
        if (!coverageMap.has(path)) {
            coverageMap.set(path, new Map());
        }
        coverage.Coverage.coveredLines.forEach(function (lineNo) {
            if (!coverageMap.get(path).has(lineNo)) {
                coverageMap.get(path).set(lineNo, 0);
            }
            coverageMap.get(path).set(lineNo, coverageMap.get(path).get(lineNo) + 1);
        });
        coverage.Coverage.uncoveredLines.forEach(function (lineNo) {
            if (!coverageMap.get(path).has(lineNo)) {
                coverageMap.get(path).set(lineNo, 0);
            }
        });
    });
    coverageMap.forEach(function (value, key) {
        console.log('Add coverage for ' + key + '...');
        body += 'SF:' + key + '\n';
        value.forEach(function (value, key) {
            body += 'DA:' + key + ',' + value + '\n';
        });
        body += 'end_of_record\n';
    });
    return body;
}
exports["default"] = format;
