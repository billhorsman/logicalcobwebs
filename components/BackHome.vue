<template>
  <a href="/" class="back-home"
    ><i class="fas fa-angle-double-left" />Back home</a
  >
</template>

<style lang="scss">
.back-home {
  border: 0;
  display: inline-block;
  margin: 0 0 0.2rem -25px;
  padding: 5px;
  i {
    margin-right: 6px;
  }
  &:hover {
    text-decoration: none;
  }
  @media (max-width: 575px) {
    margin-left: 0;
  }
}
</style>
