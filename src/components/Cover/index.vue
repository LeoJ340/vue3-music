<template>
  <div class="flex" :class="{ 'flex-column': mode === 'vertical' }">
    <div class="cover-image" @click="click">
      <el-image :src="imageUrl" :style="{ width: mode === 'horizontal' ? imageSize: '100%' }" />
      <div v-if="playCount" class="play-count">
        <PlayOne theme="outline" size="22" :strokeWidth="2"/>
        <span>{{useFormatCount(playCount)}}</span>
      </div>
      <PlayOne v-if="iconPlacement" class="play-icon" :style="[playIconPosition]" theme="filled" size="32" :strokeWidth="2"/>
    </div>
    <div :class="{ 'mt-5': mode === 'vertical', 'ml-5': mode === 'horizontal' }">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlayOne } from "@icon-park/vue-next";
import useFormatCount from "@/utils/count";
import {computed} from "vue";

const props = defineProps<{
  mode: 'horizontal' | 'vertical' // 排列模式（水平、垂直）
  imageUrl: string
  imageSize?: string // 图片尺寸（水平模式时生效）
  playCount?: number
  iconPlacement?: 'center' | 'bottom-right' // 播放图标摆放位置
  iconTransition?: 'fade' // 播放图标过渡模式
}>()

// playIcon位置样式
const playIconPosition = computed(() => {
  if (props.iconPlacement === 'center') {
    return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
  }
  if (props.iconPlacement === 'bottom-right') {
    return { bottom: '10px', right: '5px' }
  }
})

// TODO：playIcon过渡样式
const playIconTransition = computed(() => {

})

// 点击封面图
const emit = defineEmits(['click'])
function click() {
  emit('click')
}
</script>

<style scoped lang="scss">
.cover-image {
  position: relative;
  cursor: pointer;
  .play-count {
    position: absolute;
    top: 0;
    right: 5px;
    display: flex;
    align-items: center;
    color: #ffffff;
  }
  .play-icon {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.8);
    color: var(--player-theme);
    visibility: hidden;
    opacity: 0;
    transition: all 1s;
  }
  &:hover {
    .play-icon {
      visibility: visible;
      opacity: 1;
    }
  }
}
.mt-5 {
  margin-top: 5px;
}
.ml-5 {
  margin-left: 5px;
}
</style>
