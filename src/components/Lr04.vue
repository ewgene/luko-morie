<template>
    <div 
        id="bg_04"
        ref="lr_04"
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
import { Bg } from "./lib/bg/lr_04"

export default defineComponent({
    name: "Lr04",

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