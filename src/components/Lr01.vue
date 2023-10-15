<template>
    <div id="bg_01"
        ref="lr_01"
        :style="{
            width: width,
            height: height,
            position: 'absolute',
            backgroundRepeat: 'repeate-x',
            backgroundPosition: 'center',
            backgroundSize: 'contain'
        }">
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed, onMounted } from "vue"
import { Bg } from "./lib/bg/lr_01"

export default defineComponent({
    name: "Lr01",

    setup() {
        const height = Bg.height+"px"
        const width = Bg.width+"px"
        let img = new Image()
        img.src = Bg.src
        const src64 = img.src

        onMounted(() => {
            const layOut = document.getElementById('bg_01')
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