export const formTempVueStr=`
<template>
<div>
<el-form ref="form" :label-position="labelPosition" label-width="80px" :rules="rules" :model="form">
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
{{{dialogTemp}}}
</div>
</template>
<script>
{{{importcomponent}}}
  export default {
    data() {
      return {
        form:{
            {{{form}}}
        },
        rules:{
            {{{rules}}}
        },
        {{{other}}}
      };
    },
    components: {
        {{{component}}}
    },
    methods: {
        async getData() {
            // let res = await fetchChargeList({
            //      id: this.detailid
            //  })
            // if (res.code == 0) {
            //   this.list.data = res.data.data
            //   this.list.total = res.data.totalCounts
            // } else {
            //   this.$message({
            //     type: 'error',
            //     message: res.message,
            //   })
            // }
          },
        submitData(){
        this.$refs.form.validate(async valid => {
            if (valid) {
                // let params = this.getPostData()
                // res = await updatePromotionActivity(params)
                // if (res && res.code == 0) {
                //   let res = await SubmitPromortionActivityAll({ id: this.detail.id })
                //   if (res.code == 0) {
                //     this.$message({ type: 'success', message: res.message ? res.message : '成功' })
                //     this.closerefresh()
                //   } else {
                //     this.$message({ type: 'error', message: res.message ? res.message : '提交出错！' })
                //   }
                // } else {
                //   this.$message({ type: 'error', message: res.message ? res.message : '保存出错！' })
                // }
            }
        })
        console.log('submit')
        },
        reset(){
            this.$refs['form'].resetFields();
        },
        {{{otherMethod}}}
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
        components: {
            {{{component}}}
        },
        methods: {
            async getData() {
                // let res = await fetchChargeList({
                //      id: this.detailid
                //  })
                // if (res.code == 0) {
                //   this.list.data = res.data.data
                //   this.list.total = res.data.totalCounts
                // } else {
                //   this.$message({
                //     type: 'error',
                //     message: res.message,
                //   })
                // }
              },
            submitData(){
            this.$refs.form.validate(async valid => {
                if (valid) {
                    // let params = this.getPostData()
                    // res = await updatePromotionActivity(params)
                    // if (res && res.code == 0) {
                    //   let res = await SubmitPromortionActivityAll({ id: this.detail.id })
                    //   if (res.code == 0) {
                    //     this.$message({ type: 'success', message: res.message ? res.message : '成功' })
                    //     this.closerefresh()
                    //   } else {
                    //     this.$message({ type: 'error', message: res.message ? res.message : '提交出错！' })
                    //   }
                    // } else {
                    //   this.$message({ type: 'error', message: res.message ? res.message : '保存出错！' })
                    // }
                }
            })
            reset:function(){
                this.$refs['form'].resetFields();
            },
            {{{otherMethod}}}
        }
    }
    var Ctor = Vue.extend(Main)
    vm = new Ctor().$mount('#app')
</script>
</html>
`
