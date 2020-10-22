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
        </el-form>
    </div>
    <div style="margin: 10px 0;">
        <el-tree v-loading="tree.loading" ref="tree" :data="tree.data" node-key="id" :props="tree.defaultProps" :default-expanded-keys="tree.defaultExpandedData" :expand-on-click-node="false" :filter-node-method="filterNode" style="width: 300px;height: 500px;overflow-y: scroll;">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span :style="{ color: data.enable === 2 ? '#cccccc' : '#606266', fontSize: '12px' }" v-text="node.label"></span>
                <span>
                    <el-button size="mini" type="text" @click="handleDetail(data)">详情</el-button>
                </span>
            </span>
        </el-tree>
    </div>

    <el-dialog title="设置" :visible.sync="dialogVisible" width="80%" :before-close="handleClose">
        <el-row style="padding-bottom:5px ;">
            页面标题：<el-input size="mini" style="width: 200px;" v-model="config.title"></el-input>
            组件名称：<el-input size="mini" style="width: 200px;" v-model="config.pageName"></el-input>
        </el-row>
        <el-row>
            方法url：<el-input size="mini" style="width: 200px;" v-model="config.url"></el-input>
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
        <el-divider>树形设置</el-divider>
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
    compile
} from "./compile"
import {
    formTempVueStr
} from "./treeTemp"

export default {
    name: 'temp-vue-tree',
    data() {
        return {
            dialogVisible: false,
            curoptsVisible: false,
            curopts: {
                name: 'opstlist',
                data: []
            },
            config: {
                pageName:'',
                url: "/list",
                title:'',
                funcname: "getlist",
                funcs: [],
                query: [],
                data: [],
                tree:[]
            }
        }
    },
    methods: {
        handleClose() {
            this.dialogVisible = false
        },
        seting() {
            this.dialogVisible = true
        },
        addItem(type) {
            if (type == 'form') {
                this.config.form.push({
                    label: '',
                    component: 'el-input',
                    placeholder: '请输入',
                    prop: '',
                })
            }
        },
        printTemp() {
            compile(2, this.config, formTempVueStr, 'form.vue')
        }
    },

}
</script>

<style>

</style>
