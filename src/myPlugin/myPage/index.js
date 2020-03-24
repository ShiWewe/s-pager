import sPager from './Pager.vue';
//.name就是开始说的vue文件暴露出来的name名，sPager整个组件
sPager.install = Vue => Vue.component(sPager.name, sPager);
export default sPager;