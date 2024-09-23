export const clamp = (val: number, min: number, max: number) => {
    return val < min ? min : val > max ? max : val
}

export const minTranslateX = (element: HTMLElement) => -element.offsetLeft

export const minTranslateY = (element: HTMLElement) => -element.offsetTop

export const maxTranslateX = (element: HTMLElement) =>
    element.parentElement!.offsetWidth -
    element.offsetWidth -
    element.offsetLeft

export const maxTranslateY = (element: HTMLElement) =>
    element.parentElement!.offsetHeight -
    element.offsetHeight -
    element.offsetTop
