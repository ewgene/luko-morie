<template>
    <div id="scroll" 
      @mousedown="mX = $event.pageX"
      @mouseup="dX = $event.pageX"
      :style="{
        marginTop: scrollOffset+'px'
      }"
      >
  
      <div class="container" id="c01">
        <Lr01 ref="lr_01"/>
      </div>
      <div class="container" id="c02">
        <Lr02 ref="lr_02"/>
      </div>
      <div class="container" id="c03">
        <Lr03 ref="lr_03" />
      </div>
      <div class="container" id="c04">
        <Lr04 ref="lr_04"/>
      </div>
      <div class="container" id="c05">
        <Lr05 ref="lr_05" :deltaTick="deltaTick"/>
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
  import { ref, defineComponent, onMounted, watch, computed } from 'vue'
  import gsap from 'gsap'
  import Lr01 from "./Lr01.vue"
  import Lr02 from "./Lr02.vue"
  import Lr03 from "./Lr03.vue"
  import Lr04 from "./Lr04.vue"
  import Lr05 from "./Lr05.vue"
  
  import { oklad_top } from "../components/lib/bg/oklad_top"
  import { oklad_bottom } from "../components/lib/bg/oklad_bottom"
import { lr_05_djadka } from './chars/lr_05_djadka'
  
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
  
      const deltaTick:number|any = ref(0)
  
      const top = ref(oklad_top.src)
      const bot = ref(oklad_bottom.src)
  
      const scrollHeight = 650
      const scrollOffset = ref(0)

      const copy = ref(null)
  
  
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
/*        function stackLayers() {
          if(document.querySelector('#bg_01')) {
            lr_01.value = computed(() => document.querySelector('#bg_01'))
          }
          if(document.querySelector('#bg_02')) {
            lr_02.value?.$el = computed(() => document.querySelector('#bg_02'))
          }
          if(document.querySelector('#bg_03')) {
            lr_03.value?.$el = computed(() => document.querySelector('#bg_03'))
          }
          if(document.querySelector('#bg04')) {
            lr_04.value?.$el = computed(() => document.querySelector('#bg_04'))
          }
          if(document.querySelector('#bg_05')) {
            lr_05.value?.$el = computed(() => document.querySelector('#bg_05'))
          }
        }
        stackLayers()*/
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
      }

      function insertComponent(parent:string, src:string, direction:number) {

        if(Math.round(lr_05.value?.$el.getBoundingClientRect().x) === 0 
          || Math.floor(lr_05.value?.$el.getBoundingClientRect().rightt) === window.innerWidth) {
          let container = document.getElementById(parent)
          console.log(container, src, direction)

          
        }
        
      }
  
      function moveStack() {
        gsap.to(lr_01.value?.$el, {
            x: delta.value,
            ease: 'none',
            duration: 10
          }
        )
        gsap.to(lr_02.value?.$el, {
            x: delta.value*1.203000,
            ease: 'none',
            duration: 10
          }
        )
        gsap.to(lr_03.value?.$el, {
            x: delta.value*1.330000,
            ease: 'none',
            duration: 10
          }
        )
        gsap.to(lr_04.value?.$el, {
            x: delta.value*1.71400,
            ease: 'none',
            duration: 10
          }
        )
        gsap.to(lr_05.value?.$el, {
            x: delta.value*2.356000,
            ease: 'none',
            duration: 10,
            onUpdate: () => {
              let direction = delta.value > 0? 1 : -1
              insertComponent('c05', 'Lr05', direction)},
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
        deltaTick,
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