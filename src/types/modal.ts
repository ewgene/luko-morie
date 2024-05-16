export type Modal = {
    isOpen: boolean,
    view: object,
    actions?: ModalAction[],
};

    export type ModalAction = {
    label: string,
    callback: (props?: any) => void,
};