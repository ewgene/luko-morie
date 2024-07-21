<template>
    <div 
        id="bg_05"
        :style="{
            width: width,
            height: height,
            position: 'relative',
            left: '0px',
            backgroundImage: `url('${src64}')`,
            backgroundRepeat: 'repeate-x',
            backgroundPosition: 'center',
            backgroundSize: 'contain'
        }">
        <div id="Mm">
            <Lr_05_mermaid ref="mermaid" />
        </div>
        <div id="Dj">
            <Lr_05_djadka ref="djadka" />
        </div>
        <div id="Ns">
            <Lr_05_nesmejana ref="nesmejana" />
        </div>
        <div id="Ks">
            <Lr_05_kaschej ref="kaschej" />
        </div>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed, onMounted, watch } from "vue"
import { gsap } from "gsap"
import { Bg } from "./lib/bg/lr_05"
import Lr_05_djadka from "./chars/Lr_05_djadka.vue"
import Lr_05_kaschej from "./chars/Lr_05_kaschej.vue"
import Lr_05_mermaid from "./chars/Lr_05_mermaid.vue"
import Lr_05_nesmejana from "./chars/Lr_05_nesmejana.vue"
import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default defineComponent({
    name: "Lr05",

    components: {
        Lr_05_djadka,
        Lr_05_kaschej,
        Lr_05_mermaid,
        Lr_05_nesmejana,
    },

    props: {
        deltaTick:Number
    },

    setup(props) {

        const height = Bg.height+"px"
        const width = Bg.width+"px"
        let img = new Image()
        img.src = Bg.src
        const src64 = img.src

        const tick = props.deltaTick

        const djadka = ref<InstanceType<typeof Lr_05_djadka> | null>(null)
        const kaschej = ref<InstanceType<typeof Lr_05_kaschej> | null>(null)
        const mermaid = ref<InstanceType<typeof Lr_05_mermaid> | null>(null)
        const nesmejana = ref<InstanceType<typeof Lr_05_nesmejana> | null>(null)

        const rapport = 5933

        onMounted(() => {
        //    console.log(djadka.value?.$el)
        /*    function spanChars() {
                if(document.getElementById('djadka'))
                    djadka.value = document.getElementById('Dj')
                if(document.getElementById('kaschej'))
                    lr_05_kaschej.value = document.getElementById('Ks')
                if(document.getElementById('mermaid'))
                    lr_05_mermaid.value = document.getElementById('Mm')
                if(document.getElementById('kaschej'))
                    lr_05_nesmejana.value = document.getElementById('Ns')
            }
            spanChars()*/
        })

        const boxDjadka = computed(()=> {
            return djadka.value?.$el
        })
        const boxMermaid = computed(()=> {
            return mermaid.value?.$el
        })

        const ancorDjadka = computed(()=> {
            return djadka.value?.$el.offsetLeft+props.deltaTick}
        )
        const ancorMermaid = computed(()=> {
            return mermaid.value?.$el.offsetLeft+props.deltaTick}
        )

        function callback() {
            console.log(boxMermaid.value.left)
        }

        watch(ancorMermaid, ()=> {
            if(ancorMermaid.value < -1000) {
                console.log(boxMermaid.value.left)
                gsap.to(boxMermaid.value, {
                    left: 5933,
                    duration: 0,
                    onComplete: callback
                })
            }
        })

        return {
            width,
            height,
            src64,
            rapport,
            djadka,
            kaschej,
            mermaid,
            nesmejana,
            ancorDjadka,
            ancorMermaid,
            boxDjadka,
            boxMermaid
        }
    }
})
</script>

<style lang="scss">
</style>