# The 1% Club Training App

A web application that recreates The 1% Club game show experience, allowing users to play through actual episodes with questions ranging from 90% down to the impossible 1%.

## Features

- 📺 Episode selection from actual UK show episodes
- ⏱️ 30-second countdown timer per question
- 🎯 Multiple question types:
  - Text input
  - Multiple choice
  - Image selection
- 📊 Progress tracking through each episode
- 💡 Detailed explanations for each answer
- 🏆 Score summary at the end

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Play

1. Select an episode from the home page
2. Review the difficulty levels (90% to 1%)
3. Click "Start Game" to begin
4. Answer each question within 30 seconds
5. View explanations after each answer
6. Complete all 12 questions to see your final score

## Project Structure

```
app/
├── page.tsx              # Home page with episode list
├── [episode]/
│   └── page.tsx         # Game page for each episode
├── globals.css          # Global styles
└── layout.tsx           # Root layout

components/
├── episode-card.tsx     # Episode selection card
├── question-preview.tsx # Pre-game preview screen
├── question-display.tsx # Question presentation
├── countdown-timer.tsx  # 30-second timer
└── explanation-dialog.tsx # Answer explanation modal

public/
└── data/episodes/       # Episode JSON files
```

## Adding New Episodes

To add a new episode, create a JSON file in `public/data/episodes/` following this format:

```json
[
  {
    "episode": "YYYY-MM-DD",
    "level": "90%",
    "question": "Question text",
    "type": "text|multiple-choice|image-choice",
    "answer": "Correct answer",
    "explanationText": "Why this is correct",
    ...
  }
]
```

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components

## Deployment

The app can be deployed on Vercel or any other Next.js-compatible hosting platform.

## Learn More

This project was built with [Next.js](https://nextjs.org/). To learn more:

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)