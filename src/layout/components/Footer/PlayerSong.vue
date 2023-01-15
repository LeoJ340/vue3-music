<template>
  <el-image :src="currentPlay.al.picUrl" />
  <div style="margin-left: 10px;">
    <div style="font-size: 14px;">
      {{currentPlay.name}}
      <span v-show="currentPlay.alia.length" style="color:#919192;">（{{currentPlay.alia.join('')}}）</span>
    </div>
    <div style="font-size: 12px;">{{currentPlay.ar.map(ar => ar.name).join('/')}}</div>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from "@/stores/player";
import { toRefs } from "vue";

let { currentPlay } = toRefs(usePlayerStore())
</script>

<style lang="scss" scoped>
.el-image {
  width: 50px;
  height: 50px;
  margin-left: 10px;
}
</style>
