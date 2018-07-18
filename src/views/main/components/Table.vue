<template lang='pug'>
  div
    div(style='overflow-x: scroll; padding: .2em')
      Container(@drop="field_move" orientation="horizontal")
        Draggable(v-for="field in fields" :key="field.id")
          button.button.mginL(@click='field_toggle(field)' :class='class_btn(field)') {{field}}
    br
    div.table
      table.is-narrow.is-striped
        thead
          tr
            td: div.has-text-centered
              div.is-size-6
                strong {{freshyList.length}} คน
            td(v-for="field in fields" v-show='fields_show[field]' :key="field.id" :value='field')
              p
                strong {{field}}
                div: input(v-model='filter_field[field]' style="width: 100%; height: 1.8em")
        tbody
          tr(v-for='freshy in freshyList' :key='freshy._id' v-show='filter_field_func(freshy)')
            td
              vishnu-btn(
                :value='fields_status[freshy["uniq_id"]]'
                @input='v => update_status(freshy["uniq_id"], v)'
              )

            td(v-for='field in fields' v-show='fields_show[field]' :key='field._id' :value='field')
              // div.animated.fadeInDown
              div {{freshy[field]}}
</template>

<script>
import _ from 'lodash';
import moment from 'moment';

import { FreshyService } from '@/common/api.service.js';
import { FETCH_FRESHIES } from '@/store/actions.type';
import { Container, Draggable } from 'vue-smooth-dnd';

export default {
	components: { Container, Draggable },
	data() {
		return {
			freshyList: [], // [Object]
			fields: [], // [String]
			fields_show: {}, // [String] => Boolean
			fields_status: {}, // [uid] => -1, 0, 1, 2, 3, 4
			filter_field: {}
		};
	},
	async created() {
		this.freshyList = (await FreshyService.getFreshies()).data;
		// this.freshyList = require('@/other/freshy_information.json')
		// HACK DATA BY KRIST

		// this.$store.dispatch(FETCH_FRESHIES).then(d => console.log(d));
		for (let field in this.freshyList[0]) {
			if (!['_id', 'status'].includes(field)) {
				this.fields.push(field);
				this.fields_show[field] = false;
			}
		}
		for (let show of ['tname', 'fname', 'lname', 'nname', 'department']) {
			this.fields_show[show] = true;
		}
		for (let freshy of this.freshyList) {
			console.log(freshy);
			this.fields_status[freshy['uniq_id']] = -1;
		}
	},
	methods: {
		field_move(dropResult) {
			let { addedIndex, removedIndex } = dropResult;
			let cutOut = this.fields.splice(removedIndex, 1)[0];
			this.fields.splice(
				addedIndex + (removedIndex > addedIndex ? 0 : 0),
				0,
				cutOut
			);
			this.$forceUpdate();
		},
		field_toggle(field) {
			this.$set(this.fields_show, field, !this.fields_show[field]);
			this.$forceUpdate();
		},
		class_btn(field) {
			return {
				'is-danger': !this.fields_show[field],
				'is-success': this.fields_show[field]
			};
		},
		update_status(uid, mode) {
			if (prompt('Please input Unique ID') == uid) {
				this.$set(this.fields_status, uid, mode);
				this.$forceUpdate();
			}
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
		},
		filter_field_func(usr) {
			return _.keys(this.filter_field).every(
				field =>
					!this.filter_field[field] ||
					usr[field].indexOf(this.filter_field[field]) != -1
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
tbody {
	overflow: auto;
}

thead tr td {
	padding-top: 0;
	padding-bottom: 0;
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
	padding: 0.4em;
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
