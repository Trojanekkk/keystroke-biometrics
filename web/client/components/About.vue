<template>
  <b-modal
    id="modal-about"
    title="About the research"
    centered
    header-bg-variant="success"
    header-text-variant="light"
    ok-only
    ok-title="Close"
    ok-variant="success"
    size="xl"
  >
    <div id="about_body">
      <h5><br>About the author</h5>
      <p />
      <i>
        <p>
          My name is Wojciech Trojanowski, and I'm a student of Information and Telecommunication Technologies with a burning passion for digital security. I'm currently on my final semester at the Wrocław University of Science and Technology, working on my master's thesis (and the experiment is a part of it). <br> When I'm not buried in my studies, I'm a huge film buff and you can often find me rubbing shoulders at various film festivals. Oh, and did I mention I'm also an active member of the Wrocław community, organizing all sorts of exciting events? So, yeah, I keep pretty busy ;)
        </p>
        <p>
          But let's get back to the experiment, shall we?
        </p>
      </i>
      <h5><br>Why keystroke biometry? And what does it actually mean?</h5>
      <p />
      <p>
        What you're seeing right now is all about digital security systems. You know, everyone's got their own unique traits—eye retinas, fingerprints, and even... the way we tickle the keyboard(!). We all have our own distinct keystroke style. And guess what? We can use that to build a security system based on our behavioral quirks. The idea is that your computer (in theory) can tell if it's you or someone else using it and then block access to certain sensitive functions depend on the answer. Pretty nifty, huh? And the best part is, it doesn't inconvenience the user at all. No extra steps, no password headaches. You just go about your business as usual.
        Some banks are already using this kind of security on their websites to make sure it's really the account owner logging in, so it's not that niche solution.
      </p>
      <h5><br>The experiment</h5>
      <p />
      <p>
        Now, as we already know that the way we type on a keyboard is unique to each of us. So, the aim of my master's thesis and this research is to figure out if there are any differences when a person uses their native language versus a second language like English. Do these unique typing characteristics change across different languages? And can we spot those differences? If we can, what are they going to be?
      </p>
      <p>
        Let's let it be like a little adventure we're embarking on together! :)
      </p>
    </div>
  </b-modal>
</template>

<script>
export default {
  data () {
    return {
      displayAbout: false
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
#about_body {
  padding: 0rem 2rem;
}
p {
  text-align: justify;
}
</style>
