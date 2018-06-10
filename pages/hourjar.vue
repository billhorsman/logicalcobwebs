<template>
  <article>
    <section>
      <h1>Hour Jar</h1>
      <div :class="jarState">
        <span class="hours">{{total}}</span>
        <abbr>hours</abbr>
      </div>
      <ul :class="listClass">
        <li v-for="row in rows" :key="row.index">
          <span class="date"><span>{{row.date}}</span></span>
          <span class="calc">
            <span v-if="row.credit > 0" class="credit hours">{{row.credit.toFixed(1)}}</span>
            <span v-if="row.debit > 0" class="debit hours">{{row.debit.toFixed(1)}}</span>
            <span class="total hours">{{row.total.toFixed(1)}}</span>
          </span>
          <div class="tags">
            <span v-for="tag in row.tags" :key="tag">
              <span :class="tag" v-if="tag != ''">{{tag}}</span>
            </span>
          </div>
        </li>
      </ul>
      <a href="#" v-on:click.prevent="loadMore" :class="linkClass">See earlier entries</a>
      <p class="last-updated">Last updated at {{formattedLastUpdate}}</p>
    </section>
  </article>
</template>

<script>
import axios from "axios"
import moment from "moment"

export default {
  data() {
    return {
      rows: [],
      total: this.$store.state.total,
      stateOfJar: 'empty',
      showAll: false,
      loading: true,
      lastUpdate: null,
      formattedLastUpdate: '-'
    }
  },
  watch: {
    lastUpdate: function (val) {
      this.formattedLastUpdate = moment(val).format("H:mm:ss")
    }
  },
  computed: {
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
      console.log("Boom");
      this.showAll = true;
    },
    fetchData: async function() {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const googleUrl = `https://docs.google.com/spreadsheets/d/e/${code}/pub?output=csv`;
      const url = `https://cors-anywhere.herokuapp.com/${googleUrl}`;
      try {
        const response = await axios.get(url);
        const data = []
        let total = 0;
        for (let row of response.data.split('\n')) {
          const cols = row.split(',');
          const date = new Date(cols[0]);
          const credit = parseFloat(cols[1]) || 0;
          const debit = parseFloat(cols[2]) || 0;
          const tags = cols[3].trim().split(",");
          if (credit > 0) {
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
        this.$store.commit('update', [rows, total, this.stateOfJar, this.lastUpdate]);
        this.loading = false;
      } catch(error) {
        console.error(error)
      }
    }
  },
  async mounted() {
    this.total = this.$store.state.total
    this.rows = this.$store.state.rows
    this.stateOfJar = this.$store.state.stateOfJar
    this.loading = this.$store.state.loading
    this.lastUpdate = this.$store.state.lastUpdate
    setTimeout(this.fetchData, 2000)
  },
  head: {
    title: "Hour Jar"
  }
}
</script>

<style lang="scss">
@import '~/assets/stylesheets/hourjar.scss'
</style>
