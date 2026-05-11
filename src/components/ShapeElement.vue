<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import type { CanvasBounds, ShapeElement } from '../types/shape'

interface DragPayload {
  id: string
  x: number
  y: number
}

const props = withDefaults(
  defineProps<{
    element: ShapeElement
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
  (event: 'request-delete', id: string): void
}>()

const isDragging = ref(false)
const dragOffset = ref({ x: 0, y: 0 })

const shapeWidth = computed(() =>
  props.element.shapeType === 'rectangle' ? props.element.width : props.element.radius * 2,
)

const shapeHeight = computed(() =>
  props.element.shapeType === 'rectangle' ? props.element.height : props.element.radius * 2,
)

const ariaLabel = computed(() => {
  const shapeName = props.element.shapeType === 'rectangle' ? 'Rectangle' : 'Circle'
  return `${shapeName} shape`
})

const shapeStyles = computed(() => {
  const baseStyles: Record<string, string | number> = {
    left: '0px',
    top: '0px',
    width: `${shapeWidth.value}px`,
    height: `${shapeHeight.value}px`,
    transform: `translate(${props.element.x}px, ${props.element.y}px) rotate(${props.element.rotation}deg)`,
    zIndex: props.element.zIndex,
    backgroundColor: props.element.style.fill,
  }

  if (props.element.shapeType === 'rectangle') {
    baseStyles.borderRadius = `${props.element.cornerRadius ?? 0}px`
  } else {
    baseStyles.borderRadius = '9999px'
  }

  return baseStyles
})

function clampPosition(x: number, y: number) {
  if (!props.canvasBounds) {
    return { x, y }
  }

  const maxX = Math.max(0, props.canvasBounds.width - shapeWidth.value)
  const maxY = Math.max(0, props.canvasBounds.height - shapeHeight.value)

  return {
    x: Math.min(Math.max(0, x), maxX),
    y: Math.min(Math.max(0, y), maxY),
  }
}

function selectShape() {
  emit('select', props.element.id)
}

function onPointerDown(event: PointerEvent) {
  selectShape()

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
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    selectShape()
    return
  }

  if (!props.selected) {
    return
  }

  if (event.key === 'Delete' || event.key === 'Backspace') {
    event.preventDefault()
    emit('request-delete', props.element.id)
    return
  }

  const step = event.shiftKey ? 10 : 1
  let nextX = props.element.x
  let nextY = props.element.y

  if (event.key === 'ArrowLeft') nextX -= step
  else if (event.key === 'ArrowRight') nextX += step
  else if (event.key === 'ArrowUp') nextY -= step
  else if (event.key === 'ArrowDown') nextY += step
  else return

  event.preventDefault()
  const clamped = clampPosition(nextX, nextY)
  emit('drag-move', { id: props.element.id, x: clamped.x, y: clamped.y })
  emit('drag-end', { id: props.element.id, x: clamped.x, y: clamped.y })
}

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
})
</script>

<template>
  <div
    class="shape-element absolute touch-none outline-none"
    :class="{
      'ring-2 ring-blue-500 ring-offset-2': selected,
    }"
    :style="shapeStyles"
    role="button"
    :aria-label="ariaLabel"
    :aria-selected="selected"
    tabindex="0"
    @click.stop="selectShape"
    @pointerdown.stop="onPointerDown"
    @keydown="onKeyDown"
  />
</template>
