import {export_raw} from "../../downfile"

export const  compileForm=(config, tempStr, tempName)=> {
    var out = '';
    var formStr = '', formTempStr = '', nameStr = ''
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
    }
    out = tempStr.replace("{{{formTemp}}}", formTempStr).replace("{{{form}}}", formStr).replace("{{{name}}}", config.pageName).replace("{{{title}}}", config.title)
    export_raw(tempName, out)
}

export const  compile=(type, config, tempStr, tempName)=>{
        compileForm(config, tempStr, tempName)
}

