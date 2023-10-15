<template>
  <div id="App">
    <Panorama />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, unref } from 'vue';
import Panorama from './components/Panorama.vue'

export default defineComponent({
  name: "App",
  components: { Panorama },

  setup() {

    let ready = false
    
    const lr_01:HTMLElement|any = ref()
    const lr_02:HTMLElement|any = ref()
    
    const lr_03 = ref()
    const lr_04 = ref()
    const lr_05 = ref()

    const stack:Array<HTMLElement | any> = []

    onMounted(() => {
      function stackLayers() {
        if(document.getElementById('bg_01')) {
  //        stack.push(document.getElementById('bg_01'))
          lr_01.value = document.querySelector('#bg_01')
        }
        if(document.getElementById('bg_02')) {
  //        stack.push(document.getElementById('bg_02'))
          lr_02.value = document.querySelector('#bg_02')
        }
      }
      stackLayers()
    })
    console.log(unref(lr_01), unref(lr_02))

/*    const lr_01 = stack[0]
    const lr_02 = stack[1]*/
  }
})

</script>
<style lang="scss">

body {
  margin: 0;
  padding: 0;
}
#scroll {
  position: relative;
  height: 650px;
}
</style>
