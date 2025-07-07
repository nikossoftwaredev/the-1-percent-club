export interface ImageOption {
  src: string
  id: string
}

export interface Question {
  episode: string
  level: string
  question: string
  type: 'multiple-choice' | 'text' | 'image-choice'
  questionImage?: string
  questionText?: string
  options?: string[]
  imageOptions?: ImageOption[]
  answer: string
  explanationText: string
  explanationImage?: string | null
}

export interface Episode {
  date: string
  questions: Question[]
}