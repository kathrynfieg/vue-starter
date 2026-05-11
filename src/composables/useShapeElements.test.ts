import { describe, expect, it } from 'vitest'
import { useShapeElements } from './useShapeElements'

describe('useShapeElements', () => {
  it('adds a rectangle and selects it', () => {
    const { shapes, selectedShapeId, selectedElement, addShape } = useShapeElements()

    addShape('rectangle')

    expect(shapes.value).toHaveLength(1)
    expect(shapes.value[0].shapeType).toBe('rectangle')
    expect(selectedShapeId.value).toBe(shapes.value[0].id)
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
    const { shapes, selectedShapeId, selectedElement, addShape, selectShape, clearSelection } =
      useShapeElements()

    addShape('rectangle')
    addShape('circle')

    const firstId = shapes.value[0].id
    selectShape(firstId)

    expect(selectedShapeId.value).toBe(firstId)
    expect(selectedElement.value?.id).toBe(firstId)

    clearSelection()

    expect(selectedShapeId.value).toBeNull()
    expect(selectedElement.value).toBeNull()
  })

  it('updates the position of a specific shape', () => {
    const { shapes, addShape, updateShapePosition } = useShapeElements()

    addShape('rectangle')
    addShape('circle')

    const targetId = shapes.value[1].id
    updateShapePosition({ id: targetId, x: 300, y: 220 })

    expect(shapes.value[1].x).toBe(300)
    expect(shapes.value[1].y).toBe(220)
    expect(shapes.value[0].x).toBe(40)
    expect(shapes.value[0].y).toBe(40)
  })

  it('does not update any shape when id is unknown', () => {
    const { shapes, addShape, updateShapePosition } = useShapeElements()

    addShape('rectangle')
    const before = { x: shapes.value[0].x, y: shapes.value[0].y }

    updateShapePosition({ id: 'unknown-id', x: 999, y: 999 })

    expect(shapes.value[0].x).toBe(before.x)
    expect(shapes.value[0].y).toBe(before.y)
  })

  it('deletes selected shape and clears selection', () => {
    const { shapes, selectedShapeId, addShape, deleteSelectedShape } = useShapeElements()

    addShape('rectangle')
    addShape('circle')

    const selectedId = selectedShapeId.value
    deleteSelectedShape()

    expect(selectedShapeId.value).toBeNull()
    expect(shapes.value.find((shape) => shape.id === selectedId)).toBeUndefined()
    expect(shapes.value).toHaveLength(1)
  })

  it('deletes shape by id and clears selection when deleting selected', () => {
    const { shapes, selectedShapeId, addShape, selectShape, deleteShapeById } = useShapeElements()

    addShape('rectangle')
    addShape('circle')
    const firstId = shapes.value[0].id

    selectShape(firstId)
    deleteShapeById(firstId)

    expect(selectedShapeId.value).toBeNull()
    expect(shapes.value).toHaveLength(1)
    expect(shapes.value[0].shapeType).toBe('circle')
  })
})
