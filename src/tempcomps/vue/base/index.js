import { funcOptionsmap, funcstemp } from "./funcstemp"
import { batchExamineDiglogTempStr, examineDiglogTempStr } from "./examinediglogTemp"

export const compileListQuery = (config, other,queryStrArr) => {
    var queryStr = '', queryTempStr = '';
    for (var i = 0; i < config.query.length; i++) {
        if (config.query[i].prop) {
            queryStr += config.query[i].prop + ':\'\','
        }
        queryTempStr += `
                    <el-form-item label="${config.query[i].label}">`
        if (config.query[i].component == 'el-date-picker') {
            queryTempStr += ` <el-date-picker clearable size="mini" value-format="timestamp" v-model="times" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>`
        } else {
            queryTempStr += `<${config.query[i].component}
                            v-model="form.${config.query[i].prop}"
                            placeholder="${config.query[i].placeholder}"
                            clearable filterable collapse-tags
                            size="mini"
                        >`
            if (config.query[i].component == 'el-select') {
                var opts = []
                for (var l = 0; l < config.query[i].opstions.data.length; l++) {
                    var obj = {}
                    for (var j = 0; j < config.query[i].opstions.data[l].length; j++) {
                        obj[config.query[i].opstions.data[l][j].key] = config.query[i].opstions.data[l][j].value
                    }
                    opts.push(obj)
                }
                other.push(config.query[i].opstions.name + ':' + JSON.stringify(opts))
                queryTempStr += `
                        <el-option v-for="(item, index) in ${config.query[i].opstions.name}" :key="index" :value="${config.query[i].selectVal}" :label="${config.query[i].selectViewVal}"></el-option>
                        `
            }
            queryTempStr += `</${config.query[i].component}>`
        }
        queryTempStr += `</el-form-item>
                     `
    }
    queryStrArr[0]=queryStr
    return queryTempStr
}
export const compileListQueryTable = (config, other, otherFunc, dialogTemp) => {
    let tableStr = ''
    for (var i = 0; i < config.list.length; i++) {
        tableStr += `
                    <el-table-column
                        type="${config.list[i].type}"    
                        prop="${config.list[i].prop}"
                        label="${config.list[i].label}"
                        width="${config.list[i].width}"
                        show-overflow-tooltip
                        header-align="center"
                        align="center"
                        size="mini"
                        >`
        if (config.list[i].type == 'opp') {
            tableStr += ` <template slot-scope="scope"> `
            for (let j = 0; j < config.list[i].opps.length; j++) {
                tableStr += `<el-button size="mini" type="text" @click="${config.list[i].opps[j].func}(scope.row)" >${config.list[i].opps[j].label}</el-button>`
                otherFunc.push(funcstemp[config.list[i].opps[j].func])
                if (config.list[i].opps[j].func == 'showExamineDiglog') {
                    dialogTemp.push(examineDiglogTempStr)
                }
            }
            tableStr += ` </template>`
        }
        tableStr += `
                    </el-table-column>
                    `

    }
    return tableStr
}
export const compileListFuncs = (config, otherFunc, dialogTemp) => {
    let btnarr = []

    for (var i = 0; i < config.funcs.length; i++) {
        if(config.funcs[i] == 'handleImport'){
            btnarr.push(
                `
                <el-upload
                style="width:126px;height:32px;overflow:hidden;display:inline-block;vertical-align: -13px;"
                name="file"
                action="/opsmanager/kzmgr/banlance/adjust/uploadExcel"
                :on-success="handleImport"
                :on-error="handleImport"
              >
                <el-button style="float:left" size="mini" type="primary">导入</el-button>
              </el-upload>  
              `
            )
        }else{
            btnarr.push(`
            <el-button size="mini" type="primary" @click="${config.funcs[i]}">${funcOptionsmap[config.funcs[i]]}</el-button>
            `)
        }
        
        otherFunc.push(
            funcstemp[config.funcs[i]]
        )
        if (config.funcs[i] == 'showBatchExamineDiglog') {
            dialogTemp.push(batchExamineDiglogTempStr)
        }
    }
    let otherFuncTemp = `
        <el-row>
            <div>
                <div  style="float:left;">
                    ${btnarr.join('')}
                </div>
                <div class="right" style="float:right;">
                    <el-button size="mini" type="primary" @click="handleExport">导出</el-button>
                </div>
            </div>
        </el-row>
    `
    return otherFuncTemp
}
function titleCase(s) {
	var i, ss = s.toLowerCase().split('-');
	for (i = 0; i < ss.length; i++) {
		ss[i] = ss[i].slice(0, 1).toUpperCase() + ss[i].slice(1);
	}
	return ss.join('');
}
export const  compileComponets = (config,otherFunc,other,dialogTemp)=>{
    //1.导入 2.组件注册 3.组件模板 4.显示关闭方法 5.变量加名称
    var obj={import:[],componentProp:[]}
    for (var i = 0; i < config.components.length; i++) {
        if(config.components[i].name){
            var compname=titleCase(config.components[i].name)
            obj.import.push(`// import ${compname} from ${compname} \n\r`)
            obj.componentProp.push(compname)
            other.push(`${compname}Visable:false`)
            // import componentProp
            var str=compname
            str=str.replace(str[0],str[0].toLowerCase())
            otherFunc.push(
                `handle${compname}Active() {
                    this.${str}Visible = true
                },
                handle${compname}Close() {
                    this.${str}Visible = false
                }`
            )
            dialogTemp.push(`<${config.components[i].name} :visable="${str}Visible"></${config.components[i].name}>`)
        }
    }
    return obj
}