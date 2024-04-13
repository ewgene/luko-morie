<template>
    <Teleport to="body">
        <Transition name="modal-fade">
        <div
            class="modal-wrapper"
            @click.self="store.closeModal"
            v-if="store.modalState?.component"
            aria-modal="true"
            role="dialog"
            tabindex="-1"
        >
            <component
            :is="store.modalState?.component"
            v-bind="store.modalState?.props"
            />
        </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue"
import useModalStore from "../../stores/useModalStore"

const store = useModalStore()


function keydownListener(event: KeyboardEvent) {
    if(event.key === "Escape") 
        store.closeModal()
}

onUnmounted(() => {
  document.removeEventListener("keydown", keydownListener)
})

</script>