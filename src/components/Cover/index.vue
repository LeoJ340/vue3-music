<template>
  <div class="flex" :class="{ 'flex-column': mode === 'vertical' }">
    <div class="cover-image" @click="click" @mouseover="hover" @mouseout="hover">
      <el-image :src="imageUrl" :style="{ width: mode === 'horizontal' ? imageSize : '100%' }" />
      <div v-if="playCount" class="play-count">
        <PlayOne theme="outline" size="22" :strokeWidth="2"/>
        <span>{{useFormatCount(playCount)}}</span>
      </div>
      <transition v-if="iconPlacement && iconTransition" :name="iconTransition">
        <PlayOne v-show="showPlayIcon" class="play-icon" :style="playIconPosition" theme="filled" size="32" :strokeWidth="2"/>
      </transition>
      <PlayOne v-if="iconPlacement && !iconTransition" v-show="showPlayIcon" class="play-icon" :style="playIconPosition" theme="filled" size="32" :strokeWidth="2"/>
    </div>
    <div :class="{ 'mt-5': mode === 'vertical', 'ml-5': mode === 'horizontal' }">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlayOne } from "@icon-park/vue-next";
import useFormatCount from "@/utils/count";
import {computed, ref} from "vue";

const props = defineProps<{
  mode: 'horizontal' | 'vertical' // 排列模式（水平、垂直）
  imageUrl: string
  imageSize?: string // 图片尺寸（水平模式时生效）
  playCount?: number
  iconPlacement?: 'center' | 'bottom-right' | 'top-left' // 播放图标摆放位置（不传则不显示）
  iconTransition?: 'only-show' | 'el-fade-in-linear' // 播放图标过渡模式（不传则无过渡效果）
}>()

// playIcon位置样式
const playIconPosition = computed(() => {
  if (props.iconPlacement === 'center') {
    return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
  }
  if (props.iconPlacement === 'bottom-right') {
    return { bottom: '10px', right: '5px' }
  }
  if (props.iconPlacement === 'top-left') {
    return { top: '5px', left: '5px' }
  }
})

const showPlayIcon = ref(props.iconTransition === 'only-show')

function hover() {
  if (!props.iconPlacement) return
  if (props.iconTransition === 'only-show') return
  showPlayIcon.value = !showPlayIcon.value
}

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
  }
}
.mt-5 {
  margin-top: 5px;
}
.ml-5 {
  margin-left: 5px;
}
</style>
