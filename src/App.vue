<template>
  <div id="App">
    <Panorama />
    <div class="display">Mouse position is at: {{ delta }}</div>
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
    const mX = ref(0)
    const mY = ref(0)
    const delta = ref(2525)
    const dir = ref('')
    const midpoint = screen.width/2;
    
    const lr_01:HTMLElement|any = ref()
    const lr_02:HTMLElement|any = ref()
    
    const lr_03 = ref()
    const lr_04 = ref()
    const lr_05 = ref()

    onMounted(() => {
      function stackLayers() {
        if(document.getElementsByClassName('bg01')) {
          lr_01.value = document.querySelector('#bg_01')
        }
        if(document.getElementById('bg_02')) {
          lr_02.value = document.querySelector('#bg_02')
        }
      }
      stackLayers()

      function currPos(obj:HTMLElement) {
        return obj.getBoundingClientRect().left
      }

      function moveStack() {
        let lr01 = lr_01.value
        gsap.to(lr01, {
          left: +delta.value+'px',
          ease: 'none',
          duration: 10
        })

      }

      function update(event:any) {
        mX.value = event.pageX
        mY.value = event.pageY
        delta.value = Math.round(mX.value - midpoint) 

        if(mX.value === midpoint)
        {
          delta.value = 0
        }
        if(mX.value < midpoint) {
          delta.value += Math.round((mX.value - midpoint)/50)
        }
        if(mX.value > midpoint) {
          delta.value -= Math.round((mX.value - midpoint)/50)
        }
        moveStack()
      }            
      window.addEventListener('mousemove', update)
    })
    return {
      lr_01,
      lr_02,
      midpoint,
      delta
    }
  }
})

</script>
<style lang="scss">

body {
  margin: 0;
  padding: 0;
}
.display {
  position: absolute;
  top: 0;
  width: 100%;
  text-align: center;
}
#scroll {
  position: relative;
  height: 650px;
}

</style>
