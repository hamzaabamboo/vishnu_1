<template lang='pug'>
div
  // h1.box.is-size-3 Announcements
  div.__flex-container
    card(v-for='message in messages.slice(0, n_see)' :key='message._idid')
      template(slot='title') {{ message.message_title }}
      template(slot='author')  @{{ message.username}}
      template(slot='body') {{ message.message }}
    card(add :disabled="loading" @click="send" v-if="sendable")
      template(slot='title'): input.input._title.is-inline.cu(placeholder="Title" v-model="title")
      template(slot='body'): textarea.textarea.cu(placeholder="message" v-model="body")
  div
    button.button.is-warning(@click='see_more' v-if="messages.length > 3" style='margin: 3px auto 20px auto; border-radius: 6px') see more

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
			messages: [],
			loading: false,
			n_see: 3
		};
	},
	async created() {
		await this.updateMessages();
	},
	methods: {
		see_more() {
			this.n_see += 3;
		},
		async updateMessages() {
			const now = new Date().getTime();
			this.messages = (await MessageService.getMessages())
				.sort((a, b) => b.broadcast_time - a.broadcast_time)
				.filter(e => {
					// return true
					return now > e.broadcast_time * 1000 && now < e.expiry * 1000;
				});
		},
		async send() {
			let { title, body } = this;
			this.loading = true;
			await MessageService.postMessage({
				message_title: title,
				message: body
			}).catch(error => this.$store.dispatch(ERROR, error));
			await this.updateMessages();
			await new Promise(resolve => {
				setTimeout(() => {
					resolve();
				}, 2000);
			});
			this.loading = false;
			this.title = '';
			this.body = '';
		}
	},
	computed: {
		sendable() {
			const permission = this.$store.getters.getPermissions;
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
