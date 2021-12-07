# JSON-Content

This package lets you build content by dragging and dropping pre-defined sections with fully configurable attributes. These sections may be infinitely nested, sorted and styled. The package comes headless and is fully customizable in style.

## Usage

```vue
// App.vue
<template>
    <!-- You can drag drawers from your cabinet... -->
    <Cabinet>
        <div :draws="TextSection">Text Section</div>
    </Cabinet>

    <div class="p-4 bg-blue-200">
        <!-- ... to your sections -->
        <Sections v-model="form.sections" :sections="sections" />
    </div>
    <pre>{{ form }}</pre>
</template>

<script setup lang="ts">
import { Head, useForm } from '@inertiajs/inertia-vue3';
import { Sections, Cabinet } from '@aw-studio/vue-json-content';
import TextSection from '@/Sections/TextSection.vue';

const form = useForm({
    sections: [],
});

const sections: any = {
    text: TextSection,
};
</script>
```

```vue
// TextSection.vue
<template>
    <div>
        <input type="text" v-model="model.text" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue';
const props = defineProps({
    modelValue: {
        type: Object,
        required: true,
        default: () => ({
            text: null,
        }),
    },
});

const model = ref(props.modelValue);
const emit = defineEmits(['update:modelValue']);
watch(
    () => model.value,
    value => emit('update:modelValue', value),
    { deep: true }
);
</script>
```
