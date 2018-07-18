<template lang='pug'>
div
  button.button.check-btn(@click='click(0)' :class='[btnColor(0)]')
  button.button.check-btn(@click='click(1)' :class='[btnColor(1)]')
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      require: true,
      default: -1
    }
  },
  methods: {
    btnColor(i) {
      let cur = this.value;
      let suc = 'is-success'
      let dan = 'is-danger'
      return [suc, dan, i == 1 ? dan : suc, dan, i == 1 ? dan : suc][cur] || 'is-warning'
    },
    click(i) {
      if (this.value == -1) this.$emit('input', 0)
      if (this.value ==  0) this.$emit('input', i + 1)
    }
  }
}
</script>

<style scoped>
.check-btn {
  height: 1.8em;
  border-radius: 290486px;
  padding: .9em;
  margin-right: 4px;
}
</style>
