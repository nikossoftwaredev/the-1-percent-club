"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { QuestionPreview } from "@/components/question-preview"
import { QuestionDisplay } from "@/components/question-display"
import { CountdownTimer } from "@/components/countdown-timer"
import { ExplanationDialog } from "@/components/explanation-dialog"
import { Question } from "@/lib/types"

export default function EpisodePage() {
  const params = useParams()
  const [gamePhase, setGamePhase] = useState<'preview' | 'question' | 'explanation' | 'complete'>('preview')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [episodeData, setEpisodeData] = useState<Question[] | null>(null)
  const [userAnswer, setUserAnswer] = useState<string>("")
  const [isCorrect, setIsCorrect] = useState<boolean>(false)
  
  useEffect(() => {
    fetch(`/data/episodes/episode-${params.episode}.json`)
      .then(res => res.json())
      .then(data => setEpisodeData(data))
  }, [params.episode])
  
  const handleStart = () => {
    setGamePhase('question')
  }
  
  const handleTimeout = () => {
    setIsCorrect(false)
    setGamePhase('explanation')
  }
  
  const handleAnswer = (answer: string) => {
    if (!episodeData) return
    
    const currentQuestion = episodeData[currentQuestionIndex]
    const correct = answer.toLowerCase() === currentQuestion.answer.toLowerCase()
    
    setUserAnswer(answer)
    setIsCorrect(correct)
    if (correct) {
      setScore(score + 1)
    }
    setGamePhase('explanation')
  }
  
  const handleNext = () => {
    if (!episodeData) return
    
    if (currentQuestionIndex < episodeData.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setUserAnswer("")
      setGamePhase('question')
    } else {
      setGamePhase('complete')
    }
  }
  
  if (!episodeData) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  
  const currentQuestion = episodeData[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / episodeData.length) * 100
  
  return (
    <div className="min-h-screen p-4">
      {gamePhase === 'preview' && (
        <QuestionPreview onStart={handleStart} />
      )}
      
      {gamePhase === 'question' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <CountdownTimer duration={30} onTimeout={handleTimeout} />
          <QuestionDisplay 
            question={currentQuestion}
            progress={progress}
            onAnswer={handleAnswer}
          />
        </div>
      )}
      
      {gamePhase === 'explanation' && (
        <ExplanationDialog 
          question={currentQuestion}
          userAnswer={userAnswer}
          isCorrect={isCorrect}
          onNext={handleNext}
          open={true}
        />
      )}
      
      {gamePhase === 'complete' && (
        <div className="max-w-2xl mx-auto text-center space-y-8 p-8">
          <h1 className="text-4xl font-bold">Game Complete!</h1>
          <p className="text-2xl">
            You got {score} out of {episodeData.length} questions correct
          </p>
          <div className="text-lg text-muted-foreground">
            {score === episodeData.length && "Perfect score! You're in the 1% Club!"}
            {score >= episodeData.length * 0.8 && score < episodeData.length && "Great job! Almost there!"}
            {score < episodeData.length * 0.8 && "Keep practicing to join the 1% Club!"}
          </div>
          <a 
            href="/"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Back to Episodes
          </a>
        </div>
      )}
    </div>
  )
}