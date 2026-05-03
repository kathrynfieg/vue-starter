<!-- 
Project:  Mini Editor
Description: A mini editor interface (design tool) for creating, positioning, and editing elements on a canvas.

Features:
- Canvas for displaying the elements.
- Elements to be displayed on the canvas - text, shapes, etc - should be editable.
- Drag and drop elements on the canvas.
- Local storage to save the canvas

MVP components:
- Canvas
- Elements
-->

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import EditorCanvas from './components/EditorCanvas.vue'
import {
  EDITOR_DOCUMENT_VERSION,
  MINI_EDITOR_STORAGE_KEY,
  type CanvasElement,
  type EditorDocument,
} from './types'

const elements = ref<CanvasElement[]>([])

function loadFromStorage(): void {
  try {
    const raw = localStorage.getItem(MINI_EDITOR_STORAGE_KEY)
    if (!raw) return
    const data = JSON.parse(raw) as unknown
    if (!data || typeof data !== 'object') return
    const doc = data as Partial<EditorDocument>
    if (!Array.isArray(doc.elements)) return
    elements.value = doc.elements as CanvasElement[]
  } catch {
    // ignore corrupt storage
  }
}

function saveToStorage(): void {
  const doc: EditorDocument = {
    version: EDITOR_DOCUMENT_VERSION,
    elements: elements.value,
  }
  localStorage.setItem(MINI_EDITOR_STORAGE_KEY, JSON.stringify(doc))
}

function clearCanvas(): void {
  elements.value = []
  saveToStorage()
}

onMounted(() => {
  loadFromStorage()
})

function addTextElement() {
  const n = elements.value.length
  elements.value.push({
    id: crypto.randomUUID(),
    type: 'text',
    x: 48 + (n % 6) * 24,
    y: 48 + (n % 6) * 24,
    width: 200,
    height: 40,
    text: 'New text',
  })
}

function onElementMove(payload: { id: string; x: number; y: number }) {
  const target = elements.value.find((e) => e.id === payload.id)
  if (!target) return
  target.x = payload.x
  target.y = payload.y
}

function onElementTextChange(payload: { id: string; text: string }) {
  const target = elements.value.find((e) => e.id === payload.id)
  if (!target || target.type !== 'text') return
  target.text = payload.text
}
</script>

<template>
  <div class="flex min-h-screen flex-col bg-gray-50 p-6 text-gray-900">
    <div class="flex-1">
      <h1 class="text-2xl font-semibold">Mini Editor</h1>
      <p class="mt-1 text-sm text-gray-600">
        <span v-if="elements.length === 0">No elements yet. Add one to get started.</span>
        <span v-else>{{ elements.length }} element(s).</span>
      </p>
      <button
        type="button"
        class="mt-4 rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-800 hover:bg-gray-100"
        @click="addTextElement"
      >
        Add text
      </button>
      <EditorCanvas
        class="mt-4"
        :elements="elements"
        @element-move="onElementMove"
        @element-text-change="onElementTextChange"
      />
    </div>
    <div class="mt-8 flex flex-wrap gap-2 border-t border-gray-200 pt-4">
      <button
        type="button"
        class="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-800 hover:bg-gray-100"
        @click="saveToStorage"
      >
        Save
      </button>
      <button
        type="button"
        class="rounded border border-red-200 bg-white px-3 py-1.5 text-sm text-red-800 hover:bg-red-50"
        @click="clearCanvas"
      >
        Clear
      </button>
    </div>
  </div>
</template>
