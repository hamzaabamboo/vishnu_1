<template>
  <div>
    <!-- <p class='is-size-4 section animated flipInX' style="height: 70px">
      ลูกค่าย {{table_dbs_filter_len}} คน
      <br>
    </p> -->

    <div class="table">
      <table class="is-narrow is-striped">

        <thead>
          <tr>
            <td>
              <h5 class="is-size-5 has-text-centered">
                ลูกค่าย <strong>{{table_dbs_filter_len}}</strong> คน
              </h5>
            </td>
            <td v-for='attr in argAtr' :key='attr.id'>
              <p class='is-size-6 has-text-centered'>
                <strong>{{attr}}</strong><br>
                <input v-model='filter_field[attr]' style="width:100%"/><br>
              </p>
            </td>
          </tr>
        </thead>

        <tbody>
          <tr v-for='id in get_sorted_key' :key='id.id'>

            <td>
              <div id='redID' class="animated"  @click='click_button($event, "#blueID")'>
                <span class="kbtn kcross kred">cancel</span>
                <span class="kbtn kcross kgray">cancel</span>
              </div>
              <div id='blueID' class="animated" @click='click_button($event, "#redID")' style='display: none'>
                <span class="kbtn kcross kblue">cancel</span>
              </div>
            </td>

            <td v-for='attr in argAtr' :key='attr.id'>
              <div class='animated fadeInDown'>
                {{table_dbs_filter[id][attr]}}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// import firebase from 'firebase'
import _ from 'lodash';
import moment from 'moment';
import Overview from './Overview.vue';

export default {
	components: { Overview },
	props: ['arg-grp', 'arg-atr'],
	data() {
		return {
      tmp: false,
			mode: 'Y',
			mode_lock: false,
			valid_ids: null,
			table_dbs: null,
			filter_field: {},
			time_now: null
		};
	},
	created() {
		console.log('argGrp');
		console.log(this.argGrp);
		if (this.argGrp == undefined) {
			console.log('!!!');
			this.$router.push('/');
		}
		var statics_db = require('../other/freshy_information.json');
		var dynamic_db = require('../other/status.json');
		this.valid_ids = require('../other/inspect.json')[this.argGrp[0]];
		this.table_dbs = {};
		console.log(this.valid_ids);

		var upd_time = () => (this.time_now = moment().format());
		upd_time();
		window.setInterval(upd_time, 5000);

		var frontend_update = (cid, val) => {
			this.$set(this.table_dbs, cid, _.assign(val, statics_db[cid]));
		};
		for (let id of this.valid_ids) {
			frontend_update(id, dynamic_db.freshy[id]);
			// fbref.child(id).on('value', snapshot => {
			//   frontend_update(id, dynamic_db.freshy[id] = snapshot.val())
			// })
		}
		console.log('[success]: loading information');
	},
	computed: {
		table_dbs_filter() {
			let tab = this.table_dbs;
			let flt = this.filter_field;
			let res = {};
			for (let cid in tab) {
				let obj = _.assign({}, tab[cid], {
					วัน: this.string_time_interval(tab[cid]['วัน'], this.time_now)
				});
				if (_.keys(flt).every(key => obj[key].indexOf(flt[key]) != -1)) {
					res[cid] = obj;
				}
			}
			return res;
		},
		table_dbs_filter_len() {
			return _.keys(this.table_dbs_filter).length;
		},
		get_sorted_key() {
			let tbl = this.table_dbs;
			return _.keys(this.table_dbs_filter).sort((a, b) => {
				return tbl[a]['วัน'].localeCompare(tbl[b]['วัน']); // string compare
			});
		},
		get_attributes() {
			return this.valid_ids
				? _.keys(this.table_dbs[this.valid_ids[0]])
				: 'error';
		},
		button_dynamic() {
			return ['is-success', 'is-danger', 'is-warning'][
				'YNF'.indexOf(this.mode)
			];
		}
	},
	methods: {
		next_mode() {
			var tmp = 'YNFY';
			this.mode = tmp[tmp.indexOf(this.mode) + 1];
		},
		update_status(cid, mode) {
			if (mode != 'F' || confirm()) {
				this.mode_lock = true;
				// fbref.child(cid).set({
				// 	วัน: moment().format(),
				// 	ยืนยัน: this.args.nme,
				// 	สถานะ: mode
				// });
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
    click_button (now, nextId) {
      now = now.target.parentNode
      let nxt = now.parentNode.querySelector(nextId)
      now.classList.add('fadeOutUp')
      now.classList.remove('fadeInDown')
      setTimeout((nw, nx) => {
        nw.style.display = 'none'
        nx.style.display = 'block'
        nx.classList.add('fadeInDown')
        nx.classList.remove('fadeOutUp')
      }, 500, now, nxt)
    }
	}
};
</script>

<style scoped>
input {
	color: rgb(160, 49, 91);
	border-width: 0px;
	border: none;
}
div.container {
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
