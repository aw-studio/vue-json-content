<template>
    <div><slot /></div>
</template>

<script setup lang="ts">
defineProps({
    as: {
        type: Object,
        required: true,
    },
});
</script>
