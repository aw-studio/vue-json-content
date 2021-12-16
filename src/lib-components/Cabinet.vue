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
<script lang="ts">
import { useSlots, onMounted, ref, defineComponent } from 'vue';
import Draggable from 'vuedraggable';
import { v4 as uuid } from 'uuid';

export default defineComponent({
    name: 'Cabinet',
    components: {
        Draggable,
    },
    props: {
        group: {
            type: String,
            default: 'sections',
        },
    },
    setup() {
        const slots = useSlots();
        const drawers = ref();

        const cloneSection: any = (el: any) => ({
            uuid: uuid(),
            component: el.props.draws,
        });

        onMounted(() => {
            if (slots.default) {
                drawers.value = slots.default();
            }
        });

        return {
            cloneSection,
            drawers,
        };
    },
});
</script>
