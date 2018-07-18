<template lang='pug'>
div(style='margin-bottom: 18px')
  h1.box.is-size-3 Announcements
  div.__flex-container
    card(v-for='message in messages' :key='message._idid')
      template(slot='title') {{ message.message_title }}
      template(slot='author')  @{{ message.username}}
      template(slot='body') {{ message.message }}
    card(add @click="send" v-if="sendable")
      template(slot='title'): input.input._title.is-inline(placeholder="Title" v-model="title")
      template(slot='body'): textarea.textarea(placeholder="message" v-model="body")
</template>

<script>
import moment from 'moment';
import Card from './Card';
import { MessageService } from '@/common/api.service';
import { ERROR } from '@/store/actions.type';
import _ from 'lodash';
export default {
	components: { Card },
	data() {
		return {
			title: '',
			body: '',
			messages: []
		};
	},
	async created() {
		await this.updateMessages();
	},
	methods: {
		async updateMessages() {
			const now = new Date().getTime();
			this.messages = (await MessageService.getMessages())
				.sort((a, b) => b.broadcast_time - a.broadcast_time)
				.filter(e => {
					return now > e.broadcast_time * 1000 && now < e.expiry * 1000;
				})
				.slice(0, 3);
		},
		async send() {
			let { title, body } = this;
			await MessageService.postMessage({
				message_title: title,
				message: body
			}).catch(error => this.$store.dispatch(ERROR, error));
			await this.updateMessages();
		}
	},
	computed: {
		sendable() {
			const permission = this.$store.getters.getPermissions;
			console.log(permission);
			return permission.includes('*') || permission.includes('broadcast');
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
