import tempList from "@/tempcomps/vue/list/list"
import tempForm from "@/tempcomps/vue/form/form"


const kzadmin = {
  tempList,tempForm
}
const install = () => {
  for (var k in kzadmin) {
    window.Vue.component(kzadmin[k].name, kzadmin[k]);
  }
}
// export default kzadmin;
(typeof window !== 'undefined' && window.Vue && install()) || (kzadmin.install = install)
export default kzadmin;