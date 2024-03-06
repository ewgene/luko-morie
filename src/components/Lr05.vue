<template>
    <div 
        id="bg_05"
        ref="lr_05"
        :style="{
            width: width,
            height: height,
            position: 'absolute',
            left: '0px',
            backgroundImage: `url('${src64}')`,
            backgroundRepeat: 'repeate-x',
            backgroundPosition: 'center',
            backgroundSize: 'contain'
        }">
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed, onMounted } from "vue"
import { Bg } from "./lib/bg/lr_05"

export default defineComponent({
    name: "Lr05",

    setup() {
        const height = Bg.height+"px"
        const width = Bg.width+"px"
        let img = new Image()
        img.src = Bg.src
        const src64 = img.src

        return {
            width,
            height,
            src64
        }
    }
})
</script>

<style lang="scss">
</style>