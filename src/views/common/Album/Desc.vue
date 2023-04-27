<template>
  <pre>{{props.description}}</pre>
</template>

<script setup lang="ts">
const props = defineProps<{ description: string }>()

</script>

<style scoped>
pre {
  margin: 20px 40px;
}
</style>
