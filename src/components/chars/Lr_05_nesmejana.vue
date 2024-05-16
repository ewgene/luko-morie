<template>
    <div 
        id="nesmejana"
        ref="nesmejana"
        :style="{
            width: width,
            height: height,
            position: 'absolute',
            left: '3274.5px',
            top: '114px',
            backgroundImage: `url('${src64}')`,
            backgroundPosition: 'center',
            backgroundSize: 'contain'
        }">
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed, onMounted } from "vue"
import { lr_05_nesmejana } from "./lr_05_nesmejana"

export default defineComponent({
    name: "Lr_05_nesmejana",

    setup() {
        const height = lr_05_nesmejana.height+"px"
        const width = lr_05_nesmejana.width+"px"

        let img = new Image()
        img.src = lr_05_nesmejana.src
        const src64 = img.src

        return {
            width,
            height,
            src64,
            lr_05_nesmejana
        }
    }
})
</script>

<style lang="scss">
</style>