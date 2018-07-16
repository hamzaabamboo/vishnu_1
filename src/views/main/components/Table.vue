<template lang='pug'>
  div
    div.table
      table.is-narrow.is-striped
        thead
          tr
            td
              h5.is-size-5.has-text-centered
                | ลูกค่าย <strong>{{ids.length}}</strong> คน
            td(v-for='field in fields' :key='field')
              p.is-size-6.has-text-centered
                strong {{field}}
                br
                input(style="width:100%")
                br
        tbody
          tr(v-for='freshy in freshyList' :key='freshy.id')
            td
              div#grayID.animated(@click='click_button($event, "#blueID")')
                span.kbtn.kcross.kgray ไม่เข้า
              div#blueID.animated(@click='click_button($event, "#redID")' style='display: none')
                span.kbtn.kcross.kblue ปกติ
              div#redID.animated(@click='click_button($event, "#blueID")' style='display: none')
                span.kbtn.kcross.kred ออก

            td(v-for='field in fields' :key='field')
              div.animated.fadeInDown {{freshy[field]}}
</template>

<script>
import _ from 'lodash';
import moment from 'moment';
import Overview from './Overview.vue';
import { FreshyService } from '@/common/api.service.js';
import { FETCH_FRESHIES } from '@/store/actions.type';

export default {
	components: { Overview },
	props: ['arg-grp', 'arg-atr'],
	data() {
		return {
			ids: [],
			freshyList: [],
			fields: []
		};
	},
	created() {
		const freshyInfo = FreshyService.getInfo();
		const freshyStatus = FreshyService.getStatus();
		// this.$store.dispatch(FETCH_FRESHIES).then(d => console.log(d));
		for (let id in freshyInfo) {
			this.ids.push(id);
			this.freshyList.push(freshyInfo[id]);
		}
		for (let field in this.freshyList[0]) this.fields.push(field);
	},
	computed: {},
	methods: {
		update_status(cid, mode) {
			if (mode != 'F' || confirm()) {
				this.mode_lock = true;
			}
		},
		string_time_interval(d1, d2) {
			let tm = moment(d2).diff(moment(d1)) / 1000;
			let sc = Math.floor(tm) % 60;
			let mn = Math.floor(tm / 60) % 60;
			let hr = Math.floor(tm / 60 / 60);
			if (hr > 0) return `${hr}:${mn} hour`;
			if (mn > 0) return `${mn} min`;
			return 'now';
		},
		click_button(now, nextId) {
			now = now.target.parentNode;
			let nxt = now.parentNode.querySelector(nextId);
			now.classList.add('fadeOutUp');
			now.classList.remove('fadeInDown');
			setTimeout(
				(nw, nx) => {
					nw.style.display = 'none';
					nx.style.display = 'block';
					nx.classList.add('fadeInDown');
					nx.classList.remove('fadeOutUp');
				},
				500,
				now,
				nxt
			);
		}
	}
};
</script>

<style style='stylus' scoped>
input {
	color: rgb(160, 49, 91);
	border-width: 0px;
	border: none;
}
.container {
	background-color: antiquewhite;
}
.box {
	overflow: auto;
}
.table {
	overflow-x: scroll;
	width: 100%;
}
tr td {
	white-space: nowrap;
	font-size: 14px;
	overflow: hidden;
}
.section {
	padding: 10px 10px;
}
#header {
	margin: 20px auto;
}
button {
	width: 50px;
	margin-right: 12px;
}
</style>
