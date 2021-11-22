<template>
    <Draggable
        v-model="drawers"
        :group="{
            name: group,
            pull: 'clone',
            put: false,
        }"
        :sort="false"
        :clone="cloneSection"
    >
        <template #item="{ element }">
            <div>
                <component :is="element" />
            </div>
        </template>
    </Draggable>
</template>
<script setup lang="ts">
import { useSlots, onMounted, ref } from 'vue';
import Draggable from 'vuedraggable';
import { v4 as uuid } from 'uuid';

const props = defineProps({
    group: {
        type: String,
        default: 'sections',
    },
});

const slots = useSlots();
const drawers = ref();

export const cloneSection: any = (el: any) => ({
    uuid: uuid(),
    component: el.props.draws,
});

onMounted(() => {
    if (slots.default) {
        drawers.value = slots.default();
    }
});
</script>
