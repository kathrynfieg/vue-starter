import type { BaseElement } from './shape'

export interface TextElement extends BaseElement {
  type: 'text'
  content: string
  fontSize: number
  fontFamily: string
  color: string
  width: number
  height: number
}
