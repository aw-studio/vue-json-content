# JSON-Content

This package lets you build content by dragging and dropping pre-defined sections with fully configurable attributes. These sections may be infinitely nested, sorted and styled. The package comes headless and is fully customizable in style.

## Usage

```js
<template>
    <Cabinet>
        <Drawer :as="TextSection">
            Text Section
        </Drawer>
    </Cabinet>

    <Sections v-model="sections" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import {
    Sections,
    Cabinet,
    Drawer,
    registerSections,
} from '@aw-studio/vue-json-content';
import TextSection from './your/components/TextSection.vue';

const sections = ref()
</script>
```

You set up a `Cabinet` packed with `Drawers` you can drag and drop to your `Sections`.
A `Drawer` will be converted as the `Section` you set up yourself, holding any attributes you like. These attributes can be edited and will be synced with the `v-model` you pass to the `Sections`. The outputted JSON can be stored in your Database and will be rendered in the same order und structure when loaded.

```js
<template>
    <div>
        <input type="text" v-model="element.attributes.foo" />
        <input type="text" v-model="element.attributes.bar" />
    </div>
</template>
<script setup lang="ts">
import {
    defineSection,
} from '@aw-studio/vue-json-content';

defineProps({
    as: {
        type: Object,
        required: true,
    },
    element: {
        type: Object,
        required: true,
    },
    section: {
        type: Object,
        default: () =>
            defineSection({
                key: 'TextSection',
                attributes: {
                    foo: null,
                    bar: 'Default value'
                },
            }),
    },
});
</script>
```
