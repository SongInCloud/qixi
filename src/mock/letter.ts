import type { Letter } from '@/types'

// 七夕笺信件内容（PRD REQ-LETTER-03）
// 中间段落必须由项目作者自己填写，不由 AI 自动生成
export const letter: Letter = {
  title: '七夕笺',
  greeting: '展信安。',
  paragraphs: [
    '这里填写第一段。',
    '这里填写第二段。',
    '这里填写第三段。',
  ],
  ending: '七夕快乐。',
}
