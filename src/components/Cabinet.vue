<template>
    <draggable
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
    </draggable>
</template>
<script setup lang="ts">
import { useSlots, onMounted, ref } from 'vue';
import draggable from 'vuedraggable';
import { cloneSection } from '../index';

defineProps({
    group: {
        type: String,
        default: 'sections',
    },
    actions: {
        type: Boolean,
        default: false,
    },
});

const slots = useSlots();
const drawers = ref();

onMounted(() => {
    if (slots.default) {
        drawers.value = slots.default();
    }
});
</script>
