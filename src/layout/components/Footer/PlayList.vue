<template>

</template>

<script setup lang="ts">
import { toRefs } from "vue";
import { usePlayerStore } from "@/stores/player";

const { playList } = toRefs(usePlayerStore())
</script>

<style scoped>

</style>
