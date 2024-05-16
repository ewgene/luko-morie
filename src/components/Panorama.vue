<template>
  <div id="scroll" 
    @mousedown="mX = $event.pageX"
    @mouseup="dX = $event.pageX"
    :style="{
      marginTop: scrollOffset+'px'
    }"
    >

    <div class="container">
      <Lr01 />
    </div>
    <div class="container">
      <Lr02 />
    </div>
    <div class="container">
      <Lr03 />
    </div>
    <div class="container">
      <Lr04 />
    </div>
    <div class="container">
      <Lr05 />
    </div>
    
    <div 
      class="oklad-top"
      id="oklad_top"
      :style = "{
        position: 'fixed',
        left: topPos+'px',
        top: scrollOffset+'px',
        width: okladTop.width+'px',
        height: okladTop.height+'px',
        backgroundImage: `url('${top}')`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
      }"></div>
    <div class="display">position is at: {{ delta }} : {{ beginning }} : {{ ending  }}</div> 
    <div 
      class="oklad-bot"
      id="oklad_bot"
      :style = "{
        position: 'fixed',
        left: botPos+'px',
        bottom: scrollOffset+'px',
        width: okladBottom.width+'px',
        height: okladBottom.height+'px',
        backgroundImage: `url('${bot}')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }"></div>
  </div>
  
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, watch } from 'vue'
import gsap from 'gsap'
import Lr01 from "./Lr01.vue"
import Lr02 from "./Lr02.vue"
import Lr03 from "./Lr03.vue"
import Lr04 from "./Lr04.vue"
import Lr05 from "./Lr05.vue"

import { oklad_top } from "../components/lib/bg/oklad_top"
import { oklad_bottom } from "../components/lib/bg/oklad_bottom"

export default defineComponent({
  name: "Panorama",
  components: {
    Lr01,
    Lr02,
    Lr03,
    Lr04,
    Lr05
  },

  setup() {    
    const mX = ref(0)
    const dX = ref(0)
    const delta = ref(0)
    const drag = ref(false)
    const current = ref(0)
    const beginning = ref(0)
    const ending = ref(0)
    const midpoint = screen.width/2;
    const lr_01:HTMLElement|any = ref()
    const lr_02:HTMLElement|any = ref()    
    const lr_03:HTMLElement|any = ref()
    const lr_04:HTMLElement|any = ref()
    const lr_05:HTMLElement|any = ref()

    const top = ref(oklad_top.src)
    const bot = ref(oklad_bottom.src)

    const scrollHeight = 650
    const scrollOffset = ref(0)


    const topPos = ref(0)
//    const topOffset = ref(0)
    const botPos = ref(0)
//    const botOffset = ref(0)

    const okladTop = {
      width: oklad_top.width,
      height: oklad_top.height,
      src: oklad_top.src
    }

    const okladBottom = {
      width: oklad_bottom.width,
      height: oklad_bottom.height,
      src: oklad_bottom.src
    }

    onMounted(() => {
      function stackLayers() {
        if(document.getElementById('bg_01')) {
          lr_01.value = document.querySelector('#bg_01')
        }
        if(document.getElementById('bg_02')) {
          lr_02.value = document.querySelector('#bg_02')
        }
        if(document.getElementById('bg_03')) {
          lr_03.value = document.querySelector('#bg_03')
        }
        if(document.getElementById('bg_04')) {
          lr_04.value = document.querySelector('#bg_04')
        }
        if(document.getElementById('bg_05')) {
          lr_05.value = document.querySelector('#bg_05')
        }
      }
      stackLayers()
      scrollOffset.value = (window.innerHeight - scrollHeight)/2
      topPos.value = (window.innerWidth - okladTop.width)/2
      botPos.value = (window.innerWidth - okladBottom.width)/2
    })

    watch(mX, ()=> {
      drag.value = true
      current.value = Math.round(lr_01.value.getBoundingClientRect().x)
      beginning.value = Math.round(lr_01.value.getBoundingClientRect().left)
      ending.value = Math.round(lr_01.value.getBoundingClientRect().right)
    })

    watch(dX, ()=> {
      delta.value = current.value + dX.value - mX.value
      update(delta.value)
    })
    
    function callback() {
      drag.value = false
      delta.value = 0
    }

    function moveStack() {
      console.log(lr_01.value.getBoundingClientRect().x)
      gsap.to(lr_01.value, {
          x: delta.value,
          ease: 'none',
          duration: 10
        }
      )
      gsap.to(lr_02.value, {
          x: delta.value*1.203000,
          ease: 'none',
          duration: 10
        }
      )
      gsap.to(lr_03.value, {
          x: delta.value*1.330000,
          ease: 'none',
          duration: 10
        }
      )
      gsap.to(lr_04.value, {
          x: delta.value*1.71400,
          ease: 'none',
          duration: 10
        }
      )
      gsap.to(lr_05.value, {
          x: delta.value*2.356000,
          ease: 'none',
          duration: 10,
          onComplete: callback
        }
      )
    }

    function update(delta:number) {

      if(mX.value < dX.value) {
        delta = delta + Math.abs((mX.value - dX.value)/50)
      }
      if(mX.value > dX.value) {
        delta = delta - Math.abs((mX.value - dX.value)/50)
      }
      moveStack()

    }

    return {
      lr_01,
      lr_02,
      lr_03,
      lr_04,
      lr_05,
      scrollHeight,
      scrollOffset,
      okladTop,
      okladBottom,
      topPos,
      botPos,
      top,
      bot,
      midpoint,
      mX,
      dX,
      current,
      beginning,
      ending,
      delta,
      update
    }
  }
})


</script>

<style lang="scss">
#scroll {
  position: relative;
  height: 650px;
  overflow: hidden;

  .container {
    width: 100%;
    height: 650px;
    position: absolute;
  }
  .display {
    position: absolute;
    top: 0;
    width: 100%;
    text-align: center;
  }
}

</style>
