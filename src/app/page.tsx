"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, BrainCircuit, BookHeart, ShieldAlert, HeartHandshake, BotMessageSquare, BarChart3, Users, LucideIcon } from 'lucide-react';
import { Logo } from '@/components/logo';
import { useAuth } from '@/context/auth-context';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const features = [
  {
    icon: BotMessageSquare,
    title: 'AI Wellness Assessments',
    description: 'Receive personalized insights and care plans from our AI-driven mental wellness questionnaire.',
    dataAiHint: 'AI robot'
  },
  {
    icon: BookHeart,
    title: 'Journaling & Mood Tracking',
    description: 'Track your mood and journal your thoughts with AI-powered summaries and sentiment analysis.',
    dataAiHint: 'journal book'
  },
  {
    icon: BarChart3,
    title: 'Wellness Dashboard',
    description: 'Visualize your progress with a comprehensive dashboard for mood trends, goals, and activities.',
    dataAiHint: 'dashboard chart'
  },
  {
    icon: ShieldAlert,
    title: 'Crisis Intervention',
    description: 'Immediate access to localized emergency resources and support when you need it most.',
    dataAiHint: 'emergency help'
  },
  {
    icon: HeartHandshake,
    title: 'Personalized Journeys',
    description: 'Engage in guided step-by-step programs for wellness and addiction recovery tailored to you.',
    dataAiHint: 'helping hand'
  },
  {
    icon: Users,
    title: 'Connect with Professionals',
    description: 'Book sessions or get referrals to a directory of vetted mental health clinicians.',
    dataAiHint: 'professional team'
  },
];

const testimonials = [
  {
    name: 'Amina K.',
    role: 'User in Nairobi',
    quote: 'MindFiti has been a game-changer for my mental health. The AI insights are surprisingly accurate and the journaling feature is my daily go-to.',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
  },
  {
    name: 'Dr. John O.',
    role: 'Clinical Psychologist',
    quote: 'This platform provides accessible, evidence-based tools that empower individuals on their wellness journey. A much-needed resource in our community.',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026703d'
  },
];

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center p-6 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export default function LandingPage() {
  const { user, loading } = useAuth();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">MindFiti</span>
          </Link>
          <nav className="flex items-center gap-4">
            {loading ? (
              <div className="h-8 w-20 animate-pulse rounded-md bg-muted"></div>
            ) : user ? (
              <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Log In</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40">
           <div className="absolute inset-0 bg-primary/5"></div>
           <div className="container mx-auto max-w-5xl px-4 text-center relative">
            <div className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              Your Mental Wellness Companion
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
              A new path to mental clarity starts here.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              MindFiti is an AI-powered mental health platform designed for Africa, providing personalized support, guided journeys, and a safe space to grow.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/dashboard">Get Started for Free</Link>
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Everything you need for your wellness journey</h2>
              <p className="mt-4 text-lg text-muted-foreground">From AI insights to guided programs, we've got you covered.</p>
            </div>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {features.map((feature, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <Card className="flex flex-col h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                          <CardHeader>
                              <div className="flex items-center gap-4">
                                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                      <feature.icon className="h-6 w-6" />
                                  </div>
                                  <CardTitle>{feature.title}</CardTitle>
                              </div>
                          </CardHeader>
                          <CardContent className="flex-grow">
                              <p className="text-muted-foreground">{feature.description}</p>
                          </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        <section className="w-full bg-primary/5 py-20 md:py-28">
          <div className="container mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Take the first step with a personalized assessment</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our confidential wellness assessment, powered by AI, helps you understand your current state of mind and suggests a personalized path forward. It's quick, insightful, and completely private.
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>Receive a comprehensive summary of your mental wellness.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>Get actionable recommendations and suggested goals.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>Identify areas for growth and track your progress over time.</span>
                </li>
              </ul>
              <Button size="lg" className="mt-8" asChild>
                <Link href="/assessment">Start Your Assessment</Link>
              </Button>
            </div>
            <div className="flex justify-center">
              <Image
                src="https://picsum.photos/600/500"
                alt="Wellness Assessment"
                width={600}
                height={500}
                className="rounded-xl shadow-2xl"
                data-ai-hint="wellness questionnaire"
              />
            </div>
          </div>
        </section>

        <section className="w-full py-20 md:py-28">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Trusted by users and professionals</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Here's what people are saying about MindFiti.</p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="flex flex-col justify-between">
                            <CardContent className="pt-6">
                                <p className="mb-4 text-lg italic">"{testimonial.quote}"</p>
                            </CardContent>
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <Image src={testimonial.avatar} alt={testimonial.name} width={48} height={48} className="rounded-full" />
                                    <div>
                                        <p className="font-semibold">{testimonial.name}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

      </main>

      <footer className="w-full border-t bg-secondary">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
            <div className="flex items-center gap-2">
              <Logo className="h-6 w-6 text-primary" />
              <span className="font-bold">MindFiti</span>
            </div>
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} MindFiti. All rights reserved.</p>
          <nav className="flex gap-4">
            <Link href="/privacy" className="text-sm hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="text-sm hover:underline">Terms of Service</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
