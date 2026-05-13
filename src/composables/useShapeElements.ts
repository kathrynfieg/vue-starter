import { computed, ref } from 'vue'
import type { ShapeElement, ShapeType, TextElement } from '../types'

interface DragPayload {
  id: string
  x: number
  y: number
}

interface UpdateTextPayload {
  id: string
  content: string
}

type CanvasElement = ShapeElement | TextElement

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

function createText(): TextElement {
  return {
    id: crypto.randomUUID(),
    type: 'text',
    content: 'Double click to edit',
    x: 80,
    y: 80,
    width: 220,
    height: 40,
    fontSize: 24,
    fontFamily: 'Inter, sans-serif',
    color: '#0f172a',
    rotation: 0,
    zIndex: Date.now(),
  }
}

export function useShapeElements() {
  const elements = ref<CanvasElement[]>([])

  const selectedElementId = ref<string | null>(null)

  const selectedElement = computed(
    () => elements.value.find((element) => element.id === selectedElementId.value) ?? null,
  )

  const shapes = computed(() =>
    elements.value.filter((element): element is ShapeElement => element.type === 'shape'),
  )

  const texts = computed(() =>
    elements.value.filter((element): element is TextElement => element.type === 'text'),
  )

  function addShape(shapeType: ShapeType) {
    const newShape = createShape(shapeType)
    elements.value.push(newShape)
    selectedElementId.value = newShape.id
  }

  function addText() {
    const newText = createText()
    elements.value.push(newText)
    selectedElementId.value = newText.id
  }

  function selectElement(id: string) {
    selectedElementId.value = id
  }

  function clearSelection() {
    selectedElementId.value = null
  }

  function updateElementPosition({ id, x, y }: DragPayload) {
    const index = elements.value.findIndex((element) => element.id === id)
    if (index === -1) {
      return
    }

    const target = elements.value[index]
    elements.value[index] = {
      ...target,
      x,
      y,
    }
  }

  function deleteSelectedElement() {
    if (!selectedElementId.value) {
      return
    }

    elements.value = elements.value.filter((element) => element.id !== selectedElementId.value)
    selectedElementId.value = null
  }

  function deleteElementById(id: string) {
    elements.value = elements.value.filter((element) => element.id !== id)
    if (selectedElementId.value === id) {
      selectedElementId.value = null
    }
  }

  function updateTextContent({ id, content }: UpdateTextPayload) {
    const index = elements.value.findIndex(
      (element): element is TextElement => element.type === 'text' && element.id === id,
    )
    if (index === -1) {
      return
    }

    elements.value[index] = {
      ...elements.value[index],
      content,
    }
  }

  return {
    elements,
    shapes,
    texts,
    selectedElementId,
    selectedElement,
    addShape,
    addText,
    selectElement,
    clearSelection,
    updateElementPosition,
    updateTextContent,
    deleteSelectedElement,
    deleteElementById,
  }
}
