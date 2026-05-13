<script setup lang="ts">
import { computed, ref } from 'vue'
import { useElementSize } from '@vueuse/core'
import ShapeElement from './components/ShapeElement.vue'
import TextElement from './components/TextElement.vue'
import ToolbarElement from './components/ToolbarElement.vue'
import { useShapeElements } from './composables/useShapeElements'

const canvasRef = ref<HTMLElement | null>(null)
const { width: canvasWidth, height: canvasHeight } = useElementSize(canvasRef)

const {
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
} = useShapeElements()

const canvasBounds = computed(() => ({
  width: canvasWidth.value,
  height: canvasHeight.value,
}))
</script>

<template>
  <main class="flex h-screen w-screen flex-col bg-slate-100 p-4">
    <ToolbarElement
      :selected-element="selectedElement"
      @add-shape="addShape"
      @add-text="addText"
      @delete-selected="deleteSelectedElement"
    />

    <section
      ref="canvasRef"
      class="relative mt-4 min-h-0 flex-1 overflow-hidden rounded-lg border border-slate-300 bg-white"
      role="region"
      aria-label="Canvas area"
      @click="clearSelection"
    >
      <ShapeElement
        v-for="shape in shapes"
        :key="shape.id"
        :element="shape"
        :selected="shape.id === selectedElementId"
        :canvas-bounds="canvasBounds"
        @select="selectElement"
        @drag-move="updateElementPosition"
        @drag-end="updateElementPosition"
        @update-text="updateTextContent"
        @request-delete="deleteElementById"
      />

      <TextElement
        v-for="text in texts"
        :key="text.id"
        :element="text"
        :selected="text.id === selectedElementId"
        :canvas-bounds="canvasBounds"
        @select="selectElement"
        @drag-move="updateElementPosition"
        @drag-end="updateElementPosition"
        @request-delete="deleteElementById"
      />

      <p
        v-if="shapes.length === 0 && texts.length === 0"
        class="absolute inset-0 grid place-items-center text-sm text-slate-500"
      >
        Add a shape or text from the toolbar to start
      </p>
    </section>
  </main>
</template>
