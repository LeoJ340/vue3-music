<template>
  <el-image :src="currentPlay.al.picUrl" />
  <div>
    <div class="text-14">
      {{currentPlay.name}}
      <span v-show="currentPlay.alia.length" style="color:#919192;">（{{currentPlay.alia.join('')}}）</span>
    </div>
    <div class="text-12">{{currentPlay.ar.map(ar => ar.name).join('/')}}</div>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from "@/stores/player";
import { toRefs } from "vue";

const { currentPlay } = toRefs(usePlayerStore())
</script>

<style lang="scss" scoped>
.el-image {
  width: 50px;
  height: 50px;
  margin: 0 10px;
}
</style>
