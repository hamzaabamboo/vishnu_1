<template lang='pug'>
  div.cu

    // ARRANGEBLE COLUMNS
    div(style='overflow-x: scroll; padding: .2em')
      Container(@drop="field_move" orientation="horizontal")
        Draggable(v-for="field in fields" :key="field.id")
          button.button.mginL.cu(@click='field_toggle(field)' :class='class_btn(field)') {{translate[field]}}
    // br
    div.table
      table.is-narrow.is-striped

        // HEADER
        thead: tr
          td: div.has-text-centered: div.is-size-6
            button.button(:class='status_btn_class' @click='status_btn_click' style='position: relative; top: -5px; z-index: 100')
              | {{freshyList.filter(filter_field_func).filter(filter_status_func).length}} คน
          td(v-for="field in fields" v-show='fields_show[field]' :key="field.id" :value='field'): p
            div
              // strong {{translate[field]}}
              div: input(:placeholder='translate[field]' v-model='filter_field[field]' style="width: 100%; height: 1.5em")

        // BODY
        tbody
          tr(v-for='freshy in freshyList' :key='freshy._id' v-show='filter_field_func(freshy) && filter_status_func(freshy)')
            td
              vishnu-btn(
                :value='parseInt(freshy.status)'
                @input='v => update_status(freshy, v)'
                :admin='admin'
              )
              // div {{freshy_status[freshy["uniq_id"]]}}
            td(v-for='field in fields' v-show='fields_show[field]' :key='field._id' :value='field')
              div {{freshy[field]}}
</template>

<script>
import _ from 'lodash';
import moment from 'moment';
import { ColumnsStorage } from '@/common/jwt.service.js';
import { FreshyService } from '@/common/api.service.js';
import { FETCH_FRESHIES } from '@/store/actions.type';
import { Container, Draggable } from 'vue-smooth-dnd';

const ALL = 0;
const IN = 1;
const OUT = 2;
const NEVER = 3;

export default {
  components: { Container, Draggable },
  props: ['admin'],
	data() {
		return {
			freshyList: [], // [Object]
			fields: [], // [String]
			fields_show: {}, // [String] => Boolean
			filter_field: {},
			translate: {},
			status_mode: ALL
		};
	},
	async created() {
		// this.$store.dispatch(FETCH_FRESHIES).then(d => console.log(d));
		await this.updateFreshy();
		this.translate = require('@/i10n/language_translate.json');
		this.fields = _.keys(this.freshyList[0]).filter(
			e => !['_id', 'status'].includes(e)
		);
		this.fields_show =
			ColumnsStorage.get || _.fromPairs(this.fields.map(x => [x, false]));
		if (!ColumnsStorage.get) {
			const columns = ['tname', 'fname', 'lname', 'nname', 'department'];
			columns.forEach(show => (this.fields_show[show] = true));
		}
	},

	methods: {
		async updateFreshy() {
			this.freshyList = await FreshyService.getFreshies();
		},
		field_move(dropResult) {
			let { addedIndex, removedIndex } = dropResult;
			let cutOut = this.fields.splice(removedIndex, 1)[0];
			this.fields.splice(addedIndex, 0, cutOut);
			this.$forceUpdate();
		},
		field_toggle(field) {
			this.$set(this.fields_show, field, !this.fields_show[field]);
			ColumnsStorage.save(this.fields_show);
			this.$forceUpdate();
			if (!this.fields_show[field]) {
				delete this.filter_field[field];
			}
		},
		class_btn(field) {
			return {
				'is-danger': !this.fields_show[field],
				'is-success': this.fields_show[field]
			};
		},
		async update_status(freshy, mode) {
			if (prompt('Please input Unique ID') === freshy.uniq_id) {
				await FreshyService.setFreshyStatus(freshy.uniq_id, {
					status: {
						from: parseInt(freshy.status),
						to: mode
					}
				});
				this.updateFreshy();
			}
		},
		filter_field_func(usr) {
			let filt = this.filter_field;
			return _.keys(filt).every(
				field => {
          if (!usr[field]) return false
          if (filt[field] == '+') return Boolean(usr[field]) && usr[field] != '-'
          return !filt[field] || usr[field].indexOf(filt[field]) != -1
        }

			);
		},
		status_btn_click() {
			let mode_list = [ALL, IN, OUT, NEVER];
			let it = this.status_mode;
			this.status_mode = mode_list[(it + 1) % 4];
		},
		filter_status_func(usr) {
			let x = this.status_mode;
			const stat = usr.status;
			return [true, stat == 0, stat > 0, stat == -1][x];
		}
	},
	computed: {
		status_btn_class() {
			return {
				[ALL]: [],
				[IN]: ['is-success'],
				[OUT]: ['is-danger'],
				[NEVER]: ['is-warning']
			}[this.status_mode];
		}
	},
	watch: {
		filter_field: {
			deep: true,
			handler(ffield) {
				for (let f in ffield) {
					if (!ffield[f]) {
						delete this.filter_field[f];
					}
				}
			}
		}
	}
};
</script>

<style style='stylus' scoped>
input {
	color: rgb(160, 49, 91);
	font-size: 15px;
	border-width: 0px 0px 1px 0px;
	border-bottom: 0px solid rgb(255, 255, 255);
	box-shadow: 0 2px 0 #ddddddb4;
	padding-left: 3px;
}
input:focus {
	box-shadow: 0 2px 0 #ffdd57;
	outline-width: 0px;
}
/* border: none; */

.table,
thead,
tbody {
	overflow: auto;
}

thead tr td {
	padding-top: 20px;
	padding-bottom: 5px;
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
</style>
