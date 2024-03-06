<template>
  <div id="App">
      <Panorama/>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue'
import gsap from 'gsap'
import Panorama from './components/Panorama.vue'

export default defineComponent({
  name: "App",
  components: { Panorama },

  setup() {

  }
})

</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  overflow: hidden;
}

</style>
