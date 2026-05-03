<script setup lang="ts">
import { nextTick, ref } from 'vue'
import type { TextElement } from '../types'

const props = defineProps<{
  element: TextElement
}>()

const emit = defineEmits<{
  move: [payload: { id: string; x: number; y: number }]
  textChange: [payload: { id: string; text: string }]
}>()

const dragging = ref(false)
const isEditing = ref(false)
const draftText = ref('')
const textareaRef = ref<HTMLTextAreaElement | null>(null)

let pointerStart = { x: 0, y: 0 }
let elementStart = { x: 0, y: 0 }

function onPointerDown(e: PointerEvent) {
  if (e.button !== 0 || isEditing.value) return
  e.preventDefault()
  const el = e.currentTarget as HTMLElement
  el.setPointerCapture(e.pointerId)
  dragging.value = true
  pointerStart = { x: e.clientX, y: e.clientY }
  elementStart = { x: props.element.x, y: props.element.y }
}

function onPointerMove(e: PointerEvent) {
  if (!dragging.value) return
  const dx = e.clientX - pointerStart.x
  const dy = e.clientY - pointerStart.y
  emit('move', {
    id: props.element.id,
    x: elementStart.x + dx,
    y: elementStart.y + dy,
  })
}

function endDrag(e: PointerEvent) {
  if (!dragging.value) return
  dragging.value = false
  const el = e.currentTarget as HTMLElement
  if (el.hasPointerCapture(e.pointerId)) {
    el.releasePointerCapture(e.pointerId)
  }
}

async function startEdit() {
  draftText.value = props.element.text
  isEditing.value = true
  await nextTick()
  const ta = textareaRef.value
  if (ta) {
    ta.focus()
    ta.select()
  }
}

function commitEdit() {
  if (!isEditing.value) return
  isEditing.value = false
  emit('textChange', { id: props.element.id, text: draftText.value })
}

function cancelEdit() {
  if (!isEditing.value) return
  isEditing.value = false
  draftText.value = props.element.text
}
</script>

<template>
  <div
    class="absolute box-border overflow-hidden border border-gray-300 bg-white text-sm text-gray-900"
    :style="{
      left: `${element.x}px`,
      top: `${element.y}px`,
      width: `${element.width}px`,
      height: `${element.height}px`,
    }"
  >
    <div
      v-if="!isEditing"
      class="h-full w-full cursor-grab touch-none select-none overflow-hidden px-1 py-0.5 active:cursor-grabbing"
      title="Double-click to edit"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="endDrag"
      @pointercancel="endDrag"
      @dblclick.prevent="startEdit"
    >
      {{ element.text }}
    </div>
    <textarea
      v-else
      ref="textareaRef"
      v-model="draftText"
      class="box-border h-full w-full resize-none border-0 bg-transparent px-1 py-0.5 font-inherit text-sm text-gray-900 outline-none"
      @blur="commitEdit"
      @keydown.esc.prevent="cancelEdit"
    />
  </div>
</template>
