<template>
    <div 
        id="mermaid"
        ref="mermaid"
        @click="openModal" 
        :style="{
            width: width,
            height: height,
            position: 'absolute',
            left: '0.5px',
            top: '0px',
            backgroundImage: `url('${src64}')`,
            backgroundPosition: 'center',
            backgroundSize: 'contain'
        }">
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed, onMounted } from "vue"
import { lr_05_mermaid } from "./lr_05_mermaid"

export default defineComponent({
    name: "Lr_05_mermaid",

    setup() {
        const height = lr_05_mermaid.height+"px"
        const width = lr_05_mermaid.width+"px"

        let img = new Image()
        img.src = lr_05_mermaid.src
        const src64 = img.src

        function openModal() {
           console.log(lr_05_mermaid) 
        }

        return {
            width,
            height,
            src64,
            lr_05_mermaid,
            openModal
        }
    }
})
</script>

<style lang="scss">
</style>