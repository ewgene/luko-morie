<template>
    <div 
        id="djadka"
        ref="djadka"
        :style="{
            width: width,
            height: height,
            position: 'absolute',
            left: '1310.5px',
            top: '95px',
            backgroundImage: `url('${src64}')`,
            backgroundPosition: 'center',
            backgroundSize: 'contain'
        }">
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed, onMounted } from "vue"
import { lr_05_djadka } from "./lr_05_djadka"

export default defineComponent({
    name: "Lr_05_djadka",

    setup() {
        const height = lr_05_djadka.height+"px"
        const width = lr_05_djadka.width+"px"

        let img = new Image()
        img.src = lr_05_djadka.src
        const src64 = img.src

        return {
            lr_05_djadka,
            width,
            height,
            src64
        }
    }
})
</script>

<style lang="scss">
</style>