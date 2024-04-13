import { defineStore } from "pinia"
import { extend } from "@vue/shared"

import { IModalProps, IModalState } from "../types/modal"

const basicState = { 
    component: null, 
    props: {} 
}

export default defineStore("modal-store", {
    state: (): IModalState => ({ 
        modalState: basicState 
    }),
    actions: {
        openModal(payload: IModalProps) {
          const { props, component } = payload;
          this.modalState = { 
            component, props: props || {} 
          };
        },
        closeModal() {
          this.modalState = basicState;
        },
      },
    getters: {}
  })