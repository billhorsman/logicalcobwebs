<template>
  <article>
    <section>
      <h1>Hour Jar</h1>
      <div :class="jarState">
        <span class="hours">{{total}}</span>
        <abbr>hours</abbr>
      </div>
      <table>
        <tr v-for="row in rows" :key="row.index">
          <td class="date"><span>{{row.date.toDateString()}}</span></td>
          <td class="credit hours"><span v-if="row.credit > 0">{{row.credit}}</span></td>
          <td class="debit hours"><span v-if="row.debit > 0">{{row.debit}}</span></td>
          <td class="total hours"><span>{{row.total}}</span></td>
          <td class="tags">
            <span v-for="tag in row.tags" :key="tag">
              <span :class="tag" v-if="tag != ''">{{tag}}</span>
            </span>
          </td>
        </tr>
      </table>
    </section>
  </article>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
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
  async mounted() {
    const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR74PfiCKN05Nfv8WHDEp3gHBRb2O0IdmdwHMK52taSQhLNvEXd3db2nF-Mh60iFeu-Av2v2o3PYWPu/pub?output=csv";
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
  padding: 0 0 1rem;
  width: 140px;
  span {
    display: block;
    font-size: 5rem;
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
table {
  border-collapse: collapse;
  td {
    border: 1px solid #444;
    padding: 1rem;
    text-align: right;
    &.hours {
      width: 5rem;
    }
    &.credit {
      span:before {
        content: "+";
      }
    }
    &.tags {
      border: 0;
      text-align: left;
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
