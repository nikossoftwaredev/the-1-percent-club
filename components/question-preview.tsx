interface QuestionPreviewProps {
  onStart: () => void
}

const percentages = ["90%", "80%", "70%", "60%", "50%", "40%", "30%", "20%", "15%", "10%", "5%", "1%"]

export function QuestionPreview({ onStart }: QuestionPreviewProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center">The 1% Club</h1>
      
      <div className="text-center space-y-4">
        <p className="text-xl">Answer 12 questions, from easy to impossible!</p>
        <p className="text-muted-foreground">You have 30 seconds per question</p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
        {percentages.map((percentage) => (
          <div
            key={percentage} 
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-lg font-semibold"
          >
            {percentage}
          </div>
        ))}
      </div>

      <button
        onClick={onStart}
        className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 text-lg"
      >
        Start Game
      </button>
    </div>
  )
}