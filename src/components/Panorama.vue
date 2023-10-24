<template>
  <div id="scroll">
    <div class="container">
      <Lr01 />
    </div>
    <div class="container">
      <Lr02 />
    </div>
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
  position: relative;

  .container {
    width: 100%;
    height: 650px;
    position: absolute;
  }
}


</style>
