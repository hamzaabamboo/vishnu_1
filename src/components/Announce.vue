<template>
<div class='' style='margin-bottom: 18px'>
  <!-- <h1 class="is-size-3">Announce</h1> -->
  <div class='__flex-container'>
    <card>
      <template slot='title'>ข้าวยังไม่เสร็จนะครับ</template>
      <template slot='author'>@สวัส</template>
      <template slot='body'>ให้ถ่วงเวลาไปก่อน</template>
    </card>
    <card>
      <template slot='title'>ส่งถาพ group ด้วย</template>
      <template slot='author'>@PR</template>
      <template slot='body'>รีบๆส่งภาพเข้ามาก่อนนะครับ line: vishnu16</template>
    </card>
    <card>
        <template slot='title'><input class='input _title is-inline' placeholder="Title"></template>
        <template slot='author'><input class='input _author is-inline' placeholder="Author"></template>
        <template slot='body'><textarea class='textarea' placeholder="Describe"></textarea></template>
    </card>
    <!-- <table class='table'>
      <thead>
        <tr>
          <td>Time</td>
          <td>Title</td>
          <td>Detail</td>
        </tr>
      </thead>
        <tr v-for='msg in announce'>
          <td>{{msg.date.fromNow()}}</td>
          <td>{{msg.title}}</td>
          <td>{{msg.detail}}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>
            <button @click='send' class='button is-warning'>send</button>

            <input class='input is-inline' v-model='text["title"]'/>
          </td>
          <td>
            <textarea class='input is-inline' v-model='text["detail"]'/>
          </td>
        </tr>
      </tfoot>
    </table> -->
  </div>
</div>
</template>

<script>
import moment from 'moment';
import Card from './Card';
import _ from 'lodash';
export default {
	components: { Card },
	data() {
		return {
			text: {},
			announce: []
		};
	},
	methods: {
		send() {
			this.announce.push(_.assign({ date: moment() }, this.text));
			console.log(this.announce);
			this.text = {};
		}
	}
};
</script>

<style scoped>
.table {
	width: 100%;
}
button,
input,
textarea {
	width: 100%;
}

.__flex-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	/* align-content: space-around; */
}

input.input._title {
	width: 70%;
}
input.input._author {
	width: 28%;
}
textarea.textarea {
	min-height: 50px;
}
</style>
