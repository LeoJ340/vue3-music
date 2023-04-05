<template>
  <span v-for="(ar, index) in artists">
    <el-link :underline="false" @click="toCommonArtist(ar.id)">{{ar.name}}</el-link>
    <span v-if="index !== (artists.length - 1)">&nbsp;/&nbsp;</span>
  </span>
</template>

<script setup lang="ts">
import {toCommonArtist} from "@/router/usePush";

defineProps<{
  artists: Array<{ id: number, name: string }>
}>()
</script>

<style scoped>

</style>
