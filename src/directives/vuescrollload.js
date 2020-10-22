
/**
 * v-tloadmore
 * @desc 下拉加载更多*表格
 * @example
 * ```vue
 * <div v-tloadmore="goload">
 * ```
 */
export default {
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
};