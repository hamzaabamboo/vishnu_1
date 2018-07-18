<template lang='pug'>
  div
    div(style='overflow-x: scroll; padding: .2em')
      Container(@drop="onDrop" orientation="horizontal")
        Draggable(v-for="field in fields" :key="field.id")
          button.button.mginL(@click='toggle(field)' :class='class_btn(field)') {{field}}
    br
    div.table
      table.is-narrow.is-striped
        thead: tr
            td: h3.is-size-5.has-text-centered: strong {{ids.length}} คน
            td(v-for="field in fields" v-show='fields_show[field]' :key="field.id" :value='field')
              p.has-text-centered
                strong {{field}}
                div: input(style="width: 100%; height: 1.8em")
        tbody
          tr(v-for='freshy in freshyList' :key='freshy.id')
            td
              button.button.check-btn
              button.button.check-btn

            td(v-for='field in fields' v-show='fields_show[field]' :key='field.id' :value='field')
              // div.animated.fadeInDown
              div {{freshy[field]}}
</template>

<script>
import _ from 'lodash';
import moment from 'moment';
import Overview from './Overview.vue';
import { FreshyService } from '@/common/api.service.js';
import { FETCH_FRESHIES } from '@/store/actions.type';
import { Container, Draggable } from "vue-smooth-dnd";

export default {
	components: { Overview, Container, Draggable },
	props: ['arg-grp', 'arg-atr'],
	data() {
		return {
			ids: [],
			freshyList: [],
      fields: [],
      fields_show: {},
      items: [1,2,3,4,5,6,7]
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
		for (let field in this.freshyList[0]){
      this.fields.push(field);
      this.fields_show[field] = true;
    }
	},
	methods: {
    onDrop(dropResult) {
      let {addedIndex, removedIndex,} = dropResult
      let cutOut = this.fields.splice(removedIndex, 1) [0];
      this.fields.splice(addedIndex + (removedIndex > addedIndex ? 0 : 0), 0, cutOut);
      this.$forceUpdate()
    },
    toggle(field){
      this.$set(this.fields_show, field, !this.fields_show[field])
      this.$forceUpdate()
    },
    class_btn(field){
      return {
        "is-danger": !this.fields_show[field],
        "is-success": this.fields_show[field]
      }
    },
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

.table,
thead,
tbody{
	overflow: auto;
}

thead tr td {
  padding: 0;
}

td {
	text-align: left;
	vertical-align: top;
	border-left: 1px solid #fff;
}

td {
	white-space: nowrap;
	font-size: 14px;
	overflow: hidden;
}

.button.mginL {
  margin-right: 5px;
  padding: .4em;
  font-size: 12px;
}


::-webkit-scrollbar {
    height: 7px;
    width: 7px;
}
/* Track */
::-webkit-scrollbar-track {
    /* box-shadow: inset 0 0 5px rgb(255, 0, 170); */
    background-color: transparent;
    border-radius: 10px;
}
/* Handle */
::-webkit-scrollbar-thumb {
    background: #6669;
    border-radius: 10px;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #4449;
}
</style>
