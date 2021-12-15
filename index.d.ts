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

export { default as Cabinet } from './src/components/Cabinet.vue';
export { default as Sections } from './src/components/Sections.vue';