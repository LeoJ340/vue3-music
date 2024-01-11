<template>
  <router-view />
</template>

<script setup lang="ts">
import { usePlayerStore } from "./stores/player";
import { onMounted, onUnmounted } from "vue";
const { init, interval } = usePlayerStore()
let timer: NodeJS.Timeout

onMounted(() => {
  init()
  timer = setInterval(interval, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style>

</style>
