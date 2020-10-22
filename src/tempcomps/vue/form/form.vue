<template>
<div style="margin: 10px 0;">
    <span class="seting">
        <i @click="seting" class="el-icon-setting"></i>
    </span>
    <el-form label-width="100px" inline>
        <el-form-item v-for="(item,index) in config.form" :key="index" :label="item.label">
            <component :placeholder="item.placeholder" size="mini" :is="item.component">
            </component>
        </el-form-item>
        <el-row>
            <el-form-item>
                <el-button size="mini" type="primary">提交</el-button>
            </el-form-item>
        </el-row>
    </el-form>
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
        <div>
            <el-divider>表单设置</el-divider>
            <el-row>
                <el-button @click="addItem('form')" type="primary">添加一项</el-button>
            </el-row>
            <el-table height="200px" :data="config.form" border size="mini">
                <el-table-column type="index" label="序号" width="50" header-align="center" align="center">
                </el-table-column>
                <el-table-column label="label名" width="200" header-align="center" align="center" size="mini">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.label"></el-input>
                    </template>
                </el-table-column>

                <el-table-column label="placeholder" width="200" header-align="center" align="center" size="mini">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.placeholder"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="组件类型" width="200" header-align="center" align="center" size="mini">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.component"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="绑定属性" width="200" header-align="center" align="center" size="mini">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.prop"></el-input>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>

</div>
</template>

<script>
import {compile} from "./compile"
import {formTempVueStr} from "./formTemp"
import {formDialogTempStr} from "./formDialogTemp"

export default {
    name: 'temp-vue-form',
    data() {
        return {
            dialogVisible: false,
            config: {
                isDialog:false,
                components:[],
                title:'',
                pageName:'',
                form: []
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
            if(this.config.isDialog){
                compile(2,this.config, formDialogTempStr, 'formDialog.vue')
            }else{
                compile(2,this.config, formTempVueStr, 'form.vue')
            }
        }
    },

}
</script>

<style>

</style>
