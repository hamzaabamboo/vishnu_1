<template>
  <section class="section">
    <div class="container box">
      <h1 class='title'>ID {{id}}</h1>
      <div v-if='udata !== undefined'>
        <table class='container'>
          <tbody>
            <tr v-for='k in Object.keys(udata)'>
              <td class="has-text-right">{{k}}</td>
              <td class="has-text-left">{{udata[k]}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class='subtitle'>
        ERROR: not found
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data(){
    return {
      id: this.$route.params.id,
      udata: require('../other/freshy_information.json')[this.$route.params.id]
}}}
</script>

<style scoped>
.box {
  max-width: 400px;
  overflow: scroll;
}
td {
  padding: 5px 15px;
}
</style>
