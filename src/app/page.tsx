import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Feather } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 text-center">
            <div className="flex flex-col items-center space-y-4">
              <Feather className="h-16 w-16 text-primary" />
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Welcome to ContentFlow
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                The seamless solution for creating, managing, and optimizing your digital content.
                Powered by AI to boost your reach.
              </p>
              <div className="space-x-4 mt-6">
                <Button asChild size="lg">
                  <Link href="/blog">Explore Blogs</Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/guides">Browse Guides</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
