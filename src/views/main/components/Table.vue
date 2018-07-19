<template lang='pug'>
  div.cu

    // ARRANGEBLE COLUMNS
    div(style='overflow-x: scroll; padding: .2em')
      Container(@drop="field_move" orientation="horizontal")
        Draggable(v-for="field in fields" :key="field.id")
          button.button.mginL.cu(@click='field_toggle(field)' :class='class_btn(field)') {{translate[field]}}
    br
    div.table
      table.is-narrow.is-striped

        // HEADER
        thead: tr
          td: div.has-text-centered: div.is-size-6
            button.button(:class='status_btn_class' @click='status_btn_click')
              | {{freshyList.filter(filter_field_func).filter(filter_status_func).length}} คน
          td(v-for="field in fields" v-show='fields_show[field]' :key="field.id" :value='field'): p
            div
              strong {{translate[field]}}
              div: input(v-model='filter_field[field]' style="width: 100%; height: 1.8em")

        // BODY
        tbody
          tr(v-for='freshy in freshyList' :key='freshy._id' v-show='filter_field_func(freshy) && filter_status_func(freshy)')
            td
              vishnu-btn(
                :value='freshy_status[freshy["uniq_id"]]'
                @input='v => update_status(freshy["uniq_id"], v)'
              )
              // div {{freshy_status[freshy["uniq_id"]]}}
            td(v-for='field in fields' v-show='fields_show[field]' :key='field._id' :value='field')
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
			freshy_status: {}, // [uid] => -1, 0, 1, 2, 3, 4
      filter_field: {},
      translate: {},
      status_mode: "all"
		};
	},
	async created() {
		// this.$store.dispatch(FETCH_FRESHIES).then(d => console.log(d));
		this.freshyList = (await FreshyService.getFreshies());
    this.freshy_status = (await FreshyService.setFreshyStatus())
    this.translate = require('@/other/language_translate.json')
    this.fields = _.keys(this.freshyList[0])
    this.fields_show =_.fromPairs(this.fields.map(x => [x, false]));
		['tname', 'fname', 'lname', 'nname', 'department'].forEach(
      show => this.fields_show[show] = true
    )
	},
	methods: {
		field_move(dropResult) {
			let { addedIndex, removedIndex } = dropResult;
			let cutOut = this.fields.splice(removedIndex, 1)[0];
			this.fields.splice(addedIndex, 0, cutOut);
			this.$forceUpdate();
		},
		field_toggle(field) {
			this.$set(this.fields_show, field, !this.fields_show[field]);
      this.$forceUpdate();
      if (!this.fields_show[field]) {
        this.filter_field[field] = ''
      }
		},
		class_btn(field) {
			return {
				'is-danger': !this.fields_show[field],
				'is-success': this.fields_show[field]
			};
		},
		update_status(uid, mode) {
			if (prompt('Please input Unique ID') == uid) {
				this.$set(this.freshy_status, uid, mode);
				this.$forceUpdate();
			}
		},
		filter_field_func(usr) {
      let filt = this.filter_field
			return _.keys(filt).every(field =>
        usr[field] && (!filt[field] || usr[field].indexOf(filt[field]) != -1)
			);
    },
    status_btn_click() {
      let mode_list = ["all", "in", "out", "never"]
      let it = mode_list.indexOf(this.status_mode)
      this.status_mode = mode_list[(it + 1) % 4]
    },
    filter_status_func(usr) {
      let x = ["all", "in", "out", "never"].indexOf(this.status_mode)
      let stat = this.freshy_status[usr["uniq_id"]]
      return [true, stat == 0, stat > 0, stat == -1][x]
    }
  },
  computed: {
    status_btn_class() {
      return {
        "all": [],
        "in": ['is-success'],
        "out": ['is-danger'],
        "never": ['is-warning'],
      }[this.status_mode]
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

</style>
