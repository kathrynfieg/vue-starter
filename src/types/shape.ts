export type ShapeType = 'rectangle' | 'circle'

export type CanvasElementType = 'shape' | 'text'

export interface BaseElement {
  id: string
  type: CanvasElementType
  x: number
  y: number
  rotation: number
  zIndex: number
  // isLocked?: boolean
}

export interface ShapeStyle {
  fill: string
}

interface ShapeBase extends BaseElement {
  type: 'shape'
  shapeType: ShapeType
  style: ShapeStyle
}

export interface RectangleShape extends ShapeBase {
  shapeType: 'rectangle'
  width: number
  height: number
  cornerRadius?: number
}

export interface CircleShape extends ShapeBase {
  shapeType: 'circle'
  radius: number
}

export type ShapeElement = RectangleShape | CircleShape

export interface CanvasBounds {
  width: number
  height: number
}
