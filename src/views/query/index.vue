<template lang='pug'>
  section.section
    div.container.box
      h1.title ID {{id}}
      div(v-if='udata !== undefined')
        table.container
          tbody
            tr(v-for='k in Object.keys(udata)' :key="k.id")
              td.has-text-right {{k}}
              td.has-text-left {{udata[k]}}
      div.subtitle(v-else) ERROR: not found
</template>

<script>
export default {
	data() {
		return {
			id: this.$route.params.id,
			udata: FreshService.query(this.$route.params.id)
		};
	}
};
</script>

<style lang='stylus' scoped>
.box {
	max-width: 90%;
	overflow: scroll;
}
td {
	padding: 5px 15px;
}
</style>
