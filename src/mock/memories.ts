import type { Memory } from '@/types'

// 所有回忆节点统一在此维护（PRD REQ-STARRIVER-03）
// 内容为示例占位，请替换为真实回忆
export const memories: Memory[] = [
  {
    id: 'memory-001',
    title: '第一次外出',
    date: '2026.XX.XX',
    location: '某个地方',
    description: '这里填写关于第一次外出的回忆内容。',
    images: [
      '/images/memories/placeholder-01.svg',
      '/images/memories/placeholder-02.svg',
    ],
    category: '相遇',
    position: {
      desktop: { x: 30, y: 42 },
      mobile: { x: 28, y: 36 },
    },
    size: 'large',
    color: 'gold',
    featured: true,
  },
  {
    id: 'memory-002',
    title: '一次夜谈',
    date: '2026.XX.XX',
    location: '某处',
    description: '这里填写关于一次夜谈的回忆内容。',
    image: '/images/memories/placeholder-03.svg',
    category: '日常',
    position: {
      desktop: { x: 62, y: 30 },
      mobile: { x: 66, y: 34 },
    },
    size: 'medium',
  },
  {
    id: 'memory-003',
    title: '喜欢的东西',
    date: '2026.XX.XX',
    description: '这里填写一条关于她喜欢的东西的回忆。',
    category: '喜好',
    position: {
      desktop: { x: 22, y: 64 },
      mobile: { x: 26, y: 64 },
    },
    size: 'small',
  },
  {
    id: 'memory-004',
    title: '一句说过的话',
    date: '2026.XX.XX',
    description: '这里填写一句她说过的话，以及当时的情形。',
    category: '话语',
    position: {
      desktop: { x: 76, y: 58 },
      mobile: { x: 68, y: 66 },
    },
    size: 'medium',
    color: 'gold',
  },
]
