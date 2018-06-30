<template>
  <section class='section'>
    <div class='box' style="margin-top: 15px">
      <overview v-if='args.tot' ref='overvR'></overview>
      <baanstaff v-else :name='args.nme' :group='args.usr'></baanstaff>
    </div>
    <div class="box">
      <freshy-table
        ref='tableR'
        :arg-grp='args.grp'
        :arg-atr='args.atr'
      ></freshy-table>
    </div>
</section>
</template>

<script>
import _ from 'lodash'
import FreshyTable from './Table.vue'
import Overview from './Overview.vue'
import Baanstaff from './Baanstaff.vue'

export default {
  components: {Overview, FreshyTable, Baanstaff},
  props: {
    'args': {
      type: Object,
      require: true,
      default: () => JSON.parse(localStorage.getItem('args'))
  }},
  data() {
    return {
  }},
  created(){
    if (!this.args){
      this.$router.push('/login')
  }}
}
</script>

<style scoped>
.box {
  overflow: auto;
}
.section {
  padding: 10px 10px;
}
#header {
  margin: 20px auto;
}
</style>
