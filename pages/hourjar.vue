<template>
  <article>
    <section>
      <h1>Hour Jar</h1>
      <div :class="jarState">
        <span class="hours">{{total}}</span>
        <abbr>hours</abbr>
      </div>
      <ul>
        <li v-for="row in rows" :key="row.index">
          <span class="date"><span>{{row.date.toDateString()}}</span></span>
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
    </section>
  </article>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      code: null,
      rows: [],
      total: null,
      state: 'empty'
    }
  },
  computed: {
    jarState: function () {
      return `jar jar-${this.state}`;
    }
  },
  fetch ({ store, params}) {
    console.log(store);
    console.log(params);
    this.code = params.code;
  },
  async mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    this.code = urlParams.get('code');
    const url = `https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/e/${this.code}/pub?output=csv`;
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
        date: date,
        credit: credit,
        debit: debit,
        total: total,
        tags: tags
      });
    }
    this.rows = data.reverse();
    this.total = total;
    if (total > 0) {
      this.state = "some";
    } else if (total == 0) {
      this.state = "empty";
    } else {
      this.state = "debt";
    }
  },
  head: {
    title: "Hour Jar"
  }
}
</script>

<style lang="scss">
article {
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
  text-align: center;
}
h1 {
  font-size: 3rem;
  margin: 0 0 2rem;
}
.jar {
  border-width: 0 3px 3px 3px;
  border-style: solid;
  border-color: #777;
  border-radius: 0 0 10px 10px;
  margin: 0 auto 5rem;
  padding: 3rem 0 1rem;
  width: 140px;
  span {
    display: block;
    font-size: 2rem;
  }
  &.jar-debt {
    span {
      color: red;
    }
  }
  &.jar-some {
    span {
      color: green;
    }
  }
}
ul {
  margin: 0;
  padding: 0;
  li {
    list-style: none;
    margin: 0;
    padding: 1rem 0;
    text-align: left;
    width: 300px;
    .calc {
      display: block;
      float: right;
    }
    .hours {
      color: #777;
      display: inline-block;
      font-size: 120%;
      padding-left: .5rem;
    }
    .credit {
      &:before {
        content: "+";
      }
    }
    .debit {
      &:before {
        content: "-";
      }
    }
    .total {
      color: white;
      &:before {
        content: "=";
      }
    }
    .tags {
      padding-top: .5rem;
      span span {
        background: #444;
        border-radius: 11px;
        display: inline-block;
        font-size: 90%;
        padding: 0 11px 2px;
        &.nrh {
          background: #E06437;
          color: white;
        }
        &.ess {
          background: #AF383A;
          color: white;
        }
        &.gck {
          background: #BA3EA9;
          color: white;
        }
        &.topup {
          background: green;
          color: white;
        }
      }
    }
  }
}
</style>
