<template>
  <section class="container">
    <nav>
      <a href="/bill">
        <span class="name">Bill Horsman</span>
        <img src="~/assets/images/bill.png" alt="Bill">
        <span class="role">Computer Programmer</span>
      </a>
      <a href="/nonie">
        <span class="name">Nonie Coulthard</span>
        <img src="~/assets/images/nonie.jpg" alt="Bill">
        <span class="role">Nature Conservationist</span>
      </a>
    </nav>
  </section>
</template>

<script>
</script>

<style lang="scss">
section {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
a {
  border: 0;
  border-radius: 1rem;
  color: #ccc;
  display: inline-block;
  padding: 1rem 3rem;
  text-decoration: none;
  transition: all .3s;
  span {
    display: block;
    margin: .5rem 0;
    &.name {
      font-size: 1.3rem;
    }
  }
  img {
    filter: grayscale(100%);
  }
  &:hover {
    background: rgba(255, 255, 255, .1);
    color: white;
    img {
      filter: grayscale(30%);
    }
  }
}
img {
  border-radius: 50%;
  height: 160px;
  width: 160px;
}
</style>
