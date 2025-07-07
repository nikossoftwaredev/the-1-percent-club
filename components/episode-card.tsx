import Link from "next/link"

interface EpisodeCardProps {
  episode: {
    date: string
    title: string
    questionCount: number
  }
}

export function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <Link href={`/${episode.date}`}>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
        <div className="p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight mb-2">
            {episode.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {new Date(episode.date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </p>
          <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold">
            {episode.questionCount} Questions
          </div>
        </div>
        <div className="p-6 pt-0">
          <p className="text-sm text-muted-foreground">
            Test yourself from 90% down to 1%
          </p>
        </div>
      </div>
    </Link>
  )
}