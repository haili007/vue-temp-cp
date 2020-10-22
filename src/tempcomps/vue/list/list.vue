<template>
<div>
    <span class="seting">
        <i @click="seting" class="el-icon-setting"></i>
    </span>
    <div style="margin: 10px 0;">
        <el-form label-width="100px" inline>
            <template v-for="item in config.query">
                <el-form-item :key="item.id" :label="item.label">
                    <component :placeholder="item.placeholder" size="mini" :is="item.component"></component>
                </el-form-item>
            </template>
            <el-form-item>
                <el-button size="mini" type="primary">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button size="mini">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div style="margin: 10px 0;">
        <el-table ref="grid" height="200px" :data="config.data" border size="mini">
            <template v-for="item in config.list">
                <el-table-column :key="item.id" :label="item.label" prop="[item.prop]" type="item.type" header-align="center" align="center"> </el-table-column>
            </template>
        </el-table>
    </div>

    <el-dialog title="设置" :visible.sync="dialogVisible" width="80%" :before-close="handleClose">
        <el-row style="padding-bottom:5px ;">
            页面标题：<el-input size="mini" style="width: 200px;" v-model="config.title"></el-input>
            组件名称：<el-input size="mini" style="width: 200px;" v-model="config.pageName"></el-input>
            <el-switch
            v-model="config.isDialog"
            active-color="#13ce66"
            active-text='是否弹框'
            inactive-color="#ff4949">
            </el-switch>
        </el-row>
        <el-row style="padding-bottom:5px ;">
            页面组件：<el-input v-for="(item,index) in config.components" :key = "index" size="mini" style="width: 100px;" v-model="item.name"></el-input>
            <el-button type="primary" size="mini" @click="config.components.push({name:''})" icon="el-icon-circle-plus-outline"></el-button>
        </el-row>
        <el-row>
            列表数据方法名称：<el-input size="mini" style="width: 200px;" v-model="config.funcname"></el-input>
            方法url：<el-input size="mini" style="width: 200px;" v-model="config.url"></el-input>
        </el-row>
        <el-row>
            页面功能：<el-select v-model="config.funcs" multiple size="mini" clearable collapse-tags style="margin-left: 20px;" placeholder="请选择">
                <el-option v-for="item in funcOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-row>
        <el-divider>查询条件设置</el-divider>
        <el-row>
            <el-button @click="addItem('query')" type="primary">添加一项</el-button>
        </el-row>
        <el-table height="200px" :data="config.query" border size="mini">
            <el-table-column type="index" label="序号" width="50" header-align="center" align="center">
            </el-table-column>
            <el-table-column label="label名" width="140" header-align="center" align="center" size="mini">
                <template slot-scope="scope">
                    <el-input style="width: 120px;" size="mini" v-model="scope.row.label"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="placeholder" width="140" header-align="center" align="center" size="mini">
                <template slot-scope="scope">
                    <el-input style="width: 120px;" size="mini" v-model="scope.row.placeholder"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="组件类型" width="140" header-align="center" align="center" size="mini">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.component" style="width: 110px;" size="mini" placeholder="请选择">
                        <el-option label="输入框" value="el-input">
                        </el-option>
                        <el-option label="选择框" value="el-select">
                        </el-option>
                        <el-option label="日期框" value="el-date-picker">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="绑定属性" width="140" header-align="center" align="center" size="mini">
                <template slot-scope="scope">
                    <el-input style="width: 120px;" size="mini" v-model="scope.row.prop">
                    </el-input>
                </template>
            </el-table-column>

            <el-table-column label="选择框子数据列表" show-overflow-tooltip width="140" header-align="center" align="center" size="mini">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.component=='el-select'" size="mini" @click="setOpstion(scope.row.opstions)">
                        设置数据</el-button>
                    <span v-if="scope.row.component=='el-select'">{{scope.row.opstions}}</span>
                </template>
            </el-table-column>
            <el-table-column label="数据对应值" width="140" header-align="center" align="center" size="mini">
                <template slot-scope="scope">
                    <el-input v-if="scope.row.component=='el-select'" style="width: 120px;" v-model="scope.row.selectVal"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="数据显示值" width="140" header-align="center" align="center" size="mini">
                <template slot-scope="scope">
                    <el-input v-if="scope.row.component=='el-select'" style="width: 120px;" v-model="scope.row.selectViewVal">
                    </el-input>
                </template>
            </el-table-column>

        </el-table>
        <el-divider>表格设置</el-divider>
        <el-row>
            <el-button @click="addItem('table')" type="primary">添加一列</el-button>
        </el-row>
        <el-table height="200px" :data="config.list" border size="mini">
            <el-table-column type="index" label="序号" width="50" header-align="center" align="center">
            </el-table-column>
            <el-table-column label="列类型" header-align="center" align="center" size="mini">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.type" size="mini" placeholder="请选择">
                        <el-option label="属性" value="prop">
                        </el-option>
                        <el-option label="序号" value="index">
                        </el-option>
                        <el-option label="选择" value="select">
                        </el-option>
                        <el-option label="操作列" value="opp">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="label名" header-align="center" align="center" size="mini">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.label"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="对应属性" header-align="center" align="center" size="mini">
                <template slot-scope="scope">
                    <el-input v-if="scope.row.type=='prop'" v-model="scope.row.prop"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="列宽度" width="140" header-align="center" align="center" size="mini">
                <template slot-scope="scope">
                    <el-input style="width: 120px;" size="mini" v-model="scope.row.width">
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column label="操作列" width="350" header-align="center" align="center" size="mini">
                <template v-if="scope.row.type=='opp'" slot-scope="scope">
                    <el-button type="primary" size="mini" @click="scope.row.opps.push({label:'',func:'','component':''})" icon="el-icon-circle-plus-outline"></el-button>
                    <el-row v-for="(item,index) in scope.row.opps" :key="index">
                        按钮文字：<el-input :key="index" size="mini" style="width: 60px;" v-model="scope.row.opps[index].label"></el-input>
                        关联功能：<el-select v-model="scope.row.opps[index].func" size="mini" style="width: 100px;margin-left: 20px;" clearable collapse-tags placeholder="请选择">
                            <el-option v-for="item in tableFuncOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                        <span v-if="scope.row.opps[index].func=='component'">
                            组件名：<el-input :key="index" size="mini" style="width: 60px;" v-model="scope.row.opps[index].component"></el-input>
                        </span>
                    </el-row>

                </template>
            </el-table-column>
        </el-table>

        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog title="设置选择项数据" :visible.sync="curoptsVisible" width="50%">
        <el-row>
            数据名称：<el-input size="mini" style="width: 100px;" v-model="curopts.name"></el-input>
            <el-button size="mini" type="primary" @click="addOpt">
                添加项
            </el-button>
        </el-row>
        <el-table height="200px" :data="curopts.data" border size="mini">
            <el-table-column type="index" label="序号" width="50" header-align="center" align="center">
            </el-table-column>
            <el-table-column label="键值对" header-align="center" align="center" size="mini">
                <template slot-scope="scope">
                    <el-row v-for="(item,key) in scope.row" :key="key">
                        键：<el-input size="mini" style="width: 160px;" v-model="item.key"></el-input>，值：<el-input size="mini" style="width: 160px;" v-model="item.value"></el-input>
                    </el-row>
                    <el-button type="primary" @click="scope.row.push({key:'label',value:'选项'})" icon="el-icon-circle-plus-outline"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button @click="curoptsVisible = false">取 消</el-button>
            <el-button type="primary" @click="curoptsVisible = false">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
import {
    tableFuncOptions,
    tableFuncOptionsmap,
    funcOptions,
    funcOptionsmap
} from "../base/funcstemp"
import {compile} from "./compile"
import {listTempVueStr} from "./listTemp"
import {listDialogTempStr} from "./listDialogTemp"
export default {
    name: 'temp-vue-list',
    data() {
        return {
            dialogVisible: false,
            funcOptions: funcOptions,
            tableFuncOptions: tableFuncOptions,
            curoptsVisible: false,
            curopts: {
                name: 'opstlist',
                data: []
            },
            config: {
                isDialog:false,    
                pageName:'',
                url: "/list",
                components:[],
                title:'',
                funcname: "getlist",
                funcs: [],
                query: [],
                list: [],
                data: []
            }
        }
    },
    methods: {
        handleClose() {
            this.dialogVisible = false
        },
        seting() {
            console.log(22)
            this.dialogVisible = true
        },
        addItem(type) {
            if (type == 'query') {
                this.config.query.push({
                    label: '',
                    component: 'el-input',
                    placeholder: '请输入',
                    selectViewVal: '',
                    selectVal: '',
                    opstions: {
                        name: "",
                        data: []
                    }
                })
            }
            if (type == 'table') {
                this.config.list.push({
                    type: "prop",
                    label: '表头',
                    opps: [],
                    width: '100',
                    prop: '',
                })
            }
        },
        setOpstion(opts) {
            this.curoptsVisible = true;
            this.curopts = opts
        },
        addOpt() {
            this.curopts.data.push([])
        },
        printTemp() {
            if(this.config.isDialog){
                compile(1,this.config, listDialogTempStr, 'listDialog.vue')
            }else{
                compile(1,this.config, listTempVueStr, 'list.vue')
            }
        }
    },
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}

ul,
ol,
li {
    list-style: none;
}

.kz-tp-left {
    float: left;
    width: 170px;
    height: 200px;
    border-radius: 10px;
    padding: 10px;
    border: #666 1px dashed;
    position: absolute;
    z-index: 10;
    background: #ffff;
    top: 88px;
}

.kz-tp-left h3 {
    background: #eeeeee;
    font-size: 14px;
    border-radius: 5px;
    padding: 2px;
}

.kz-tp-left li {
    font-size: 12px;
    width: 70px;
    position: relative;
    border: 1px solid rgba(238, 238, 238, 1);
    box-sizing: border-box;
    padding: 2px 3px;
    cursor: pointer;
    margin-right: 5px;
    border-radius: 3px;
    text-align: center;
    float: left;
}

.kz-tp-left ul {
    padding-top: 5px;
}

.kz-tp-left li.on {
    border: 1px solid #409eff;
}

.kz-tp-left li.on::after {
    content: ' ';
    display: block;
    position: absolute;
    right: 0px;
    top: 0px;
    width: 11px;
    height: 12px;
    background: url("http://kz-fe.oss-cn-hangzhou.aliyuncs.com/static/dgj/img/checkicon.png") no-repeat;
    background-size: 100% auto;
}

.ke-tp-content {
    width: 1100px;
    margin: 10px auto;
    margin-left: 240px;
    position: relative;

}

.seting {
    position: absolute;
    right: 10px;
    top: 0px;
    width: 25px;
    height: 25px;
    z-index: 1;
    cursor: pointer;
    color: #409eff;
}
</style>
