<template lang='pug'>
  div
    div
      div.is-inline(v-for='field in select_field')
        div.is-inline(style='padding: 5px')
          input(type="checkbox" v-model="field.show")
          | {{to_thai(field.name)}}
    div.cu(style='overflow-y: auto' align='center')
      table.table
        thead
          tr
            td: strong freshy
            td(v-for='(itm, name) in Object.keys(table["M"])'): strong {{translate_col(itm)}}
        tbody
          tr(v-for='(row, name) in table' :key='row.id')
            td: strong {{name}}
            td(v-for='itm in row') {{itm}}
</template>

<script>
import _ from 'lodash';
import { FreshyService } from '@/common/api.service';
import translate_col from '@/i10n/baan_translate.json';
import translate from '@/i10n/language_translate.json';
import OthersList from './OthersList';
export default {
	props: ['group'],
	components: { OthersList },
	data() {
		return {
      raw_table: {},
      select_field: []
		};
  },
	async created() {
    this.raw_table = (await FreshyService.getAllFreshyStatus()).data
    this.select_field = _.keys(this.raw_table).reduce((a, b) => {
      a.push({'name': b, 'show': true})
      return a
    }, [])
  },
  methods: {
    to_thai(x) {
      return {
        0: 'อยู่',
        1: '1-1',
        2: '1-2',
        3: 'ออกรอบ 1',
        4: 'ออกรอบ 2',
        9: 'ออกนอกเวลา',
      }[x] || x
    },
    translate_col(word) {
      return translate_col[word] || word
    },
  },
	computed: {
    table(){
      const deepMergeSum = (obj1, obj2) => {
        return _.keys(obj1).reduce((acc, key) => {
          if (typeof obj2[key] === 'object') {
            acc[key] = deepMergeSum(obj1[key], obj2[key]);
          } else if (obj2.hasOwnProperty(key) && !isNaN(parseFloat(obj2[key]))) {
            acc[key] = obj1[key] + obj2[key]
          }
          return acc;
        }, {});
      };
      let res = {}
      for (var {name, show} of this.select_field) {
        if (show) {
          res = _.isEmpty(res)
            ? this.raw_table[name]
            : deepMergeSum(res, this.raw_table[name])
        }
      }
      return res
    }
	}
};
</script>

<style scoped>
td {
	padding: 0.3em 0.4em;
}
</style>
