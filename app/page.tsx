import Link from "next/link"
import { EpisodeCard } from "@/components/episode-card"

const episodes = [
  { date: "2025-01-25", title: "Episode 1", questionCount: 12 },
]

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">The 1% Club</h1>
        <p className="text-xl text-center mb-12 text-muted-foreground">
          Challenge yourself with questions from 90% down to the impossible 1%
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {episodes.map((episode) => (
            <EpisodeCard key={episode.date} episode={episode} />
          ))}
        </div>
      </div>
    </div>
  )
}