<script setup lang="ts">
import { ref } from 'vue'
import CanvasTextElement from './CanvasTextElement.vue'
import type { CanvasElement } from '../types'

const props = defineProps<{
  elements: CanvasElement[]
}>()

const emit = defineEmits<{
  elementMove: [payload: { id: string; x: number; y: number }]
  elementTextChange: [payload: { id: string; text: string }]
}>()

const canvasRoot = ref<HTMLElement | null>(null)

function forwardTextChange(payload: { id: string; text: string }) {
  emit('elementTextChange', payload)
}

function forwardMove(payload: { id: string; x: number; y: number }) {
  const node = canvasRoot.value
  const el = props.elements.find((e) => e.id === payload.id)
  if (!node || !el) {
    emit('elementMove', payload)
    return
  }
  const maxX = Math.max(0, node.clientWidth - el.width)
  const maxY = Math.max(0, node.clientHeight - el.height)
  emit('elementMove', {
    id: payload.id,
    x: Math.min(Math.max(0, payload.x), maxX),
    y: Math.min(Math.max(0, payload.y), maxY),
  })
}
</script>

<template>
  <div
    ref="canvasRoot"
    class="relative min-h-[360px] w-full max-w-2xl border border-gray-200 bg-gray-50"
  >
    <template v-for="el in elements" :key="el.id">
      <CanvasTextElement
        v-if="el.type === 'text'"
        :element="el"
        @move="forwardMove"
        @text-change="forwardTextChange"
      />
    </template>
  </div>
</template>
