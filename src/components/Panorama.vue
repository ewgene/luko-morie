<template>
    <div id="scroll" 
      @mousedown="mX = $event.pageX"
      @mouseup="dX = $event.pageX"
      :style="{
        marginTop: scrollOffset+'px'
      }"
      >
  
      <div class="container" id="c01">
        <ul id="layer_01">
          <li id="lr_01_orig"
              class="layer">
            <Lr01 
              ref="lr_01"/>
          </li>
        </ul>
      </div>
      <div class="container" id="c02">
        <ul id="layer_02">
          <li id="lr_02_orig"
              class="layer">
            <Lr02 
              class="layer"
              ref="lr_02"/>
          </li>
        </ul>
      </div>
      <div class="container" id="c03">
        <ul id="layer_03">
          <li id="lr_03_orig"
              class="layer">
            <Lr03 
              class="layer"
              ref="lr_03"/>
          </li>
        </ul>
      </div>
      <div class="container" id="c04">
        <ul id="layer_04">
          <li id="lr_04_orig"
              class="layer">
            <Lr04 
              class="layer"
              ref="lr_04"/>
          </li>
        </ul>
      </div>
      <div class="container" id="c05">
        <ul id="layer_05">
          <li id="lr_05_orig"
              class="layer">
            <Lr05 
              class="layer"
              ref="lr_05"
              :deltaTick="deltaTick"/>
          </li>
        </ul>
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
import { ref, defineComponent, onMounted, watch, computed, createApp } from 'vue'
import gsap from 'gsap'
import Lr01 from "./Lr01.vue"
import Lr02 from "./Lr02.vue"
import Lr03 from "./Lr03.vue"
import Lr04 from "./Lr04.vue"
import Lr05 from "./Lr05.vue"

import { oklad_top } from "../components/lib/bg/oklad_top"
import { oklad_bottom } from "../components/lib/bg/oklad_bottom"
import { App } from 'vue'
  
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
    const lr_01 = ref<InstanceType<typeof Lr01> | null>(null)
    const lr_02 = ref<InstanceType<typeof Lr02> | null>(null)   
    const lr_03 = ref<InstanceType<typeof Lr03> | null>(null)
    const lr_04 = ref<InstanceType<typeof Lr04> | null>(null)
    const lr_05 = ref<InstanceType<typeof Lr05> | null>(null)
    const layer_01 = ref<HTMLElement | any>()
    const layer_02 = ref<HTMLElement | any>()
    const layer_03 = ref<HTMLElement | any>()
    const layer_04 = ref<HTMLElement | any>()
    const layer_05 = ref<HTMLElement | any>()

    const deltaTick:number|any = ref(0)

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
      function buildStack() {
        layer_01.value = document.getElementById('layer_01')
        layer_02.value = document.getElementById('layer_02')
        layer_03.value = document.getElementById('layer_03')
        layer_04.value = document.getElementById('layer_04')
        layer_05.value = document.getElementById('layer_05')
      }
      buildStack()
      scrollOffset.value = (window.innerHeight - scrollHeight)/2
      topPos.value = (window.innerWidth - okladTop.width)/2
      botPos.value = (window.innerWidth - okladBottom.width)/2
    })

    watch(mX, ()=> {
      drag.value = true
      current.value = Math.round(lr_01.value?.$el.getBoundingClientRect().x)
      beginning.value = Math.round(lr_01.value?.$el.getBoundingClientRect().left)
      ending.value = Math.round(lr_01.value?.$el.getBoundingClientRect().right)
    })

    watch(dX, ()=> {
      delta.value = current.value + dX.value - mX.value
      update(delta.value)
    })
    
    function callback() {
      deltaTick.value = delta.value*2.356
      console.log(deltaTick.value)
      drag.value = false
      delta.value = 0
      console.log(document.querySelector('#copy-left')?.getBoundingClientRect().x)
    }

    const ancorLr05:number|any = computed(()=> {
        return layer_05.value?.getBoundingClientRect().left}
    )

    function insertComponent(parent:HTMLElement|any, src:App, ancor:number, wdth:number, direction:string) {

//        console.log(layer_05.value?.getBoundingClientRect().left)

      if(Math.round(layer_05.value?.getBoundingClientRect().left) === 0 
        || Math.floor(layer_05.value?.getBoundingClientRect().right) === window.innerWidth) {
        let container:HTMLElement|any = parent
        console.log(container, src, ancor, wdth, direction)
        
        if(direction == 'right') {
          let html = "<li id='copy' class='layer left' style='width:"+wdth+"px'>"+src+"</li></nobr>"
          if(!document.querySelector('#copy')) {
            container?.insertAdjacentHTML("afterbegin", html)
            let target: HTMLElement | null = document.querySelector('#copy')
            
            if (target) {
              src.mount(target)
              
              gsap.to(target, {
                left: -wdth + delta.value * 2.356000,
                ease: 'none',
              duration: 0
            })
          }
        } else {
          let html = "</nobr><li id='copy' class='layer' style='width:"+wdth+"px'>"+src+"</li>"
          if(!document.querySelector('#copy')) {
            container?.insertAdjacentHTML("beforeend", html)
            let target:HTMLDListElement|any = document.querySelector('#copy')
            
            src.mount(target)
            
            gsap.to(target, {
              left: - wdth + delta.value * 2.356000,
              ease: 'none',
              duration: 0
            })
          }
        }
      }        
    }
  }

    function moveStack() {
      gsap.to(layer_01.value, {
          x: delta.value,
          ease: 'none',
          duration: 10
        }
      )
      gsap.to(layer_02.value, {
          x: delta.value*1.203000,
          ease: 'none',
          duration: 10
        }
      )
      gsap.to(layer_03.value, {
          x: delta.value*1.330000,
          ease: 'none',
          duration: 10,
          onUpdate: () => {
            let direction = delta.value > 0? 'right' : 'left'
            let ancor = lr_05.value?.$el.getBoundingClientRect().left
            let wdth:number|any = document.querySelector('#bg_05')?.getBoundingClientRect().width
            let parent:HTMLDListElement|any = document.querySelector('#layer_05')
            const src:App = createApp(Lr05) 
            insertComponent(parent, src, ancor, wdth, direction)},
        }
      )
      gsap.to(layer_04.value, {
          x: delta.value*1.71400,
          ease: 'none',
          duration: 10,
          onUpdate: () => {
            let direction = delta.value > 0? 'right' : 'left'
            let ancor = lr_05.value?.$el.getBoundingClientRect().left
            let wdth:number|any = document.querySelector('#bg_04')?.getBoundingClientRect().width
            let parent:HTMLDListElement|any = document.querySelector('#layer_04')
            const src:App = createApp(Lr04) 
            insertComponent(parent, src, ancor, wdth, direction)},
        }
      )
      gsap.to(layer_05.value, {
          x: delta.value*2.356000,
          ease: 'none',
          duration: 10,
          onUpdate: () => {
            let direction = delta.value > 0? 'right' : 'left'
            let ancor = lr_05.value?.$el.getBoundingClientRect().left
            let wdth:number|any = document.querySelector('#bg_05')?.getBoundingClientRect().width
            let parent:HTMLDListElement|any = document.querySelector('#layer_05')
            const src:App = createApp(Lr05) 
            insertComponent(parent, src, ancor, wdth, direction)},
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
      layer_01,
      layer_02,
      layer_03,
      layer_04,
      layer_05,
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
      deltaTick,
      update,
      ancorLr05
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

    & * {
      margin: 0;
      padding: 0;
    }

    ul {
      list-style-type: none;
      white-space: nowrap;
      overflow: visible;        

      li {
        display: inline-block;
      }
    }

    .layer {
      height: 650px;
      display: inline-block;
      position: absolute;
    }

    .copy {
      background-color: #ccc;
      position: absolute;
      display: inline-block;
      height: 650px;
    }
  }
  .display {
    position: absolute;
    top: 0;
    width: 100%;
    text-align: center;
  }
}

</style>
