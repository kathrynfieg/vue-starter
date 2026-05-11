import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ShapeElement from './ShapeElement.vue'
import type { ShapeElement as ShapeElementModel } from '../types'

function dispatchPointerEvent(
  target: EventTarget,
  type: 'pointerdown' | 'pointermove' | 'pointerup',
  clientX: number,
  clientY: number,
) {
  const event = new Event(type, { bubbles: true }) as Event & {
    clientX: number
    clientY: number
    button: number
  }

  Object.defineProperties(event, {
    clientX: { value: clientX },
    clientY: { value: clientY },
    button: { value: 0 },
  })

  target.dispatchEvent(event)
}

function createRectangleElement(): ShapeElementModel {
  return {
    id: 'shape-1',
    type: 'shape',
    shapeType: 'rectangle',
    x: 40,
    y: 40,
    width: 140,
    height: 90,
    cornerRadius: 8,
    rotation: 0,
    zIndex: 1,
    style: {
      fill: '#3b82f6',
    },
  }
}

describe('ShapeElement', () => {
  it('emits select when clicked', async () => {
    const wrapper = mount(ShapeElement, {
      props: {
        element: createRectangleElement(),
      },
    })

    await wrapper.get('[data-test="shape-element"]').trigger('click')

    expect(wrapper.emitted('select')).toEqual([['shape-1']])
  })

  it('emits select on Enter key', async () => {
    const wrapper = mount(ShapeElement, {
      props: {
        element: createRectangleElement(),
      },
    })

    await wrapper.get('[data-test="shape-element"]').trigger('keydown', { key: 'Enter' })

    expect(wrapper.emitted('select')).toEqual([['shape-1']])
  })

  it('emits request-delete when selected and Delete is pressed', async () => {
    const wrapper = mount(ShapeElement, {
      props: {
        element: createRectangleElement(),
        selected: true,
      },
    })

    await wrapper.get('[data-test="shape-element"]').trigger('keydown', { key: 'Delete' })

    expect(wrapper.emitted('request-delete')).toEqual([['shape-1']])
  })

  it('does not emit request-delete when not selected', async () => {
    const wrapper = mount(ShapeElement, {
      props: {
        element: createRectangleElement(),
        selected: false,
      },
    })

    await wrapper.get('[data-test="shape-element"]').trigger('keydown', { key: 'Delete' })

    expect(wrapper.emitted('request-delete')).toBeUndefined()
  })

  it('emits drag events and clamps movement to canvas bounds', async () => {
    const wrapper = mount(ShapeElement, {
      props: {
        element: createRectangleElement(),
        canvasBounds: { width: 200, height: 200 },
      },
    })

    dispatchPointerEvent(wrapper.get('[data-test="shape-element"]').element, 'pointerdown', 50, 60)
    dispatchPointerEvent(window, 'pointermove', 400, 400)
    dispatchPointerEvent(window, 'pointerup', 400, 400)

    expect(wrapper.emitted('drag-start')).toEqual([[{ id: 'shape-1', x: 40, y: 40 }]])
    expect(wrapper.emitted('drag-move')).toContainEqual([{ id: 'shape-1', x: 60, y: 110 }])
    expect(wrapper.emitted('drag-end')).toContainEqual([{ id: 'shape-1', x: 60, y: 110 }])
  })

  it('emits keyboard nudge drag-move and drag-end', async () => {
    const wrapper = mount(ShapeElement, {
      props: {
        element: createRectangleElement(),
        selected: true,
        canvasBounds: { width: 500, height: 500 },
      },
    })

    await wrapper.get('[data-test="shape-element"]').trigger('keydown', { key: 'ArrowRight' })

    expect(wrapper.emitted('drag-move')).toContainEqual([{ id: 'shape-1', x: 41, y: 40 }])
    expect(wrapper.emitted('drag-end')).toContainEqual([{ id: 'shape-1', x: 41, y: 40 }])
  })
})
