import {ref} from 'vue'
import { v4 as uuid } from 'uuid';

export { default as Drawer } from './components/Drawer.vue'
export { default as Cabinet } from './components/Cabinet.vue'
export { default as Sections } from './components/Sections.vue'

export declare interface SectionInterface {
    uuid?: string;
    key: string;
    attributes?: Object;
    sections?: SectionInterface[];
    children?: any[];
}

export const defineSection = (section: SectionInterface) => {
    return section
}

export const cloneSection: any = (el: any) => {
    let section;
    if(el.props.section){
        section = el.props.section.default();
    }else{
        section = el.props.as.props.section.default();
    }

    return {
        uuid: uuid(),
        ...section
    };
};

export const registeredSections = ref<any>([])
export const registerSections = (sectionComponents: any) => {
    registeredSections.value = sectionComponents
}