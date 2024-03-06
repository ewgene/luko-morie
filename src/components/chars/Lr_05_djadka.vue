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
import { lr_05_djadka } from "../lib/pers/lr_05_djadka"

export default defineComponent({
    name: "Lr_05_djadka",

    setup() {
        const height = lr_05_djadka.height+"px"
        const width = lr_05_djadka.width+"px"

        let img = new Image()
        img.src = lr_05_djadka.src
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