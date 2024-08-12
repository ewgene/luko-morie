<template>
    <div
        id="scroll"
        @mousedown="mX = $event.pageX"
        @mouseup="dX = $event.pageX"
        :style="{
            marginTop: scrollOffset + 'px',
        }"
    >
        <div class="container">
            <Lr01 id="lr_01" ref="lr_01" />
        </div>
        <div class="container">
            <Lr02 id="lr_02" ref="lr_02" />
        </div>
        <div class="container">
            <Lr03 id="lr_03" ref="lr_03" />
        </div>
        <div class="container">
            <Lr04 id="lr_04" ref="lr_04" />
        </div>
        <div class="container">
            <Lr05 id="lr_05" ref="lr_05" :deltaTick="deltaTick" />
        </div>

        <div
            class="oklad-top"
            id="oklad_top"
            :style="{
                position: 'fixed',
                left: topPos + 'px',
                top: scrollOffset + 'px',
                width: okladTop.width + 'px',
                height: okladTop.height + 'px',
                backgroundImage: `url('${top}')`,
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
            }"
        ></div>
        <div class="display">
            position is at: {{ delta }} : {{ beginning }} : {{ ending }}
        </div>
        <div
            class="oklad-bot"
            id="oklad_bot"
            :style="{
                position: 'fixed',
                left: botPos + 'px',
                bottom: scrollOffset + 'px',
                width: okladBottom.width + 'px',
                height: okladBottom.height + 'px',
                backgroundImage: `url('${bot}')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }"
        ></div>
    </div>
</template>

<script lang="ts">
import {
    ref,
    defineComponent,
    onMounted,
    watch,
    createApp,
    computed,
} from "vue";
import gsap from "gsap";
import Lr01 from "./Lr01.vue";
import Lr02 from "./Lr02.vue";
import Lr03 from "./Lr03.vue";
import Lr04 from "./Lr04.vue";
import Lr05 from "./Lr05.vue";

import { oklad_top } from "../components/lib/bg/oklad_top";
import { oklad_bottom } from "../components/lib/bg/oklad_bottom";
//import { nextTick } from "vue";

export default defineComponent({
    name: "Panorama",
    components: {
        Lr01,
        Lr02,
        Lr03,
        Lr04,
        Lr05,
    },

    setup() {
        const mX = ref(0);
        const dX = ref(0);
        const delta = ref(0);
        const drag = ref(false);
        const current = ref(0);
        const beginning = ref(0);
        const ending = ref(0);
        const midpoint = screen.width / 2;
        const lr_01 = ref<InstanceType<typeof Lr01> | any>(Lr01);
        const lr_02 = ref<InstanceType<typeof Lr02> | any>(Lr02);
        const lr_03 = ref<InstanceType<typeof Lr03> | any>(Lr03.$el);
        const lr_04 = ref<InstanceType<typeof Lr04> | any>(Lr04);
        const lr_05 = ref<InstanceType<typeof Lr05> | any>(Lr05);
        const container: HTMLElement | any = ref();

        const deltaTick: Number | any = ref(0);

        const top = ref(oklad_top.src);
        const bot = ref(oklad_bottom.src);

        const scrollHeight = 650;
        const scrollOffset = ref(0);

        const topPos = ref(0);
        const botPos = ref(0);

        const okladTop = {
            width: oklad_top.width,
            height: oklad_top.height,
            src: oklad_top.src,
        };

        const okladBottom = {
            width: oklad_bottom.width,
            height: oklad_bottom.height,
            src: oklad_bottom.src,
        };

        onMounted(() => {
 /*           function stackLayers() {
                lr_01.value = document.getElementById('lr_01')
                lr_02.value = document.getElementById('lr_02')
                lr_03.value = document.getElementById('lr_03')
                lr_04.value = document.getElementById('lr_04')
                lr_05.value = document.getElementById('lr_05')
            }
            stackLayers()*/
            scrollOffset.value = (window.innerHeight - scrollHeight) / 2;
            topPos.value = (window.innerWidth - okladTop.width) / 2;
            botPos.value = (window.innerWidth - okladBottom.width) / 2;
        });

        watch(mX, () => {
            drag.value = true;
            current.value = Math.round(lr_01.value.offsetLeft);
            beginning.value = Math.round(lr_01.value.offsetLeft);
            ending.value = Math.round(lr_01.value.offsetRight);
        });

        watch(dX, () => {
            delta.value = current.value + dX.value - mX.value;
            update(delta.value);
        });

        /*    watch(lr_05Left, ()=> {
      if(lr_05Left.value > 0) {
        const layerCopy = createApp(Lr05).mount(container.value)
        console.log({Lr05: layerCopy.$el.innerHTML })
      }
    })*/

        function callback() {
            deltaTick.value = delta.value * 2.356;
            console.log(deltaTick.value);
            console.log(lr_05.value.$el);
            drag.value = false;
            delta.value = 0;
        }

        async function moveStack() {
            console.log(typeof lr_05);
            gsap.to(lr_01.value.$el, {
                x: delta.value,
                ease: "none",
                duration: 10,
            });
            gsap.to(lr_02.value.$el, {
                x: delta.value * 1.203,
                ease: "none",
                duration: 10,
            });
            gsap.to(lr_03.value.$el, {
                x: delta.value * 1.33,
                ease: "none",
                duration: 10,
            });
            gsap.to(lr_04.value.$el, {
                x: delta.value * 1.714,
                ease: "none",
                duration: 10,
            });
            gsap.to(lr_05.value, {
                x: delta.value * 2.356,
                ease: "none",
                duration: 10,
                onUpdate: () => console.log(lr_05.value?.offsetLeft),
                onComplete: callback,
            });
        }

        function update(delta: number) {
            if (mX.value < dX.value) {
                delta = delta + Math.abs((mX.value - dX.value) / 50);
            }
            if (mX.value > dX.value) {
                delta = delta - Math.abs((mX.value - dX.value) / 50);
            }
            moveStack();
        }

        /*const lr_01Left = computed(() => {
            return lr_01.value?.offsetLeft;
        });
        const lr_01Right = computed(() => {
            return lr_01.value?.offsetRight;
        });

        const lr_02Left = computed(() => {
            return lr_02.value?.offsetLeft;
        });
        const lr_02Right = computed(() => {
            return lr_02.value?.offsetRight;
        });

        const lr_03Left = computed(() => {
            return lr_03.value?.offsetLeft;
        });
        const lr_03Right = computed(() => {
            return lr_03.value?.offsetLeft;
        });

        const lr_04Left = computed(() => {
            return lr_04.value?.$el.offsetLeft;
        });
        const lr_04Right = computed(() => {
            return lr_04.value?.$el.offsetRight;
        });

        const lr_05Left = computed(() => {
            return window.getComputedStyle(lr_05.value?.$el).offset;
        });
        const lr_05Right = computed(() => {
            return lr_05.value?.$el.offsetRight;
        });*/

        return {
            lr_01,
            lr_02,
            lr_03,
            lr_04,
            lr_05,
            scrollHeight,
            scrollOffset,
            okladTop,
            okladBottom,
            topPos,
            botPos,
            top,
            bot,
            midpoint,
            mX,
            dX,
            current,
            beginning,
            ending,
            delta,
            deltaTick,
            update,
            container,
        };
    },
});
</script>

<style lang="scss">
#scroll {
    position: relative;
    height: 650px;
    overflow: hidden;

    .container {
        width: 100%;
        height: 650px;
        position: absolute;
    }
    .display {
        position: absolute;
        top: 0;
        width: 100%;
        text-align: center;
    }
}
</style>
