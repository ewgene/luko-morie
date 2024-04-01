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
        <div id="Mm">
            <Lr_05_mermaid />
        </div>
        <div id="Dj">
            <Lr_05_djadka />
        </div>
        <div id="Ns">
            <Lr_05_nesmejana />
        </div>
        <div id="Ks">
            <Lr_05_kaschej />
        </div>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed, onMounted } from "vue"
import { Bg } from "./lib/bg/lr_05"
import Lr_05_djadka from "./chars/Lr_05_djadka.vue"
import Lr_05_kaschej from "./chars/Lr_05_kaschej.vue"
import Lr_05_mermaid from "./chars/Lr_05_mermaid.vue"
import Lr_05_nesmejana from "./chars/Lr_05_nesmejana.vue"

export default defineComponent({
    name: "Lr05",

    components: {
        Lr_05_djadka,
        Lr_05_kaschej,
        Lr_05_mermaid,
        Lr_05_nesmejana,
    },

    setup() {
        const height = Bg.height+"px"
        const width = Bg.width+"px"
        let img = new Image()
        img.src = Bg.src
        const src64 = img.src

        const lr_05_djadka = ref()
        const lr_05_kaschej= ref()
        const Lr_05_mermaid = ref()
        const Lr_05_nesmejana = ref()

        const rapport = 5949

        onMounted(() => {
            function spanChars() {
                if(document.getElementById('djadka'))
                    lr_05_djadka.value = document.getElementById('Dj')
                if(document.getElementById('kaschej'))
                    lr_05_kaschej.value = document.getElementById('Ks')
                if(document.getElementById('mermaid'))
                    lr_05_djadka.value = document.getElementById('Mm')
                if(document.getElementById('kaschej'))
                    lr_05_kaschej.value = document.getElementById('Ns')
            }
            console.log(lr_05_djadka)
            spanChars()
        })

        return {
            width,
            height,
            src64,
            rapport,
            lr_05_djadka,
            lr_05_kaschej
        }
    }
})
</script>

<style lang="scss">
</style>