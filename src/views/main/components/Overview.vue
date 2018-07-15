<template lang='pug'>
  div
    div
      p.is-size-4 พี่ค่าย :
        // strong ช
        //   span._cred {{total["ช"]}} , ญ
        //   span._cred {{total["ญ"]}}
    div(style='overflow-y: auto')
      table.table.__knarrow is-striped._cred(align='center')
        thead
          tr
            td/
            td(v-for='b in Object.keys(baan)' :key='b.id')
              strong {{b}}
        tbody
          tr(v-for='s in ["ช", "ญ"]' :key='s.id')
            td: strong {{s}}
            td(v-for='b in baan' :key='b.id') {{b[s]}}
</template>

<script>
import _ from 'lodash';
import { StaffService } from '@/common/api.service';

export default {
	data() {
		return {
			baan: {}
		};
	},
	created() {
		this.baan = StaffService.getStaff();
	},
	computed: {
		total() {
			return {
				ช: _.values(this.baan).reduce((a, b) => a + b['ช'], 0),
				ญ: _.values(this.baan).reduce((a, b) => a + b['ญ'], 0)
			};
		}
	}
};
</script>

<style scoped>
.table {
	overflow: scroll;
	width: 100%;
	max-width: 800px;
}
._cred {
	color: rgb(155, 41, 41);
}
.table.__knarrow td {
	padding: 0.2em 0.2em;
}
</style>
