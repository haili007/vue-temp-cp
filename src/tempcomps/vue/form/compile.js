import { export_raw } from "../../downfile"

import { compileComponets } from "../base/index"


export const compileForm = (config, tempStr, tempName) => {
    var out = '';
    var formStr = '', formTempStr = '', rules = [], comps = [], other = [], otherFunc = [], dialogTemp = [], componetCofing = {};
    for (var i = 0; i < config.form.length; i++) {
        formStr += config.form[i].prop + ':\'\','
        formTempStr += `
                    <el-form-item label="${config.form[i].label}">
                        <${config.form[i].component}
                            v-model="form.${config.form[i].prop}"
                            placeholder="${config.form[i].placeholder}"
                            size="mini"
                        ></${config.form[i].component}>
                    </el-form-item>
                    `
        rules.push(
            `${config.form[i].prop}: [{ required: true, message: '${config.form[i].label}必填', trigger: ['change', 'blur'] }]`
        )
    }
    componetCofing = compileComponets(config, otherFunc, other, dialogTemp)
    let otherStr = other.join(",")
    let otherMethod = otherFunc.join(",")
    out = tempStr.replace("{{{formTemp}}}", formTempStr)
    .replace("{{{form}}}", formStr)
    .replace("{{{name}}}", config.pageName)
    .replace("{{{title}}}", config.title)
    .replace('{{{rules}}}', rules.join(","))
    .replace("{{{other}}}", otherStr)
    .replace("{{{otherMethod}}}", otherMethod)
    .replace("{{{dialogTemp}}}", dialogTemp.join(""))
    .replace("{{{importcomponent}}}", componetCofing.import.join("\n\r"))
    .replace("{{{component}}}", componetCofing.componentProp.join(","))
    export_raw(tempName, out)
}

export const compile = (type, config, tempStr, tempName) => {
    compileForm(config, tempStr, tempName)
}

