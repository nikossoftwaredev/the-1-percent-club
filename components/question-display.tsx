"use client"

import { useState } from "react"
import Image from "next/image"
import { Question } from "@/lib/types"

interface QuestionDisplayProps {
  question: Question
  progress: number
  onAnswer: (answer: string) => void
}

export function QuestionDisplay({ question, progress, onAnswer }: QuestionDisplayProps) {
  const [textAnswer, setTextAnswer] = useState("")
  
  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (textAnswer.trim()) {
      onAnswer(textAnswer.trim())
    }
  }
  
  const progressBarStyle = {
    width: `${progress}%`
  }
  
  return (
    <div className="space-y-6">
      <div className="w-full bg-secondary rounded-full h-2">
        <div 
          className="h-2 bg-primary rounded-full transition-all"
          style={progressBarStyle}
        />
      </div>
      
      <div className="text-center">
        <span className="inline-flex items-center rounded-md border px-4 py-2 text-2xl font-semibold">
          {question.level} Question
        </span>
      </div>
      
      <h2 className="text-3xl font-bold text-center">
        {question.question}
      </h2>
      
      {question.questionImage && (
        <div className="flex justify-center">
          <div className="relative w-full max-w-2xl aspect-video bg-muted rounded-lg">
            <span className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              [Question Image: {question.questionImage}]
            </span>
          </div>
        </div>
      )}
      
      <div className="max-w-2xl mx-auto">
        {question.type === 'text' && (
          <form onSubmit={handleTextSubmit} className="space-y-4">
            <input
              type="text"
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              placeholder="Type your answer..."
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              autoFocus
            />
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Submit Answer
            </button>
          </form>
        )}
        
        {question.type === 'multiple-choice' && question.options && (
          <div className="grid grid-cols-2 gap-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onAnswer(option)}
                className="p-4 text-left rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <span className="font-semibold">{String.fromCharCode(65 + index)}.</span> {option}
              </button>
            ))}
          </div>
        )}
        
        {question.type === 'image-choice' && question.imageOptions && (
          <div className="grid grid-cols-2 gap-4">
            {question.imageOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => onAnswer(option.id)}
                className="relative aspect-square rounded-lg border-2 border-input bg-muted hover:border-primary transition-colors overflow-hidden"
              >
                <span className="absolute top-2 left-2 bg-background rounded px-2 py-1 text-sm font-semibold">
                  {option.id}
                </span>
                <span className="flex items-center justify-center h-full text-muted-foreground">
                  [Image: {option.src}]
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}