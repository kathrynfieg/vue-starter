type ShapeType = 'circle' | 'rectangle'

type ElementType = 'text' | 'shape'

export interface BaseElement {
  id: string
  type: ElementType
  x: number
  y: number
  width: number
  height: number
}

export interface TextElement extends BaseElement {
  type: 'text'
  text: string
}

export interface ShapeElement extends BaseElement {
  type: 'shape'
  shape: ShapeType
}

export type CanvasElement = TextElement | ShapeElement

export const MINI_EDITOR_STORAGE_KEY = 'mini-editor:document'

/** Bump when the JSON shape changes (migrations). */
export const EDITOR_DOCUMENT_VERSION = 1

export interface EditorDocument {
  version: number
  elements: CanvasElement[]
}
