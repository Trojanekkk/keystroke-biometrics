<template>
  <div id="navbar">
    <span>
      The Web Interface for keystroke biometrics researches
    </span>
    <span id="btn" title="Read more about the research" @click="$bvModal.show('modal-about')">
      <b-icon-info-square />
    </span>
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
  font-size: 1.2rem;
  font-weight: 600;
  justify-content: space-between;
}

#navbar > span {
  padding: 1rem 1.5rem;
}

#btn {
  background-color: $accent;
  cursor: pointer;
  transition: .2s;
}

#btn:hover {
  background-color: $accent-2
}
</style>
