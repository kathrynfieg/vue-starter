import { computed, ref } from 'vue'
import type { ShapeElement, ShapeType } from '../types'

interface DragPayload {
  id: string
  x: number
  y: number
}

function createShape(shapeType: ShapeType): ShapeElement {
  if (shapeType === 'rectangle') {
    return {
      id: crypto.randomUUID(),
      type: 'shape',
      shapeType: 'rectangle',
      x: 40,
      y: 40,
      width: 140,
      height: 90,
      cornerRadius: 8,
      rotation: 0,
      zIndex: Date.now(),
      style: { fill: '#3b82f6' },
    }
  }

  return {
    id: crypto.randomUUID(),
    type: 'shape',
    shapeType: 'circle',
    x: 60,
    y: 60,
    radius: 45,
    rotation: 0,
    zIndex: Date.now(),
    style: { fill: '#10b981' },
  }
}

export function useShapeElements() {
  const shapes = ref<ShapeElement[]>([])

  const selectedShapeId = ref<string | null>(null)

  const selectedElement = computed(
    () => shapes.value.find((shape) => shape.id === selectedShapeId.value) ?? null,
  )

  function addShape(shapeType: ShapeType) {
    const newShape = createShape(shapeType)
    shapes.value.push(newShape)
    selectedShapeId.value = newShape.id
  }

  function selectShape(id: string) {
    selectedShapeId.value = id
  }

  function clearSelection() {
    selectedShapeId.value = null
  }

  function updateShapePosition({ id, x, y }: DragPayload) {
    const index = shapes.value.findIndex((shape) => shape.id === id)
    if (index === -1) {
      return
    }

    const target = shapes.value[index]
    shapes.value[index] = {
      ...target,
      x,
      y,
    }
  }

  function deleteSelectedShape() {
    if (!selectedShapeId.value) {
      return
    }

    shapes.value = shapes.value.filter((shape) => shape.id !== selectedShapeId.value)
    selectedShapeId.value = null
  }

  function deleteShapeById(id: string) {
    shapes.value = shapes.value.filter((shape) => shape.id !== id)
    if (selectedShapeId.value === id) {
      selectedShapeId.value = null
    }
  }

  return {
    shapes,
    selectedShapeId,
    selectedElement,
    addShape,
    selectShape,
    clearSelection,
    updateShapePosition,
    deleteSelectedShape,
    deleteShapeById,
  }
}
