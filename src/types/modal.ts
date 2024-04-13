import { extend } from "@vue/shared";

const component = extend({});
type VueComponent = InstanceType<typeof component>;

export interface IModalProps {
    component: null | VueComponent;
    props?: object;
  }
  
export interface IModalState {
    modalState: IModalProps;
  }