<template>
    <draggable
        v-if="sections"
        v-model="sections"
        :group="group"
        itemKey="uuid"
        tag="transition-group"
        :component-data="{
            name: !drag ? 'flip-list' : null,
            wrap: true,
        }"
        @start="drag = true"
        @end="drag = false"
        v-bind="dragOptions"
    >
        <template #item="{ element }">
            <div>
                <component
                    :is="registeredSections[element.key]"
                    :element="element"
                />
            </div>
        </template>
    </draggable>
</template>
<script setup lang="ts">
import { ref, watch, PropType } from 'vue';
import draggable from 'vuedraggable';
import { SectionInterface, registeredSections } from './../index';

const props = defineProps({
    modelValue: {
        type: Array as PropType<SectionInterface[]>,
        required: true,
    },
    group: {
        type: String,
        default: 'sections',
    },
    section: {
        type: Object as PropType<SectionInterface>,
        default: null,
    },
});
const emit = defineEmits(['update:modelValue']);

const drag = ref(false);
const dragOptions = ref({
    animation: 200,
    ghostClass: 'ghost',
});
const sections = ref<SectionInterface[]>(props.modelValue);

watch(
    () => sections,
    (state, prevState) => {
        emit('update:modelValue', sections.value);
    },
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
