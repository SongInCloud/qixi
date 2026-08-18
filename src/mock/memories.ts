import type { Memory } from '@/types'

// 所有回忆节点统一在此维护（PRD REQ-STARRIVER-03）
// 内容为示例占位，请替换为真实回忆
export const memories: Memory[] = [
  {
    id: 'memory-001',
    title: '一次夜谈',
    date: '2022.07.XX',
    location: '广东佛山',
    description: '这天我第一次从你那收到了“爱你”这句话。',
    image: '/images/memories/love-you.jpg',
    category: '颠覆',
    position: {
      desktop: { x: 18, y: 30 },
      mobile: { x: 18, y: 30 },
    },
    size: 'medium',
    color: 'white',
  },
  {
    id: 'memory-002',
    title: '第一次收到你的自拍',
    date: '2024.02.23',
    location: '三河',
    description: '第一次收到了你发送的自拍，在此之前我们还闹了个别扭。即使因为这个照片我收获颇丰，但是代价太沉重了些',
    category: '自拍',
    image: '/images/memories/first-selfie.jpg',
    position: {
      desktop: { x: 36, y: 46 },
      mobile: { x: 72, y: 34 },
    },
    size: 'large',
    color: 'gold',
    featured: true,
  },
  {
    id: 'memory-003',
    title: '第一次逛街',
    date: '2024.03.02',
    location: '巴二中外',
    description: '和你绕着学校逛了一圈，这天我将我的手机托付给了你，给你买了零食，聊了一路，对我来说这天堪称奇幻',
    category: '逛街',
    position: {
      desktop: { x: 58, y: 32 },
      mobile: { x: 38, y: 46 },
    },
    size: 'large',
    color: 'gold',
    featured: true,
  },
  {
    id: 'memory-004',
    title: '我的记忆',
    date: '2024.07.16',
    description: '我机缘巧合下来了场夜游母校，那晚我感慨良多，我向你倾诉了很多，我很庆幸，在意义非凡的这天，有你陪在我身边，我和一起经历。',
    category: '陪同',
    images: [
      '/images/memories/school-1.jpg',
      '/images/memories/school-2.jpg',
    ],
    position: {
      desktop: { x: 78, y: 48 },
      mobile: { x: 76, y: 52 },
    },
    size: 'medium',
    color: 'gold',
  },
  {
    id: 'memory-005',
    title: '一块出去旅游',
    date: '2024.10.03',
    location: '陕西西安',
    description: '这年国庆我，你舅妈家，琴姐家和你们一家去了西安，很棒的一次旅行',
    category: '旅行',
    images: [
      '/images/memories/xian-1.jpg',
      '/images/memories/xian-2.jpg',
    ],
    position: {
      desktop: { x: 24, y: 68 },
      mobile: { x: 22, y: 64 },
    },
    size: 'small',
    color: 'white',
  },
  {
    id: 'memory-006',
    title: '你成年了',
    date: '2026.04.12',
    description: '父母为你举办了隆重的成年礼。我们互相陪伴了彼此的青春，谢谢你。',
    category: '生日',
        images: [
      '/images/memories/birthday-1.jpg',
      '/images/memories/birthday-2.jpg',
    ],
    position: {
      desktop: { x: 52, y: 62 },
      mobile: { x: 55, y: 70 },
    },
    size: 'medium',
    color: 'gold',
  },
  {
    id: 'memory-007',
    title: '毕业啦',
    date: '2026.06.07',
    description: '我亲爱的妹妹苦熬三年，终于得脱樊笼，毕业照中的你宝相庄严，可爱捏。',
    category: '毕业',
    image: '/images/memories/graduation.png',
    position: {
      desktop: { x: 78, y: 72 },
      mobile: { x: 82, y: 78 },
    },
    size: 'large',
    color: 'gold',
  },
]
