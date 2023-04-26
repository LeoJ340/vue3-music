<template>
  <p v-html="props.description.split('\n').join('<br>')"></p>
</template>

<script setup lang="ts">
const props = defineProps<{ description: string }>()

</script>

<style scoped>
p {
  margin: 20px 40px;
}
</style>
