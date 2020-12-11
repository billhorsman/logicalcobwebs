<template>
  <section class="container">
    <main>
      <nav>
        <a href="/bill">
          <span class="name">Bill Horsman</span>
          <img src="~/assets/images/bill.jpg" alt="Bill" />
          <span class="role">Computer Programmer</span>
        </a>
        <a href="/nonie">
          <span class="name">Nonie Coulthard</span>
          <img src="~/assets/images/nonie.jpg" alt="Nonie" />
          <span class="role">Nature Conservationist</span>
        </a>
      </nav>
    </main>
  </section>
</template>

<style lang="scss" scoped>
section {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
nav {
  display: flex;
  justify-content: between;
}
a {
  align-items: center;
  border: 0;
  border-radius: 1rem;
  color: #444;
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem;
  text-decoration: none;
  transition: all 0.3s;
  span {
    margin: 0.5rem 0;
    &.name {
      font-size: 1.3rem;
    }
  }
  img {
    filter: grayscale(100%);
  }
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #000;
    img {
      filter: grayscale(30%);
    }
  }
  @media (max-width: 480px) {
    span.name {
      font-size: 1rem;
    }
    span.role {
      font-size: 0.9rem;
    }
  }
}
img {
  border-radius: 50%;
  height: 160px;
  width: 160px;
  @media (max-width: 480px) {
    height: 120px;
    width: 120px;
  }
}

@media (prefers-color-scheme: dark) {
  a {
    color: #c9d1d9;
    &:hover {
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
    }
  }
}
</style>
