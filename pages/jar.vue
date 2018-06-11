<template>
  <article>
    <section>
      <h1>jar</h1>
      <div :class="jarState">
        <span class="hours">{{total}}</span>
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 500 600" style="enable-background:new 0 0 500 600;" xml:space="preserve" :class=" svgClass">
        <path class="lid" d="
        M 70 115
        v -20
        c 0 -20, 0 -40, 40 -40
        h 20

        m 240 0

        h 20
        c 40 0, 40 20, 40 40
        v 20
        "/>"
        <path class="name" d="
        M 150 55

        h 40
        v 70
        c 0 20, -20 55, -35 60
        m 65 -130


        h 20
        c 20 0, 30, 0, 30, 30
        v 45
        h -20
        c -40 0, -40 -40, 15 -40
        m 45 50

        v -55
        c 0 -20, 10 -30, 30 -30
        h 10
        m 20 0

        "/>"
        <circle cx="180" cy="15" r="12" />
        <path class="black" d="
        M 335 31
        h 50
        "/>"
        <path class="jar" d="
        M 105 80
        v 40
        c 0 20, -20 30, -40 40
        c -20 10, -55 30, -50 100
        c 10 100, 10 160, 0 260
        c 0 30, 40 70, 70 70
        c 10 0, 20 -3, 30 -5
        c 50 -15, 220 -15, 270 0
        c 10 2, 20 5, 30 5
        c 30 0, 70 -40, 70 -70
        c -10 -100, -10 -160, 0 -260
        c 5 -70, -30 -90, -50 -100
        c -20 -10, -40 -20, -40 -40
        v -40
        "/>
      </svg>
      </div>
      <ul :class="listClass">
        <template v-for="row in rows">
          <hour-jar-row
            :date="row.date"
            :credit="row.credit"
            :debit="row.debit"
            :total="row.total"
            :tags="row.tags"
            :key="row.index"
            >
          </hour-jar-row>
        </template>
      </ul>
      <a href="#" v-on:click.prevent="loadMore" :class="linkClass">See earlier entries</a>
      <p class="last-updated">
        <i class="fa fa-spinner fa-spin" v-show="updating"></i>
        Data fetched at {{formattedLastUpdate}}
      </p>
    </section>
  </article>
</template>

<script>
import Vue from 'vue'
import axios from "axios"
import moment from "moment"

import HourJarRow from '~/components/HourJarRow.vue'
Vue.component('hour-jar-row', HourJarRow)

export default {
  data() {
    return {
      code: null,
      rows: [],
      total: this.$store.state.total,
      stateOfJar: 'empty',
      showAll: false,
      loading: true,
      lastUpdate: null,
      formattedLastUpdate: '-',
      updating: false
    }
  },
  watch: {
    lastUpdate: function (val) {
      this.formattedLastUpdate = moment(val).format("H:mm:ss")
    }
  },
  computed: {
    svgClass: function () {
      if (this.loading) {
        return "preanimate"
      } else {
        return "done"
      }
    },
    jarState: function () {
      if (this.loading) {
        return "jar jar-loading";
      } else {
        return `jar jar-${this.stateOfJar}`;
      }
    },
    listClass: function() {
      if (this.showAll) {
        return "show-all";
      } else {
        return "show-some";
      }
    },
    linkClass: function() {
      if (this.showAll || this.rows.length == 0) {
        return "hidden";
      } else {
        return "";
      }
    }
  },
  methods: {
    loadMore: function () {
      this.showAll = true;
    },
    fetchData: async function() {
      if (this.code) {
        this.updating = true
        const tinyUrl = `https://tinyurl.com/${this.code}`;
        const url = `https://cors-anywhere.herokuapp.com/${tinyUrl}`;
        const response = await axios.get(url);
        const data = []
        let total = 0;
        for (let row of response.data.split('\n')) {
          const cols = row.split(',');
          const date = new Date(cols[0]);
          const credit = parseFloat(cols[1]) || 0;
          const debit = parseFloat(cols[2]) || 0;
          const tags = []
          for (let t of cols[3].trim().split(",")) {
            if (t != '') {
              tags.push(t)
            }
          }
          if (credit > 0 & tags.length == 0) {
            tags.push("topup");
          }
          total = total + credit - debit;
          data.push({
            index: data.length + 1,
            date: date.toDateString(),
            credit: credit,
            debit: debit,
            total: total,
            tags: tags
          });
        }
        const rows = data.reverse();
        this.rows = rows;
        this.total = total;
        if (total > 0) {
          this.stateOfJar = "some";
        } else if (total == 0) {
          this.stateOfJar = "empty";
        } else {
          this.stateOfJar = "debt";
        }
        this.lastUpdate = moment().format();
        this.$store.commit('update', [this.code, {
          total: this.total,
          rows: this.rows,
          stateOfJar: this.stateOfJar,
          loading: false,
          lastUpdate: this.lastUpdate
        }]);
        this.loading = false;
        this.updating = false
      }
    }
  },
  async mounted() {
    this.code = (new URLSearchParams(window.location.search)).get('code')
    const jar = this.$store.state.jars[this.code]
    if (jar) {
      this.total = jar.total
      this.rows = jar.rows
      this.stateOfJar = jar.stateOfJar
      this.loading = jar.loading
      this.lastUpdate = jar.lastUpdate
    }
    this.fetchData()
  },
  head: {
    title: "Jar"
  }
}
</script>

<style lang="scss">
@import '~/assets/stylesheets/jar.scss';
</style>
