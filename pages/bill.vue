<template>
  <article>
    <section>
      <back-home/>
      <h1>Bill Horsman</h1>
      <avatar name="Bill" image="bill.png"/>

      <p class="social">
        <a href="mailto:bill@logicalcobwebs.com"><i class="fas fa-fw fa-envelope"/></a>
        <a href="http://twitter.com/billhorsman"><i class="fab fa-fw fa-twitter"/></a>
        <a href="https://www.instagram.com/billhorsman/"><i class="fab fa-fw fa-instagram"/></a>
        <a href="http://github.com/billhorsman"><i class="fab fa-fw fa-github"/></a>
        <a href="https://medium.com/@billhorsman"><i class="fab fa-fw fa-medium"/></a>
        <a href="https://keybase.io/billhorsman"><i class="fab fa-fw fa-keybase"/></a>
      </p>
      <p>I'm a computer programmer for Logical Cobwebs with over 25 years experience in software development. I've been building web applications since 1997 - first in Java and then, since the start of 2007, in <span class="nowrap"><a href="https://rubyonrails.org/">Ruby on Rails</a>.</span></p>

      <p>I like to build beautiful interfaces that do useful jobs so that people can get things done quickly, easily and with fewer mistakes.</p>

      <p>I have used Ruby on Rails every day of my working life for the past ten years. Lately, I've been making more and more use of <span class="nowrap"><a href="https://vuejs.org/">Vue</a>.</span></p>

      <ul>
        <li><span>25 years worth of mistakes; doing things the hard way; learning from what went wrong. Trying to learn even more from what went right.</span></li>
        <li><span>Finishing projects and standing by them in production. Coding isn't all about the thrill of the new - it's also about detail and making it work.</span></li>
        <li><span>Striving to make things as simple as possible - whether that's for the end user or for another developer on my team. Or me, six months down the road. Clever solutions aren't necessarily cool.</span></li>
        <li><span>Sometimes, it takes a lot of thought to make something simple.</span></li>
        <li><span>Rigorous, automatic testing so I have the confidence to make changes.</span></li>
      </ul>

      <p>I've worked for banks, telecoms, government, education, distribution, retail and news media. Some of it has been at the leading edge using the latest tools; some of it has been the rigor of maintaining a financial system. All of it has taught me a great deal: language skills like Java and Ruby; coding skills like testing and transparency; business skills like communication and commitment.</p>
    </section>
  </article>
</template>

<script>
export default {
  head: {
    title: "Bill Horsman"
  }
}
</script>

<style lang="scss">
@import '@/assets/stylesheets/article.scss';
</style>
