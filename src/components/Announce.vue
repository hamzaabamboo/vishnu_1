<template>
<div>
  <h1 class="is-size-3">Announce</h1>
  <div>
    <table class='table'>
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
    </table>
  </div>
</div>
</template>

<script>
import moment from 'moment'
import _ from 'lodash'
export default {
  data() {
    return {
      text: {},
      announce: [
      ]
    }
  },
  methods: {
    send(){
      this.announce.push(_.assign({date: moment()}, this.text))
      console.log(this.announce)
      this.text = {}
    }
  }
}
</script>

<style scoped>
.table {
  width: 100%;
}
button, input, textarea {
  width: 100%;
}
</style>
