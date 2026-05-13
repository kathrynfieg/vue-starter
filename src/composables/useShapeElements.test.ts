import { describe, expect, it } from 'vitest'
import { useShapeElements } from './useShapeElements'

describe('useShapeElements', () => {
  it('adds a rectangle and selects it', () => {
    const { shapes, selectedElementId, selectedElement, addShape } = useShapeElements()

    addShape('rectangle')

    expect(shapes.value).toHaveLength(1)
    expect(shapes.value[0].shapeType).toBe('rectangle')
    expect(selectedElementId.value).toBe(shapes.value[0].id)
    expect(selectedElement.value?.id).toBe(shapes.value[0].id)
  })

  it('adds a circle with expected default values', () => {
    const { shapes, addShape } = useShapeElements()

    addShape('circle')

    expect(shapes.value).toHaveLength(1)
    expect(shapes.value[0]).toMatchObject({
      type: 'shape',
      shapeType: 'circle',
      x: 60,
      y: 60,
      radius: 45,
      rotation: 0,
      style: { fill: '#10b981' },
    })
  })

  it('selects and clears selection', () => {
    const { shapes, selectedElementId, selectedElement, addShape, selectElement, clearSelection } =
      useShapeElements()

    addShape('rectangle')
    addShape('circle')

    const firstId = shapes.value[0].id
    selectElement(firstId)

    expect(selectedElementId.value).toBe(firstId)
    expect(selectedElement.value?.id).toBe(firstId)

    clearSelection()

    expect(selectedElementId.value).toBeNull()
    expect(selectedElement.value).toBeNull()
  })

  it('updates the position of a specific shape', () => {
    const { shapes, addShape, updateElementPosition } = useShapeElements()

    addShape('rectangle')
    addShape('circle')

    const targetId = shapes.value[1].id
    updateElementPosition({ id: targetId, x: 300, y: 220 })

    expect(shapes.value[1].x).toBe(300)
    expect(shapes.value[1].y).toBe(220)
    expect(shapes.value[0].x).toBe(40)
    expect(shapes.value[0].y).toBe(40)
  })

  it('does not update any shape when id is unknown', () => {
    const { shapes, addShape, updateElementPosition } = useShapeElements()

    addShape('rectangle')
    const before = { x: shapes.value[0].x, y: shapes.value[0].y }

    updateElementPosition({ id: 'unknown-id', x: 999, y: 999 })

    expect(shapes.value[0].x).toBe(before.x)
    expect(shapes.value[0].y).toBe(before.y)
  })

  it('deletes selected shape and clears selection', () => {
    const { shapes, selectedElementId, addShape, deleteSelectedElement } = useShapeElements()

    addShape('rectangle')
    addShape('circle')

    const selectedId = selectedElementId.value
    deleteSelectedElement()

    expect(selectedElementId.value).toBeNull()
    expect(shapes.value.find((shape) => shape.id === selectedId)).toBeUndefined()
    expect(shapes.value).toHaveLength(1)
  })

  it('deletes shape by id and clears selection when deleting selected', () => {
    const { shapes, selectedElementId, addShape, selectElement, deleteElementById } =
      useShapeElements()

    addShape('rectangle')
    addShape('circle')
    const firstId = shapes.value[0].id

    selectElement(firstId)
    deleteElementById(firstId)

    expect(selectedElementId.value).toBeNull()
    expect(shapes.value).toHaveLength(1)
    expect(shapes.value[0].shapeType).toBe('circle')
  })

  it('adds a text element and selects it', () => {
    const { texts, selectedElement, selectedElementId, addText } = useShapeElements()

    addText()

    expect(texts.value).toHaveLength(1)
    expect(texts.value[0]).toMatchObject({
      type: 'text',
      content: 'Double click to edit',
      fontSize: 24,
    })
    expect(selectedElementId.value).toBe(texts.value[0].id)
    expect(selectedElement.value?.type).toBe('text')
  })

  it('updates text content by id', () => {
    const { texts, addText, updateTextContent } = useShapeElements()

    addText()
    const textId = texts.value[0].id
    updateTextContent({ id: textId, content: 'Updated text' })

    expect(texts.value[0].content).toBe('Updated text')
  })
})
