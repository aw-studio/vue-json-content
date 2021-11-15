export { default as Cabinet } from './components/Cabinet.vue'
export { default as Sections } from './components/Sections.vue';

export declare interface TModel {
    [k: string]: any
}

export declare interface TSection {
    type: string,
    value: TModel
}

export declare type DragOptions = {
    animation?: number,
    ghostClass?: string,
}