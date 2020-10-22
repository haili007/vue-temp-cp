

import { export_raw } from "../../downfile"



import { compileListQuery, compileListQueryTable, compileListFuncs, compileComponets } from "../base/index"

export const compileList = (config, tempStr, tempName) => {
    var out = '';
    var queryStr = [], queryTempStr = '', tableStr = '', otherFuncTemp = '', other = [], otherFunc = [], dialogTemp = [], componetCofing = {}
    queryTempStr = compileListQuery(config, other, queryStr)
    otherFuncTemp = compileListFuncs(config, otherFunc, dialogTemp)
    tableStr = compileListQueryTable(config, other, otherFunc, dialogTemp)
    componetCofing = compileComponets(config, otherFunc, other, dialogTemp)
    let otherStr = other.join(",")
    let otherMethod = otherFunc.join(",")
    out = tempStr.replace("{{{queryTemp}}}", queryTempStr).
        replace("{{{table}}}", tableStr).
        replace("{{{query}}}", queryStr[0] ? queryStr[0] : '').
        replace("{{{url}}}", config.url).
        replace("{{{funcname}}}", config.funcname).
        replace("{{{funcname}}}", config.funcname).
        replace("{{{name}}}", config.pageName).
        replace("{{{other}}}", otherStr).
        replace("{{{title}}}", config.title).
        replace("{{{headFuncTemp}}}", otherFuncTemp).
        replace("{{{otherMethod}}}", otherMethod)
        .replace("{{{dialogTemp}}}", dialogTemp.join(""))
        .replace("{{{importcomponent}}}", componetCofing.import.join("\n\r"))
        .replace("{{{component}}}", componetCofing.componentProp.join(","))
    export_raw(tempName, out)
}

export const compile = (type, config, tempStr, tempName) => {
    compileList(config, tempStr, tempName)
}

