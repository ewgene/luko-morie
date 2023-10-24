<template>
    <div id="bg_01"
        ref="lr_01">
        <div class="bg01"
            :style="{
                width: width,
                height: height,
                backgroundImage: `url('${src64}')`
            }">            
        </div>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from "vue"
import { Bg } from "./lib/bg/lr_01"

export default defineComponent({
    name: "Lr01",

    setup() {
        const height = Bg.height+"px"
        const width = Bg.width+"px"
        let img = new Image()
        img.src = Bg.src
        const src64 = img.src

/*        onMounted(() => {
            const layOut = document.getElementById('bg01')
            if(layOut) {
                layOut.style.backgroundImage = `url('${src64}')`
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
#bg_01 {
    position: relative;
    width: 100%;
    text-align: center;

    .bg01 {
        position: absolute;
        left: 0;
        display: inline-block;
        background-repeat: repeat-x;
    }
}
</style>