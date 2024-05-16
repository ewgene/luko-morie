import { markRaw } from "vue";
import { defineStore } from "pinia";
import { Modal, ModalAction } from "../types/modal";

export const useModal = defineStore("mStore", {
  state: (): Modal => ({
    isOpen: false,
    view: {},
    actions: [],
  }),
  actions: {
    open(view: object, actions?: ModalAction[]) {
      this.isOpen = true
      this.actions = actions
      this.view = markRaw(view)
    },
    close() {
      this.isOpen = false;
      this.view = {};
      this.actions = [];
    },
  },
});
  
export default useModal()