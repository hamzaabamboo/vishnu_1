<template lang='pug'>
div
  button.button.check-btn(:class='btnColor(0)' @click='click(0)')
  button.button.check-btn(:class='btnColor(1)' @click='click(1)')
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      require: true
    }
  },
  computed: {
    btnColor(i) {
      let cur = this.value;
      let suc = 'is-success'
      let dan = 'is-danger'
      return [suc, i ? dan : suc, dan, dan, i ? dan : suc][cur] || ''
    }
  },
  methods: {
    click(i) {
      if (this.value == -1) this.$emit('input', 0)
      if (this.value ==  0) this.$emit('input', i + 1)
    }
  }
}
</script>

<style scoped>
.check-btn {
  height: 2em;
  border-radius: 290486px;
  padding: 1em;
  margin-right: 5px;
}
</style>
