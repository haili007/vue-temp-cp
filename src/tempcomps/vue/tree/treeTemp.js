export const formTempVueStr=`
<template>
<el-form ref="form" :label-position="labelPosition" label-width="80px" :model="form">
  {{{formTemp}}}
  <el-row>
        <el-form-item>
            <el-button size="mini" @click="submitData" type="primary">提交</el-button>
        </el-form-item>
        <el-form-item>
            <el-button @click="resset" size="mini">重置</el-button>
        </el-form-item>
    </el-row>
</el-form>
</template>
<script>
  export default {
    data() {
      return {
        form:{
            {{{form}}}
        }
      };
    },
    methods: {
        submitData(){
            console.log('submit')
        },
        reset(){
            this.$refs['form'].resetFields();
        }
    }
  }
</script>`

export const formTempHtmlStr=`
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
    <script src='https://kz-fe.oss-cn-hangzhou.aliyuncs.com/lib/vue.min@2.5.16.js'></script>
    <script src="https://unpkg.com/element-ui/lib/index.js"></script>
</head>

<body>
    <div id="app">
        <el-form ref="form" :label-position="labelPosition" label-width="80px" :model="form">
            {{{formTemp}}}
            <el-row>
                <el-form-item>
                    <el-button size="mini" @click="submitData" type="primary">提交</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="resset" size="mini">重置</el-button>
                </el-form-item>
            </el-row>
        </el-form>
    </div>
</body>
<script>
    var Main = {
        name: '{{{name}}}',
        data:function() {
            return {
                form: {
                    {{{form}}}
                }
            };
        },
        methods: {
            submitData:function(){
                console.log('submit')
            },
            reset:function(){
                this.$refs['form'].resetFields();
            }
        }
    }
    var Ctor = Vue.extend(Main)
    vm = new Ctor().$mount('#app')
</script>
</html>
`
