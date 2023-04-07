<template>
  <el-empty>
    <template #image>
      <CloseWifi v-if="showIcon" theme="outline" fill="#CCCCCC" :strokeWidth="2"/>
    </template>
    <template #description>
      <span class="text-14 description">{{description}}</span>
    </template>
  </el-empty>
</template>

<script setup lang="ts">
import {CloseWifi} from "@icon-park/vue-next";

withDefaults(defineProps<{
  showIcon?: boolean
  description?: string
}>(), {
  showIcon: true,
  description: '网络不给力哦，请检查你的网络设置~'
})
</script>

<style scoped>
.description {
  color: #666666;
}
</style>
