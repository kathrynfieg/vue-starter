import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TextElement from './TextElement.vue'
import type { TextElement as TextElementModel } from '../types'

function createTextElement(): TextElementModel {
  return {
    id: 'text-1',
    type: 'text',
    content: 'Hello world',
    x: 20,
    y: 30,
    width: 220,
    height: 40,
    fontSize: 24,
    fontFamily: 'Inter, sans-serif',
    color: '#0f172a',
    rotation: 0,
    zIndex: 1,
  }
}

describe('TextElement', () => {
  it('enters edit mode on double click', async () => {
    const wrapper = mount(TextElement, {
      props: {
        element: createTextElement(),
      },
    })

    await wrapper.get('[data-test="text-element"]').trigger('dblclick')

    expect(wrapper.find('[data-test="text-element-input"]').exists()).toBe(true)
  })

  it('emits update-text when editor blurs', async () => {
    const wrapper = mount(TextElement, {
      props: {
        element: createTextElement(),
      },
    })

    await wrapper.get('[data-test="text-element"]').trigger('dblclick')
    const input = wrapper.get<HTMLTextAreaElement>('[data-test="text-element-input"]')
    await input.setValue('Updated from blur')
    await input.trigger('blur')

    expect(wrapper.emitted('update-text')).toEqual([
      [{ id: 'text-1', content: 'Updated from blur' }],
    ])
  })

  it('emits update-text on Enter and exits edit mode', async () => {
    const wrapper = mount(TextElement, {
      props: {
        element: createTextElement(),
      },
    })

    await wrapper.get('[data-test="text-element"]').trigger('dblclick')
    const input = wrapper.get('[data-test="text-element-input"]')
    await input.setValue('Updated from enter')
    await input.trigger('keydown', { key: 'Enter' })

    expect(wrapper.emitted('update-text')).toEqual([
      [{ id: 'text-1', content: 'Updated from enter' }],
    ])
    expect(wrapper.find('[data-test="text-element-input"]').exists()).toBe(false)
  })

  it('cancels editing on Escape without emitting update-text', async () => {
    const wrapper = mount(TextElement, {
      props: {
        element: createTextElement(),
      },
    })

    await wrapper.get('[data-test="text-element"]').trigger('dblclick')
    const input = wrapper.get('[data-test="text-element-input"]')
    await input.setValue('Will be canceled')
    await input.trigger('keydown', { key: 'Escape' })

    expect(wrapper.emitted('update-text')).toBeUndefined()
    expect(wrapper.find('[data-test="text-element-input"]').exists()).toBe(false)
  })
})
