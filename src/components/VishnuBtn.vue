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
    },
    admin: {
      type: Boolean,
      default: false
    }
	},
	methods: {
		btnColor(i) {
      let cur = this.value;
			const [wrn, suc, dan] = ['is-warning', 'is-success', 'is-danger'];
			return {
        "-1": wrn,
        "0": suc,
        "1": dan,
        "2": i == 1 ? dan : suc,
        "3": dan,
        "4": i == 1 ? dan : suc,
        "9": dan
      }[cur]
		},
		click(i) {
      let [IN, OUT1, OUT2, OUT3, OUT4, EMER] = [0, 1, 2, 3, 4, 9];
      if (this.admin) {
        this.$emit('input', this.value ? IN : EMER)
      } else {
        let status = [
          {"start": '09:00 27-8-2018', "end": '10:00 27-8-2018', "btn": [IN, IN]},
          {"start": '12:00 27-8-2018', "end": '12:45 27-8-2018', "btn": [OUT1, OUT2]},
          {"start": '16:20 27-8-2018', "end": '17:00 27-8-2018', "btn": [OUT1, OUT2]},
          {"start": '20:00 27-8-2018', "end": '20:40 27-8-2018', "btn": [OUT2, OUT2]},
          {"start": '12:00 28-8-2018', "end": '12:45 28-8-2018', "btn": [OUT3, OUT4]},
          {"start": '16:20 28-8-2018', "end": '17:00 28-8-2018', "btn": [OUT3, OUT4]},
          {"start": '20:00 28-8-2018', "end": '20:40 28-8-2018', "btn": [OUT4, OUT4]},
        ]
        for (let {start, end, btn} of status) {
          if (new Date(start) <= new Date() && new Date() <= new Date(end)) {
            this.$emit('input', btn[i])
            return
          }
        }
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
