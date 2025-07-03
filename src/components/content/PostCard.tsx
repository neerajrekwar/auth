import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface PostCardProps {
  slug: string
  title: string
  description: string
  imageUrl: string
  imageHint: string
  type: 'blog' | 'guide'
}

export function PostCard({ slug, title, description, imageUrl, imageHint, type }: PostCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative aspect-video w-full">
          <Image src={imageUrl} alt={title} fill className="object-cover" data-ai-hint={imageHint} />
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-6">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="mt-2 line-clamp-3">{description}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full">
          <Link href={`/${type}s/${slug}`}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
