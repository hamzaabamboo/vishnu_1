<template>
  <div>
    <h1 class="is-size-4">
      พี่บ้าน
      <strong>{{name}}</strong> :
      ช <input @keyup='edit = true' v-model.lazy='ช'>,
      ญ <input @keyup='edit = true' v-model.lazy='ญ'>,
      ข้าวพิเศษ <input @keyup='edit = true'>
      <button v-if='edit' @click='update'
      class='button is-warning is-small'> update </button>
    </h1>
  </div>
</template>

<script>
import md5 from 'md5'
export default {
  props: ['name', 'group'],
  data () {
    return {
      edit: false,
      ช: 23,
      ญ: 12
  }},
  methods: {
    update(){
      console.log(this.ช + ' ' + this.ญ)
      this.edit = false;
  }}
}
</script>

<style scoped>
input {
  font-size: 20px;
  border: none;
  width: 40px;
  text-align: center;
}
</style>
