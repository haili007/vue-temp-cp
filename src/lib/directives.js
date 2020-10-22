import Vue from 'vue'

Vue.directive('tloadmore', {
  bind(el, binding) {
    const selectWrap = el.querySelector('.el-table__body-wrapper')
    selectWrap.addEventListener('scroll', function () {
      let sign = 100
      const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
      if (scrollDistance <= sign) {
        binding.value()
      }
    })
  }
})
Vue.directive('kzkeydown', {
  bind(el, binding) {
    const selectWrap = el.querySelector('.el-input__inner')
    selectWrap.addEventListener('keypress', function (e) {
      binding.value(e)
    })
  }
})