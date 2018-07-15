<template lang='pug'>
div(style='margin-bottom: 18px')
  h1.box.is-size-3 Announce
  div.__flex-container
    card
      template(slot='title') ข้าวยังไม่เสร็จนะครับ
      template(slot='author') @สวัส
      template(slot='body') ให้ถ่วงเวลาไปก่อน
    card
      template(slot='title') ส่งถาพ group ด้วย
      template(slot='author') @PR
      template(slot='body') รีบๆส่งภาพเข้ามาก่อนนะครับ line: vishnu16
    card(add)
        template(slot='title'): input.input._title.is-inline(placeholder="Title")
        template(slot='author'): input.input._author.is-inline(placeholder="Author")
        template(slot='body'): textarea.textarea(placeholder="Describe")
</template>

<script>
import moment from 'moment';
import Card from './Card';
import _ from 'lodash';
export default {
	components: { Card },
	data() {
		return {
			text: {}
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

.input._title {
  width: 100%;
}
.input._author {
	width: 70%;
}
textarea.textarea {
	min-height: 50px;
}
</style>
