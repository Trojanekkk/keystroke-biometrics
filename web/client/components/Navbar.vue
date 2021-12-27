<template>
  <div id="navbar">
    <span>
      Web interface for The Keystroke Biometrics Researches
    </span>
    <span id="popover-target" class="btn" @click="$bvModal.show('modal-about')">
      <b-icon-info-square />
    </span>
    <b-popover target="popover-target" triggers="hover" placement="bottom">
      Read more about the research
    </b-popover>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
#navbar {
  background-color: $accent;
  box-shadow: 0 0 1rem -.5rem black;
  color: $background-color;
  display: flex;
  font-size: 1.1rem;
  font-weight: 600;
  justify-content: space-between;
}

#navbar > span {
  padding: 1rem 1.5rem;
}

.btn {
  background-color: $accent;
  color: $background-color;
  cursor: pointer;
  transition: .2s;
}

.btn:hover {
  background-color: $accent-2
}
</style>
