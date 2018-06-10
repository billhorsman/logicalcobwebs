<template lang="html">
  <li>
    <span class="date"><span>{{date}}</span></span>
    <span class="calc">
      <span v-if="credit > 0" class="credit hours">{{credit}}</span>
      <span v-if="debit > 0" class="debit hours">{{debit}}</span>
      <span class="total hours">{{total}}</span>
    </span>
    <div class="tags">
      <span v-for="tag in tags" :key="tag">
        <span :class="tag" v-if="tag != ''">{{tag}}</span>
      </span>
    </div>
  </li>
</template>

<script>
export default {
  props: [
    "date",
    "credit",
    "debit",
    "total",
    "tags"
  ]
}
</script>
