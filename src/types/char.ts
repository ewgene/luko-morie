export interface Char {
    name: string,
    width: number,
    height: number,
    inner: {
        bg: string,
        hd: string,
        sm: string
    },
    text: string,
    src: string
}