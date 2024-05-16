export interface ModalInfo {
    bg: string,
    hd: string,
    sm: string
}

export interface Char {
    width: number,
    height: number,
    name: string,
    text: string,
    inner: ModalInfo,
    src: string
}