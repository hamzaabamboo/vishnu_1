<template lang='pug'>
div
  button.button.check-btn(@click='click(0)' :class='[btnColor(0)]')
  button.button.check-btn(@click='click(1)' :class='[btnColor(1)]')
  div(v-if='admin')
    button.button(@click='admin_status') admin
</template>

<script>
export default {
	props: {
		value: {
			type: Number,
			require: true,
			default: -1
		},
		admin: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		btnColor(i) {
			let cur = this.value;
			const [wrn, suc, dan, info] = ['is-warning', 'is-success', 'is-danger', 'is-info'];
			return {
				'-1': wrn,
				'0': suc,
				'1': info,
				'2': i == 1 ? info : suc,
				'3': dan,
				'4': i == 1 ? dan : suc,
				'9': dan
			}[String(cur)];
		},
		click(i) {
      let [IN, OUT1, OUT2, OUT3, OUT4, EMER] = [0, 1, 2, 3, 4, 9];
      if (this.admin) {
        this.$emit('input', this.value !== IN ? IN : EMER)
      } else if (this.value === IN) {
        if ((new Date()).getTime() < (new Date('00:00 2018-07-28')).getTime()){
          this.$emit('input', [OUT1, OUT2][i])
        } else {
          this.$emit('input', [OUT3, OUT4][i])
        }
      } else {
        alert('not allow action this time')
      }
    },
    admin_status() {
      let stat = prompt('status')
      if (["-1", "0", "1", "2", "3", "4", "9"].includes(stat)){
        this.$emit("input", stat)
      } else if (stat !== null) {
        alert('status is wrong')
      }
    }
	}
};
</script>

<style scoped>
.check-btn {
	height: 1.8em;
	border-radius: 290486px;
	padding: 0.9em;
	margin-right: 4px;
}
</style>
