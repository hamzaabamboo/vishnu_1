<template lang='pug'>
  div.__card
      div._margin
        span.title.is-5.is-inline: slot(name='title')
        span.subtitle.is-5.is-inline: slot(name='author')
      div._margin
        slot(name='body')
        span(v-if='add'): button.add.button.is-success.is-inline.margin0(@click='$emit("click")' :disabled='disabled') Go
</template>

<script>
export default {
	props: ['add', 'disabled']
};
</script>


<style>
.add {
	width: 30%;
	margin: 5px auto 0 auto;
}
.__card ._margin {
	margin: 5px;
}
.__card {
	background-color: white;
	border-radius: 6px;
	margin: 3px 0;
	padding: 0.3rem 1rem;
	position: relative;
	width: 100%;
}
@media only screen and (max-width: 2000px) {
	.__card {
		width: 33%;
	}
}
@media only screen and (max-width: 1000px) {
	.__card {
		width: 49.5%;
	}
}
@media only screen and (max-width: 600px) {
	.__card {
		width: 100%;
	}
}
</style>
