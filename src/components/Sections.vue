<template>
    <Draggable
        v-if="value"
        v-model="value"
        v-bind="dragOptions"
        :group="group"
        itemKey="uuid"
        tag="transition-group"
        :component-data="{
            name: !drag ? 'flip-list' : null,
            wrap: true,
        }"
        @start="drag = true"
        @end="drag = false"
    >
        <template #item="{ element }">
            <div>
                <component
                    :is="sections[getSectionKey(element.component) as any]"
                    :modelValue="element.value"
                    @update:modelValue="(e: any) => updateElement(element, e)"
                />
            </div>
        </template>
    </Draggable>
</template>
<script setup lang="ts">
import {
    ref,
    watch,
    PropType,
    Component as VueComponent,
    FunctionalComponent,
} from 'vue';
import Draggable from 'vuedraggable';
import { TSection, TModel, DragOptions } from './../';
import { v4 as uuid } from 'uuid';

declare type Sections = {
    [k: string]: VueComponent | FunctionalComponent;
}[];

declare type DraggableSection = {
    uuid: string;
    component: any;
    key?: string;
    value?: TModel;
};

const props = defineProps({
    modelValue: {
        type: Array as PropType<TSection[]>,
        required: true,
    },
    sections: {
        type: Object as PropType<Sections>,
        required: true,
    },
    group: {
        type: String,
        default: 'sections',
    },
    dragOptions: {
        type: Object as PropType<DragOptions>,
        default: () => ({
            animation: 200,
            ghostClass: 'ghost',
        }),
    },
});

const emit = defineEmits(['update:modelValue']);

const drag = ref<boolean>(false);

const updateElement = (element: any, value: any) => {
    element.value = value;
};

const getSectionKey = (section: any): string => {
    const json = JSON.stringify(section);

    for (let key in props.sections) {
        if (JSON.stringify(props.sections[key]) == json) {
            return key;
        }
    }

    return '';
};

const parseValue = (value: TSection[]) => {
    let b = [];

    for (let i in value) {
        b.push({
            uuid: uuid(),
            key: value[i].type,
            value: value[i].value,
            component: props.sections[value[i].type as any],
        });
    }

    return b;
};
const transformValue = (value: DraggableSection[]) => {
    let b: TSection[] = [];

    for (let i in value) {
        b.push({
            type: getSectionKey(value[i].component),
            value: value[i].value || {},
        });
    }

    return b;
};

const value = ref<DraggableSection[]>(parseValue(props.modelValue));

watch(
    () => value,
    () => emit('update:modelValue', transformValue(value.value)),
    { deep: true }
);
</script>

<style>
.flip-list-move {
    transition: transform 0.5s;
}
.no-move {
    transition: transform 0s;
}
.ghost {
    opacity: 0.5;
    background: #dde0ee;
    border: none;
}
</style>
