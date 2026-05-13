<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import type { CanvasBounds, TextElement as TextElementModel } from '../types'

interface DragPayload {
  id: string
  x: number
  y: number
}

const props = withDefaults(
  defineProps<{
    element: TextElementModel
    selected?: boolean
    canvasBounds?: CanvasBounds
  }>(),
  {
    selected: false,
    canvasBounds: undefined,
  },
)

const emit = defineEmits<{
  (event: 'select', id: string): void
  (event: 'drag-start', payload: DragPayload): void
  (event: 'drag-move', payload: DragPayload): void
  (event: 'drag-end', payload: DragPayload): void
  (event: 'update-text', payload: { id: string; content: string }): void
  (event: 'request-delete', id: string): void
}>()

const isDragging = ref(false)
const isEditing = ref(false)
const dragOffset = ref({ x: 0, y: 0 })
const draftContent = ref(props.element.content)
const inputRef = ref<HTMLTextAreaElement | null>(null)

watch(
  () => props.element.content,
  (content) => {
    if (!isEditing.value) {
      draftContent.value = content
    }
  },
)

const textStyles = computed(() => ({
  left: '0px',
  top: '0px',
  width: `${props.element.width}px`,
  minHeight: `${props.element.height}px`,
  transform: `translate(${props.element.x}px, ${props.element.y}px) rotate(${props.element.rotation}deg)`,
  zIndex: props.element.zIndex,
  color: props.element.color,
  fontSize: `${props.element.fontSize}px`,
  fontFamily: props.element.fontFamily,
}))

function clampPosition(x: number, y: number) {
  if (!props.canvasBounds) {
    return { x, y }
  }

  const maxX = Math.max(0, props.canvasBounds.width - props.element.width)
  const maxY = Math.max(0, props.canvasBounds.height - props.element.height)
  return {
    x: Math.min(Math.max(0, x), maxX),
    y: Math.min(Math.max(0, y), maxY),
  }
}

function selectElement() {
  emit('select', props.element.id)
}

function onPointerDown(event: PointerEvent) {
  if (isEditing.value) {
    return
  }

  selectElement()
  isDragging.value = true
  dragOffset.value = {
    x: event.clientX - props.element.x,
    y: event.clientY - props.element.y,
  }

  emit('drag-start', { id: props.element.id, x: props.element.x, y: props.element.y })
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)
}

function onPointerMove(event: PointerEvent) {
  const unclampedX = event.clientX - dragOffset.value.x
  const unclampedY = event.clientY - dragOffset.value.y
  const { x, y } = clampPosition(unclampedX, unclampedY)
  emit('drag-move', { id: props.element.id, x, y })
}

function stopDragging(finalX: number, finalY: number) {
  if (!isDragging.value) {
    return
  }
  isDragging.value = false
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
  emit('drag-end', { id: props.element.id, x: finalX, y: finalY })
}

function onPointerUp(event: PointerEvent) {
  const unclampedX = event.clientX - dragOffset.value.x
  const unclampedY = event.clientY - dragOffset.value.y
  const { x, y } = clampPosition(unclampedX, unclampedY)
  stopDragging(x, y)
}

function onKeyDown(event: KeyboardEvent) {
  if (isEditing.value) {
    return
  }

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    selectElement()
    return
  }

  if (!props.selected) {
    return
  }

  if (event.key === 'Delete' || event.key === 'Backspace') {
    event.preventDefault()
    emit('request-delete', props.element.id)
  }
}

function startEditing() {
  selectElement()
  isEditing.value = true
  draftContent.value = props.element.content

  void nextTick(() => {
    inputRef.value?.focus()
    inputRef.value?.select()
  })
}

function cancelEditing() {
  isEditing.value = false
  draftContent.value = props.element.content
}

function commitEditing() {
  const nextContent = draftContent.value.trim()
  const fallback = props.element.content.trim() || 'Text'

  emit('update-text', {
    id: props.element.id,
    content: nextContent || fallback,
  })
  isEditing.value = false
}

function onEditorKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    cancelEditing()
    return
  }

  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    commitEditing()
  }
}

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
})
</script>

<template>
  <div
    data-test="text-element"
    class="absolute select-none whitespace-pre-wrap rounded px-2 py-1 outline-none"
    :class="{ 'ring-2 ring-blue-500 ring-offset-2': selected }"
    :style="textStyles"
    role="button"
    aria-label="Text element"
    :aria-selected="selected"
    tabindex="0"
    @click.stop="selectElement"
    @dblclick.stop="startEditing"
    @pointerdown.stop="onPointerDown"
    @keydown="onKeyDown"
  >
    <textarea
      v-if="isEditing"
      ref="inputRef"
      v-model="draftContent"
      data-test="text-element-input"
      class="w-full resize-none border-none bg-transparent p-0 outline-none"
      rows="1"
      aria-label="Edit text content"
      @click.stop
      @blur="commitEditing"
      @keydown="onEditorKeydown"
    />
    <span v-else>{{ element.content }}</span>
  </div>
</template>
