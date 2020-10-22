export const  formDialogTempStr=`
<template>
<div>
<el-dialog title="{{{title}}}" :visible.sync="visible" width="50%" :before-close="handleClose">
<el-form ref="form"  label-width="80px" :rules="rules" :model="form">
  {{{formTemp}}}
</el-form>
<span slot="footer" class="dialog-footer">
    <el-button size="mini" type="primary" @click="submitData">确定</el-button>
    <el-button size="mini" type="primary" @click="handleClose">取 消</el-button>
</span>
</el-dialog>
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
    props: {
      visible: {
          type: Boolean,
          require: true,
      },
      detailid: ''
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
        handleClose(){
            this.$emit('close')
        },
        reset(){
            this.$refs['form'].resetFields();
        },
        {{{otherMethod}}}
    }
  }
</script>`

