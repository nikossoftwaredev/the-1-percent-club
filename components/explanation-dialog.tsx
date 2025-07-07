"use client"

import { Question } from "@/lib/types"

interface ExplanationDialogProps {
  question: Question
  userAnswer: string
  isCorrect: boolean
  onNext: () => void
  open: boolean
}

export function ExplanationDialog({ 
  question, 
  userAnswer, 
  isCorrect, 
  onNext,
  open 
}: ExplanationDialogProps) {
  if (!open) return null
  
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <h2 className="text-2xl font-semibold leading-none tracking-tight">
            {isCorrect ? "✅ Correct!" : "❌ Incorrect"}
          </h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Your answer:</p>
            <p className="font-semibold">{userAnswer || "No answer provided"}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Correct answer:</p>
            <p className="font-semibold">{question.answer}</p>
          </div>
          
          {question.explanationText && (
            <div>
              <p className="text-sm text-muted-foreground">Explanation:</p>
              <p>{question.explanationText}</p>
            </div>
          )}
          
          {question.explanationImage && (
            <div className="relative w-full aspect-video bg-muted rounded-lg">
              <span className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                [Explanation Image: {question.explanationImage}]
              </span>
            </div>
          )}
        </div>
        
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <button
            onClick={onNext}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Next Question
          </button>
        </div>
      </div>
    </div>
  )
}