<template>
  <p>
    <img :src="avatarPath" class="avatar" :alt="name" />
  </p>
</template>

<script>
export default {
  props: ['name', 'image'],

  computed: {
    avatarPath: function () {
      return require(`~/assets/images/${this.image}`)
    },
  },
}
</script>

<style lang="scss">
.avatar {
  border-radius: 50%;
  height: 100px;
  width: 100px;
}
</style>
