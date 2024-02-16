<template>
    <div id="bg_01"
        ref="lr_01"
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
import { ref, defineComponent, watch, onMounted } from "vue"
import { Bg } from "./lib/bg/lr_01"

export default defineComponent({
    name: "Lr01",

    setup() {
        const width = Bg.width+'px'
        const height = Bg.height+'px'
        const src64 = Bg.src
/*        const cloneDirection = ref(0)
        const layOut:HTMLElement|any = ref()*/

/*        onMounted(() => {
            layOut.value = document.getElementById('bg_01')
            function cloneBackground() {

                if(layOut?.getBoundingClientRect().left === 0) {
                    const node = layOut.firstChild
                    const clone = node?.cloneNode(true)
                    if(clone) layOut.insertBefore(clone, layOut.children[0])
                    return cloneDirection.value = -1
                }

                if(layOut?.getBoundingClientRect().right === window.innerWidth) {
                    const node = layOut.lastChild
                    const clone = node?.cloneNode(true)
                    if(clone) layOut.appendChild(clone)
                    return cloneDirection.value = 1
                }
                console.log(cloneDirection.value)
            }
            return {
                layOut,
                cloneBackground,
                cloneDirection
            }
        })*/

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