<template>
    <div 
        id="bg_02"
        ref="lr_02"
        :style="{
            width: width,
            height: height,
            position: 'absolute',
            left: '0px',
            backgroundRepeat: 'repeate-x',
            backgroundPosition: 'center',
            backgroundSize: 'contain'
        }">
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed, onMounted } from "vue"
import { Bg } from "./lib/bg/lr_02"

export default defineComponent({
    name: "Lr02",

    setup() {
        const height = Bg.height+"px"
        const width = Bg.width+"px"
        let img = new Image()
        img.src = Bg.src
        const src64 = img.src

        onMounted(() => {
            const layOut = document.getElementById('bg_02')
            if(layOut) {
                layOut.style.backgroundImage = `url('${src64}')`
            }
        })

        return {
            width,
            height,
            src64
        }
    }
})
</script>

<style lang="scss">
    .bg {
        width: 100%;
        height: 100%;
        position: absolute;
    }
</style>