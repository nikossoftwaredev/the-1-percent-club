# The 1% Club Training App - Project Instructions

## 🎯 Project Overview

Build a web application that recreates The 1% Club game show experience, allowing users to:
- Select and play through actual episodes
- Answer questions from 90% down to 1% difficulty
- Support multiple question types (text input, multiple choice, image selection)
- Display visual explanations with images

## 📋 Requirements

### Core Features
1. **Episode Selection Screen**
   - List all available episodes
   - Show episode date and preview info
   - Load episode data from JSON files

2. **Game Flow**
   - Progress through questions in order (90% → 1%)
   - Show current question level prominently
   - Track progress through the episode

3. **Question Types**
   - Text input (user types answer)
   - Multiple choice (A/B/C/D text options)
   - Image choice (select from multiple images)

4. **Answer & Explanation System**
   - Immediate feedback on answer submission
   - Show explanation text
   - Display explanation images when available
   - Continue to next question button

### Data Structure
Each episode stored as `episode-YYYY-MM-DD.json` with this format:
```json
[
  {
    "episode": "2023-04-14",
    "level": "90%",
    "question": "Question text here",
    "type": "multiple-choice|text|image-choice",
    "options": ["A", "B", "C", "D"], // for multiple-choice
    "imageOptions": [
      { "src": "path/to/image.png", "id": "A" }
    ], // for image-choice
    "answer": "correct answer",
    "explanationText": "Why this is correct",
    "explanationImage": "path/to/explanation.png" // optional
  }
]
```

## 🏗️ Technical Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**: React hooks (useState, useReducer)
- **Animations**: Framer Motion (optional)

### Frontend Structure
```
app/
├── layout.tsx
├── page.tsx (episode selector - lists all episodes)
├── [episode]/
│   └── page.tsx (game screen for specific episode)
├── components/
│   ├── ui/ (shadcn components)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── progress.tsx
│   │   └── ...
│   ├── episode-card.tsx
│   ├── question-preview.tsx
│   ├── question-display.tsx
│   ├── answer-input.tsx
│   ├── image-selector.tsx
│   ├── explanation-dialog.tsx
│   ├── countdown-timer.tsx
│   └── game-progress.tsx
├── lib/
│   ├── utils.ts
│   └── game-logic.ts
├── data/
│   └── episodes/
│       ├── episode-2023-04-14.json
│       └── episode-2023-04-21.json
└── public/
    └── images/
        ├── episode-2023-04-14/
        │   ├── q1-opt1.png
        │   ├── q1-explained.png
        │   └── ...
        └── episode-2023-04-21/
```

### State Management
Track these key states:
- `selectedEpisode`: Current episode data
- `gamePhase`: 'preview' | 'question' | 'explanation' | 'complete'
- `currentQuestionIndex`: Position in question array
- `userAnswer`: Current input/selection
- `showExplanation`: Boolean for modal display
- `score`: Questions answered correctly
- `timeRemaining`: Seconds left for current question (30s countdown)
- `gameComplete`: Boolean when episode finished

## 🎨 UI/UX Guidelines

### Design Principles
1. **Clean & Minimal**: Focus on the question, avoid distractions
2. **Clear Hierarchy**: Question level (90%, 80%, etc.) should be prominent
3. **Responsive**: Work on mobile and desktop
4. **Accessible**: High contrast, clear fonts, keyboard navigation

### Key Screens

#### Episode Selection (app/page.tsx)
- Grid layout using shadcn Card components
- Each card shows:
  - Episode date (using shadcn Badge for styling)
  - Thumbnail or preview
  - Link to /[episode] route

#### Question Preview Screen (app/[episode]/page.tsx - initial state)
- Shows all question percentages (90%, 80%, 70%, etc.)
- Visual preview of difficulty progression
- "Start Game" button to begin
- Brief rules/instructions

#### Question Screen (app/[episode]/page.tsx - game state)
- Top: Countdown timer (30 seconds per question)
- Header: Current level prominently displayed (e.g., "70% Question")
- Progress: shadcn Progress component showing game progression
- Center: Question text (using Tailwind typography classes)
- Bottom: Answer input area (varies by type)
- Side/Corner: Score tracker using Badge component

#### Answer Types
- **Text Input**: shadcn Input with Button for submission
- **Multiple Choice**: 4 shadcn Buttons in grid layout
- **Image Choice**: Custom grid with hover states and selection borders

#### Explanation Modal
- shadcn Dialog component containing:
  - Success/Error state with appropriate colors
  - DialogTitle with correct/incorrect indicator
  - DialogDescription with explanation text
  - Image display area (if explanation image exists)
  - DialogFooter with "Next Question" Button

## 🚀 Implementation Steps

### Phase 1: Setup & Data
1. Initialize Next.js app with TypeScript:
   ```bash
   npx create-next-app@latest the-1-percent-club --typescript --tailwind --app
   ```
2. Install shadcn/ui:
   ```bash
   npx shadcn-ui@latest init
   ```
3. Add required shadcn components:
   ```bash
   npx shadcn-ui@latest add button card dialog input progress badge
   ```
4. Create folder structure as outlined above
5. Add sample episode JSON files
6. Set up image assets directory

### Phase 2: Core Components
1. Build EpisodeSelector component using shadcn Card
2. Create QuestionDisplay with type detection
3. Implement answer input components:
   - TextInput (using shadcn Input)
   - MultipleChoice (using shadcn Button)
   - ImageSelector (custom with shadcn styling)
4. Add ExplanationDialog (using shadcn Dialog)

### Phase 3: Game Logic
1. Wire up episode loading from JSON files
2. Implement game phases (preview → question → explanation)
3. Add 30-second countdown timer per question
4. Implement answer validation
5. Track score through episode
6. Handle timeout scenarios

### Phase 4: Polish
1. Add transitions between questions
2. Implement progress indicators
3. Add sound effects (optional)
4. Create end-of-episode summary

## 🧪 Testing Checklist

### Functionality Tests
- [ ] Episodes load correctly from JSON
- [ ] All question types display properly
- [ ] Answers validate correctly
- [ ] Progress saves between questions
- [ ] Images load and display correctly
- [ ] Explanation modal shows/hides properly

### Edge Cases
- [ ] Handle missing images gracefully
- [ ] Support questions without explanations
- [ ] Handle network errors when loading assets
- [ ] Prevent double-submission of answers

## 📱 Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎯 Success Criteria
- Users can complete full episodes
- All question types work smoothly
- Visual feedback is clear and immediate
- App feels like the real TV show experience

## 📊 Sample Data
A complete episode JSON file has been created at `data/episodes/episode-2025-01-25.json` with questions from all difficulty levels (90% down to 1%). This includes:
- Multiple choice questions
- Text input questions
- Image-based questions
- Questions with visual elements (crosswords, diagrams, etc.)

Note: Image files referenced in the JSON need to be created/added to `public/images/episode-2025-01-25/`

## 🔮 Future Enhancements
- User accounts & progress tracking
- Leaderboards per episode
- Daily challenge mode
- Question creation tools
- Social sharing of scores

## 💻 Code Examples

### Sample Episode Card Component
```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function EpisodeCard({ episode }) {
  return (
    <Link href={`/${episode.date}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <CardTitle>Episode {episode.date}</CardTitle>
          <CardDescription>
            <Badge variant="secondary">12 Questions</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Test yourself from 90% down to 1%
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
```

### Sample Question Preview Component
```tsx
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const percentages = ["90%", "80%", "70%", "60%", "50%", "40%", "30%", "20%", "15%", "10%", "5%", "1%"]

export function QuestionPreview({ onStart }) {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center">The 1% Club</h1>
      
      <div className="text-center space-y-4">
        <p className="text-xl">Answer 12 questions, from easy to impossible!</p>
        <p className="text-muted-foreground">You have 30 seconds per question</p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
        {percentages.map((percentage) => (
          <Badge 
            key={percentage} 
            variant="outline" 
            className="text-lg py-3 justify-center"
          >
            {percentage}
          </Badge>
        ))}
      </div>

      <Button onClick={onStart} size="lg" className="w-full">
        Start Game
      </Button>
    </div>
  )
}
```

### Sample Countdown Timer Component
```tsx
import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"

export function CountdownTimer({ duration = 30, onTimeout }) {
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
      <Progress value={progress} className="h-2" />
    </div>
  )
}

### Sample Question Display Structure
```tsx
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function QuestionDisplay({ question, level, progress }) {
  return (
    <div className="space-y-6">
      <Progress value={progress} className="w-full" />
      <div className="text-center">
        <Badge variant="outline" className="text-2xl px-4 py-2">
          {level} Question
        </Badge>
      </div>
      <h2 className="text-3xl font-bold text-center">
        {question}
      </h2>
    </div>
  )
}
```

### Sample Episode Page Structure
```tsx
// app/[episode]/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { QuestionPreview } from "@/components/question-preview"
import { QuestionDisplay } from "@/components/question-display"
import { CountdownTimer } from "@/components/countdown-timer"
import { ExplanationDialog } from "@/components/explanation-dialog"

export default function EpisodePage() {
  const params = useParams()
  const [gamePhase, setGamePhase] = useState<'preview' | 'question' | 'explanation'>('preview')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [episodeData, setEpisodeData] = useState(null)
  
  useEffect(() => {
    // Load episode data from JSON
    fetch(`/data/episodes/episode-${params.episode}.json`)
      .then(res => res.json())
      .then(data => setEpisodeData(data))
  }, [params.episode])
  
  const handleStart = () => {
    setGamePhase('question')
  }
  
  const handleTimeout = () => {
    // Handle when 30 seconds expires
    setGamePhase('explanation')
  }
  
  const handleAnswer = (answer: string) => {
    // Validate answer and show explanation
    setGamePhase('explanation')
  }
  
  const handleNext = () => {
    if (currentQuestionIndex < episodeData.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setGamePhase('question')
    } else {
      // Game complete
    }
  }
  
  if (!episodeData) return <div>Loading...</div>
  
  return (
    <div className="min-h-screen p-4">
      {gamePhase === 'preview' && (
        <QuestionPreview onStart={handleStart} />
      )}
      
      {gamePhase === 'question' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <CountdownTimer duration={30} onTimeout={handleTimeout} />
          <QuestionDisplay 
            question={episodeData[currentQuestionIndex]}
            onAnswer={handleAnswer}
          />
        </div>
      )}
      
      {gamePhase === 'explanation' && (
        <ExplanationDialog 
          question={episodeData[currentQuestionIndex]}
          onNext={handleNext}
        />
      )}
    </div>
  )
}
```