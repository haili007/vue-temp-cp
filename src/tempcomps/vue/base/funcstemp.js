export const tableFuncOptions = [
    {
        label: '启禁用', value: 'handleEnable'
    },
    {
        label: '审核', value: 'showExamineDiglog'
    },
    {
        label: '提交', value: 'handleSubmit'
    },
    {
        label: '修改', value: 'handleEdit'
    },
    {
        label: '关闭', value: 'handleCloseRow'
    },
    {
        label: '详情', value: 'handleDetail'
    },
    {
        label: '自定义', value: ''
    },
]
export const tableFuncOptionsmap = {
    handleEnable: '启禁用',
    showExamineDiglog: '审核',
    handleSubmit: '提交',
    handleEdit: '修改',
    handleCloseRow: '关闭',
    handleDetail: '详情',
}

export const funcOptions = [
    {
        label: '批量启禁用', value: 'handleBatchEnable'
    },
    {
        label: '批量审核', value: 'showBatchExamineDiglog'
    },
    {
        label: '批量提交', value: 'handleBatchSubmit'
    }
    ,
    {
        label: '新增', value: 'handleAdd'
    },
    {
        label: '导入', value: 'handleImport'
    },

]
export const funcOptionsmap = {
    handleBatchEnable: '批量启禁用',
    showBatchExamineDiglog: '批量审核',
    handleBatchSubmit: '批量提交',
    handleAdd: '新增',
    handleImport: '导入',
}

export const handleEnable = `
async handleEnable(row) {
    let name= (row.status==1)?'启用':'禁用'
    let confirmSub = false
    try {
    await this.$confirm('此操作将'+name+'选择订单！是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    })
    confirmSub = true
    } catch (e) {
    confirmSub = false
    }
    if (!confirmSub) {
    return
    }
    // let res = await Enable({ id: row.id,status: row.status})
    // if (res.code == 0) {
    //     this.$message({ type: 'success', message: res.message ? res.data : '成功' })
    //     this.getList()
    // } else {
    // this.$message({ type: 'error', message: res.message ? res.message : '出错！' })
    // }
}

`

export const handleSubmit = `
async handleSubmit(row) {
    let confirmSub = false
    try {
    await this.$confirm('此操作将提交选择订单！是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    })
    confirmSub = true
    } catch (e) {
    confirmSub = false
    }
    if (!confirmSub) {
    return
    }
    // let res = await submit({ id: row.id,status: row.status})
    // if (res.code == 0) {
    //     this.$message({ type: 'success', message: res.message ? res.data : '成功' })
    //     this.getList()
    // } else {
    // this.$message({ type: 'error', message: res.message ? res.message : '出错！' })
    // }
}

`


export const showExamineDiglog = `
showExamineDiglog(row) {
        this.current= row
    this.examineDiglogVisible = true
},
async handleExamine(state) {
    this.sending = true
    // let res = await RebateAdjustmentAudit({ id: this.current.id, memo: this.examineDiglogForm.memo, auditResult: state })
    // this.sending = false
    // if (res.code == 0) {
    //  this.$message({ type: 'success', message: res.data ? res.data : '成功' })
    //  this.getList()
    //   this.examineDiglogVisible = false
    // } else {
    //     this.$message({ type: 'error', message: res.message ? res.message : '审核出错！' })
    // }
}

`

export const handleCloseRow = `
async handleCloseRow(row) {
    let confirmSub = false
    try {
        await this.$confirm('此操作将关闭选择订单！是否继续？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        })
    confirmSub = true
    } catch (e) {
    confirmSub = false
    }
    if (!confirmSub) {
    return
    }
    // let res = await Clos({ id: row.id})
    // if (res.code == 0) {
    //     this.$message({ type: 'success', message: res.message ? res.data : '成功' })
    //     this.getList()
    // } else {
    // this.$message({ type: 'error', message: res.message ? res.message : '关闭出错！' })
    // }
}
`

export const handleEdit = `
  handleEdit(row) {
    // this.$router.push({
    //   path: 'edit',
    //   query:{id:row.id}
    // })
  }
`

export const handleDetail = `
  handleDetail(row) {
    // this.$router.push({
    //   path: 'detail',
    //   query:{id:row.id}
    // })
  }
`

export const handleBatchEnable = `
    async handleBatchEnable(opp) {
        let postData = []
        let name= (opp==1)?'启用':'禁用'
        if (this.currents && this.currents.length > 0) {
        for (let i = 0; i < this.currents.length; i++) {
            postData.push(this.currents[i].id)
            if (this.currents[i].status == 1) {
            this.$message({ type: 'error', message: '订单号' + this.currents[i].id + '状态不允许'+name+'！' })
            return
            }
        }
        } else {
        this.$message({ type: 'error', message: '请先选择行！' })
        return
        }
        let confirmSub = false
        try {
        await this.$confirm('此操作将'+name+'选择订单！是否继续？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        })
        confirmSub = true
        } catch (e) {
        confirmSub = false
        }
        if (!confirmSub) {
        return
        }
        // let res = await Enable({ ids: postData,status: opp})
        // if (res.code == 0) {
        //     this.$message({ type: 'success', message: res.message ? res.data : '成功' })
        //     this.getList()
        // } else {
        // this.$message({ type: 'error', message: res.message ? res.message : '出错！' })
        // }
    }
`

export const showBatchExamineDiglog = `
    showBatchExamineDiglog() {
        if (this.currents && this.currents.length > 0) {
        for (let i = 0; i < this.currents.length; i++) {
            if (this.currents[i].status != 2) {
            this.$message({ type: 'error', message: '订单号' + this.currents[i].id + '状态不允许审核！' })
            return
            }
        }
        } else {
        this.$message({ type: 'error', message: '请先选择行！' })
        return
        }
        this.batchExamineDiglogVisible = true
    },
    async handleBatchExamine(state) {
        let postData = []
        if (this.currents && this.currents.length > 0) {
        for (let i = 0; i < this.currents.length; i++) {
            postData.push(this.currents[i].id)
        }
        }
        this.sending = true
        // let res = await RebateAdjustmentAudit({ ids: postData, memo: this.dialogForm.memo, auditResult: state })
        // this.sending = false
        // if (res.code == 0) {
        //  this.$message({ type: 'success', message: res.data ? res.data : '成功' })
        //  this.getList()
        //   this.batchExamineDiglogVisible = false
        // } else {
        //     this.$message({ type: 'error', message: res.message ? res.message : '审核出错！' })
        // }
  }
`

export const handleBatchSubmit = `
async handleBatchSubmit() {
    let postData = []
    if (this.currents && this.currents.length > 0) {
    for (let i = 0; i < this.currents.length; i++) {
        postData.push(this.currents[i].id)
        if (this.currents[i].status == 1) {
        this.$message({ type: 'error', message: '订单号' + this.currents[i].id + '状态不允许提交！' })
        return
        }
    }
    } else {
    this.$message({ type: 'error', message: '请先选择行！' })
    return
    }
    let confirmSub = false
    try {
    await this.$confirm('此操作将提交选择订单！是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    })
    confirmSub = true
    } catch (e) {
    confirmSub = false
    }
    if (!confirmSub) {
    return
    }
    // let res = await Submit({ ids: postData,staus: opp})
    // if (res.code == 0) {
    //     this.$message({ type: 'success', message: res.message ? res.data : '成功' })
    //     this.getList()
    // } else {
    // this.$message({ type: 'error', message: res.message ? res.message : '出错！' })
    // }
}
`


export const handleAdd = `
  handleAdd() {
    // this.$router.push({
    //   name: 'activityDetail',
    // })
  }
`

export const handleExport = `
  async handleExport() {
    // let res = await RebateAdjustmentExportflowlist(this.form)
    // if (res.code == 0) {
    //   func.downloadFile(res.data)
    // } else {
    //   this.$message({ type: 'warning', message: res.message ? res.message : '导出出错！' })
    // }
  }
`

export const handleImport = `
    handleImport(res) {
        if (res.code == 0) {
        this.$message({ type: 'success', message: '导入成功！' })
        //this.getList()
        this.nlistData=res.data;
        } else {
        this.$message({ type: 'error', message: res.message ? res.message : '导入文件出错！' })
        }
    }
`



export const funcstemp = {
    handleEnable, handleSubmit, showExamineDiglog, handleCloseRow, handleEdit, handleDetail, handleBatchEnable, showBatchExamineDiglog, handleBatchSubmit, handleAdd, handleExport,handleImport
}
