<template>
  <div>
    <div v-if="isOpen" class="modal modal-open">
      <div class="modal-box relative">
        <label
          class="btn btn-sm btn-circle absolute right-2 top-2"
          @click="store.close()"
          >✕</label
        >

        <component :is="view" v-model="model"></component>

        <div class="modal-action">
          <button
            v-for="action in actions"
            class="btn"
            @click="action.callback(model)"
          >
            {{ action.label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from "vue";
  import { storeToRefs } from "pinia";
  import { useModal } from "../../stores/modalStore";

  const store = useModal()
  const model = reactive({})

  const { isOpen, view, actions } = storeToRefs(store);
</script>