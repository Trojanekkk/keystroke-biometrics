<template>
  <b-modal
    id="modal-about"
    title="About the research"
    centered
    header-bg-variant="danger"
    header-text-variant="light"
    ok-only
    ok-title="Close"
    ok-variant="danger"
    size="lg"
  >
    <h5>The research</h5>
    <p>
      Donec ut tempor ipsum, eget dignissim sem. Duis in metus mollis, scelerisque est vel, convallis ligula. Quisque sem metus, scelerisque vel rhoncus eu, aliquet in velit. Morbi vestibulum urna quis nulla lacinia, et aliquam odio fringilla. Pellentesque efficitur, libero sit amet malesuada luctus, nibh odio condimentum nunc, quis pharetra libero dui in tortor. In interdum ultricies dignissim. Morbi ligula magna, accumsan in malesuada lobortis, congue non odio. Donec blandit a mauris condimentum facilisis. Maecenas libero odio, interdum at venenatis a, vehicula sed enim. Mauris scelerisque magna a sem commodo aliquam. Fusce lectus orci, commodo ut metus nec, dapibus semper tortor. Duis id nunc pharetra, faucibus odio at, convallis purus. Nulla eget sapien non justo cursus convallis eget sed massa. Sed vel nunc ex. Sed aliquam turpis sit amet tellus vestibulum, at hendrerit est porttitor. Nulla molestie id magna nec rutrum.
    </p>
    <h5>The experiment description</h5>
    <p>
      Nullam sagittis nibh nulla, a dictum orci porta sed. Praesent metus ante, luctus ac lorem non, mollis pellentesque risus. Duis placerat velit vitae rhoncus interdum. Curabitur arcu purus, condimentum et semper eu, vulputate non turpis. Aenean quis auctor metus, et imperdiet est. Interdum et malesuada fames ac ante ipsum primis in faucibus. In ac vulputate ligula, id facilisis mi. Sed sit amet urna id sem hendrerit fermentum a eu mauris. Cras ultricies volutpat lorem mollis pretium. Maecenas at elit et nibh tincidunt euismod. Quisque vel magna pharetra ligula posuere vestibulum ut et nibh. Morbi semper tristique dapibus. Nullam vel consequat mauris.
    </p>
    <h5>About the author</h5>
    <p>
      Etiam id cursus ipsum, in vehicula enim. Aenean non placerat augue. Integer velit neque, aliquet lacinia ultricies tincidunt, porta nec dui. Cras posuere sit amet neque vel lobortis. Integer vestibulum rutrum felis. Quisque interdum scelerisque commodo. Morbi venenatis enim sit amet enim tincidunt, ut luctus dolor lobortis. Quisque vitae pellentesque arcu, sed tristique purus.
    </p>
  </b-modal>
</template>

<script>
export default {
  data () {
    return {
      displayAbout: true
    }
  }
}
</script>

<style lang="scss">
#about {
  top: 0;
  left: 0;
  position: fixed;
  height: 100%;
  width: 100%;
}

p {
  text-align: justify;
}
</style>
