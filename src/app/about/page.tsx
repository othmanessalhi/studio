
'use client';

import Image from 'next/image';
import { CheckCircle, Award, Target } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';


const aboutImage = PlaceHolderImages.find(p => p.id === 'about-jaouad');
const investmentImage = PlaceHolderImages.find(p => p.id === 'dakhla-investment');
const aboutHeroImage = PlaceHolderImages.find(p => p.id === 'about-hero');

export default function AboutPage() {
  const [isHeroVisible, setHeroVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100); 
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      <section ref={heroRef} className="relative flex h-[50vh] min-h-[400px] items-center justify-center text-center overflow-hidden">
         {aboutHeroImage && (
            <Image
                src={aboutHeroImage.imageUrl}
                alt={aboutHeroImage.description}
                fill
                className="object-cover"
                data-ai-hint={aboutHeroImage.imageHint}
                priority
            />
         )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto text-primary-foreground">
           <h1 className={cn("font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl transition-all duration-1000", isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
            The Visionary Behind Dakhla's Premier Land Agency
          </h1>
          <p className={cn("mx-auto mt-4 max-w-3xl text-lg text-background/90 md:text-xl transition-all duration-1000 delay-300", isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
            A legacy of trust, a future of prosperity.
          </p>
        </div>
      </section>

      <section>
        <div className="container mx-auto grid grid-cols-1 items-center gap-16 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="font-headline text-3xl font-bold">About Jaouad Afella</h2>
            <p className="text-lg text-muted-foreground">
              Jaouad Afella is more than a real estate agent; he is a cornerstone of the Dakhla property market. With a career spanning over two decades, he has meticulously cultivated a reputation for integrity, foresight, and an unwavering commitment to his clients' success.
            </p>
            <p>
              Born and raised in Morocco, Jaouad possesses an intrinsic understanding of the cultural and economic landscapes that shape the nation's real estate trends. He was among the first to recognize Dakhla's nascent potential, dedicating his focus to the region long before it captured the international spotlight. This pioneering spirit has granted him an unparalleled network and a portfolio of the most exclusive land opportunities available.
            </p>
            <p>
              His philosophy is simple: to facilitate investments that are not only profitable but also contribute positively to the sustainable development of the Dakhla region.
            </p>
          </div>
          <div className="overflow-hidden rounded-lg shadow-2xl">
            {aboutImage && <Image
              src={aboutImage.imageUrl}
              alt={aboutImage.description}
              width={600}
              height={700}
              className="h-full w-full object-cover"
              data-ai-hint={aboutImage.imageHint}
            />}
          </div>
        </div>
      </section>

      <section className="bg-card">
        <div className="container mx-auto grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <Target className="h-12 w-12 text-primary" />
            <h3 className="mt-4 font-headline text-2xl font-semibold">Our Mission</h3>
            <p className="mt-2 text-muted-foreground">
              To be the most trusted and sought-after real estate partner for land investment in Dakhla, providing our clients with secure, high-return opportunities through expert guidance and unmatched market access.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Award className="h-12 w-12 text-primary" />
            <h3 className="mt-4 font-headline text-2xl font-semibold">Our Credibility</h3>
            <p className="mt-2 text-muted-foreground">
              Built on a foundation of successful transactions and satisfied investors, our credibility is our greatest asset. We operate with complete transparency and a deep-seated ethical code.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <CheckCircle className="h-12 w-12 text-primary" />
            <h3 className="mt-4 font-headline text-2xl font-semibold">Our Values</h3>
            <p className="mt-2 text-muted-foreground">
              Integrity, Excellence, and Partnership. We believe in building long-term relationships and ensuring every client feels confident and valued throughout their investment journey.
            </p>
          </div>
        </div>
      </section>

      {investmentImage && (
         <div className="relative h-[400px] w-full">
            <Image
                src={investmentImage.imageUrl}
                alt={investmentImage.description}
                fill
                className="object-cover"
                data-ai-hint={investmentImage.imageHint}
            />
            <div className="absolute inset-0 bg-primary/80 flex items-center justify-center">
                <div className="text-center text-primary-foreground p-4">
                    <h2 className="font-headline text-3xl font-bold md:text-4xl">Invest with Confidence</h2>
                    <p className="mt-2 text-lg max-w-2xl mx-auto">Join a growing list of investors who have trusted Jaouad Afella to navigate the promising landscape of Dakhla's real estate market.</p>
                </div>
            </div>
        </div>
      )}
    </>
  );
}
