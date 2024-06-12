<template>
    <div>
      <div v-if="isOpen" class="modal modal-open">
        <div class="modal-box relative"
          :style="{
            width: width,
            height: height,
            position: 'absolute',
            left: '0px',
            backgroundImage: `url('${src}')`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain'
          }">
          <label
            class="btn btn-sm btn-circle absolute right-2 top-2"
            @click="store.close()"
            >✕</label
          >
  
          <component :is="view" v-model="model"></component>

        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
    import { reactive } from "vue";
    import { storeToRefs } from "pinia";
    import { useModal } from "../../stores/modalStore";
    import { modalBg } from "../lib/bg/modalBg";
  
    const store = useModal()
    const model = reactive({})
  
    const { isOpen, view, actions } = storeToRefs(store);

    const width = modalBg.width
    const height = modalBg.height
    const src = modalBg.src
  </script>