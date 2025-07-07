"use client"

import { useEffect, useState } from "react"

interface CountdownTimerProps {
  duration: number
  onTimeout: () => void
}

export function CountdownTimer({ duration = 30, onTimeout }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration)
  
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeout()
      return
    }
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)
    
    return () => clearInterval(timer)
  }, [timeLeft, onTimeout])
  
  const progress = (timeLeft / duration) * 100
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Time Remaining</span>
        <span className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-500' : ''}`}>
          {timeLeft}s
        </span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all ${timeLeft <= 10 ? 'bg-red-500' : 'bg-primary'}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}