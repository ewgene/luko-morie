<template>
  <div id="scroll">
    <Lr01 />
    <Lr02 />
  </div>
  
</template>

<script lang="ts">
import Lr01 from "./Lr01.vue"
import Lr02 from "./Lr02.vue"
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: "Panorama",
  components: {
    Lr01,
    Lr02
  },

  setup() {

  }
})


</script>

<style lang="scss">
#scroll {
  position: relative
}

</style>
