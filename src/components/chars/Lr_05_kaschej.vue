<template>
    <div 
        id="kaschej"
        ref="kaschej"
        :style="{
            width: width,
            height: height,
            position: 'absolute',
            left: '4539.5px',
            top: '132px',
            backgroundImage: `url('${src64}')`,
            backgroundPosition: 'center',
            backgroundSize: 'contain'
        }">
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed, onMounted } from "vue"
import { lr_05_kaschej } from "./lr_05_kaschej"

export default defineComponent({
    name: "Lr_05_kaschej",

    setup() {
        const height = lr_05_kaschej.height+"px"
        const width = lr_05_kaschej.width+"px"

        let img = new Image()
        img.src = lr_05_kaschej.src
        const src64 = img.src

        return {
            width,
            height,
            src64,
            lr_05_kaschej
        }
    }
})
</script>

<style lang="scss">
</style>