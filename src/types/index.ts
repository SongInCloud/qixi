// 回忆节点（PRD REQ-STARRIVER-04）
export type MemorySize = 'small' | 'medium' | 'large'
export type MemoryColor = 'white' | 'gold'

export interface MemoryPosition {
  x: number
  y: number
}

// 移动端可提供独立定位（PRD REQ-STARRIVER-05）
export type MemoryPositions =
  | MemoryPosition
  | {
      desktop: MemoryPosition
      mobile: MemoryPosition
    }

export interface Memory {
  id: string
  title: string
  date?: string
  location?: string
  description: string
  image?: string
  images?: string[]
  category?: string
  position: MemoryPositions
  size?: MemorySize
  color?: MemoryColor
  featured?: boolean
}

// 女儿节内容卡片（PRD REQ-DAUGHTER-04）
export interface DaughterCard {
  id: string
  title: string
  subtitle: string
  content: string
}

// 七夕笺（PRD REQ-LETTER-04）
export interface Letter {
  title: string
  greeting: string
  paragraphs: string[]
  ending: string
}

// 乞巧愿望选项（PRD REQ-QIQIAO-03）
export interface WishOption {
  id: string
  label: string
  text: string
}
