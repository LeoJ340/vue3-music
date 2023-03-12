<template>
  <ul class="list-container">
    <li v-for="item in list" class="item" :style="{ 'grid-template-columns': gridColumnsStyle }">
      <!-- 左边图片部分 -->
      <div class="image" @click="click(item.id)">
        <el-image :src="item.coverImgUrl" :style="{ 'width': imageSize }" />
        <div v-if="showPlayCount" class="play-count">
          <PlayOne theme="outline" size="22" :strokeWidth="2"/>
          <span>{{useFormatCount(item.playCount)}}</span>
        </div>
        <PlayOne class="to-play" :style="[playOneStyle]" theme="filled" size="32" :strokeWidth="2"/>
      </div>
      <!-- 右边信息部分 -->
      <div class="info">
        <slot :item="item"></slot>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import {computed, PropType} from "vue";
import {ListItem} from "./Model";
import { PlayOne } from "@icon-park/vue-next";
import useFormatCount from "@/utils/count";

const { list, columns, imageSize, showPlayCount, playPlacement } = defineProps({
  list: {
    type: Array as PropType<ListItem[]>,
    required: true
  },
  columns: {
    type: Number,
    default: 3
  },
  imageSize: {
    type: String,
    default: '200px'
  },
  showPlayCount: {
    type: Boolean,
    default: true
  },
  playPlacement: {
    type: String,
    validator: (value: string) => {
      return ['center', 'bottom-right'].includes(value);
    }
  }
})
// grid布局列数样式
const gridColumnsStyle = Array.from({length: columns}, (_, index) => index + 1).map(_ => '1fr').join(' ')
// playIcon位置样式
const playOneStyle = computed(() => {
  if (playPlacement === 'center') {
    return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
  }
  if (playPlacement === 'bottom-right') {
    return { bottom: '10px', right: '5px' }
  }
})

// 点击事件
const emit = defineEmits(['click'])
function click(id: number) {
  emit('click', id)
}
</script>

<style scoped lang="scss">
.list-container {
  padding: 0;
  display: grid;
  // 默认三列
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 10px;
}
.item {
  display: flex;
  .image {
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
    .to-play {
      position: absolute;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.8);
      color: var(--player-theme);
      visibility: hidden;
      opacity: 0;
      transition: all 1s;
    }
    &:hover {
      .to-play {
        visibility: visible;
        opacity: 1;
      }
    }
  }
  .info {
    flex: 1;
    margin-left: 10px;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
  }
}
</style>
