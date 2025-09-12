
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { InvestmentCharts } from '@/components/dakhla/InvestmentCharts';
import { ArrowRight, Anchor, Wind, Sun, Waves } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';


const portImage = PlaceHolderImages.find(p => p.id === 'dakhla-port');
const tourismImage = PlaceHolderImages.find(p => p.id === 'dakhla-tourism');
const energyImage = PlaceHolderImages.find(p => p.id === 'dakhla-energy');
const dakhlaHeroImage = {
    imageUrl: "https://drive.google.com/uc?export=view&id=1FBSl7zJwVBVcpQC8ynryf0gTR1Y4uumV",
    description: "A dramatic and wide landscape of Dakhla's desert meeting the ocean.",
    imageHint: "dakhla landscape",
    id: "dakhla-hero"
};


export default function WhyDakhlaPage() {
    const [isHeroVisible, setHeroVisible] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => setHeroVisible(true), 100); 
        return () => clearTimeout(timer);
    }, []);

  return (
    <>
       <section ref={heroRef} className="relative flex h-[50vh] min-h-[400px] items-center justify-center text-center overflow-hidden">
         {dakhlaHeroImage && (
            <Image
                src={dakhlaHeroImage.imageUrl}
                alt={dakhlaHeroImage.description}
                fill
                className="object-cover"
                data-ai-hint={dakhlaHeroImage.imageHint}
                priority
            />
         )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto text-primary-foreground">
          <h1 className={cn("font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl transition-all duration-1000", isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
            Dakhla: The Atlantic's Rising Star
          </h1>
          <p className={cn("mx-auto mt-4 max-w-3xl text-lg text-background/90 md:text-xl transition-all duration-1000 delay-300", isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
            More than just a pristine landscape, Dakhla is a region undergoing a profound transformation. Strategic vision and massive investment are unlocking its potential as a global hub for trade, tourism, and sustainable energy.
          </p>
        </div>
      </section>

      <section>
        <div className="container mx-auto">
          <h2 className="mb-12 text-center font-headline text-3xl font-bold">Projected Growth & Key Sectors</h2>
          <InvestmentCharts />
        </div>
      </section>
      
      <section className="bg-card">
        <div className="container mx-auto space-y-20">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div>
              <Anchor className="h-12 w-12 text-primary" />
              <h3 className="mt-4 font-headline text-3xl font-bold">The Dakhla Atlantic Port</h3>
              <p className="mt-4 text-lg text-muted-foreground">
                This monumental $1 billion project is the cornerstone of Dakhla's economic strategy. It will establish the region as a major maritime gateway, connecting Northwest Africa to the Americas and Europe. The port will create a logistical and industrial powerhouse, drastically increasing the value and utility of surrounding land for commercial and industrial purposes.
              </p>
            </div>
            <div className="overflow-hidden rounded-lg shadow-xl">
              {portImage && <Image src={portImage.imageUrl} alt={portImage.description} width={600} height={400} className="w-full object-cover" data-ai-hint={portImage.imageHint}/>}
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
             <div className="overflow-hidden rounded-lg shadow-xl md:order-2">
              {tourismImage && <Image src={tourismImage.imageUrl} alt={tourismImage.description} width={600} height={400} className="w-full object-cover" data-ai-hint={tourismImage.imageHint} />}
            </div>
            <div className='md:order-1'>
              <Waves className="h-12 w-12 text-primary" />
              <h3 className="mt-4 font-headline text-3xl font-bold">A Global Tourism Destination</h3>
              <p className="mt-4 text-lg text-muted-foreground">
                Dakhla's world-class kitesurfing conditions, stunning lagoon, and unique desert-ocean scenery are attracting a surge of international tourists. The government's "Vision 2020" and subsequent tourism strategies are fueling the development of luxury resorts, eco-lodges, and entertainment facilities, creating high demand for land in prime locations.
              </p>
            </div>
          </div>
          
           <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div>
              <div className="flex gap-4">
                <Wind className="h-12 w-12 text-primary" />
                <Sun className="h-12 w-12 text-primary" />
              </div>
              <h3 className="mt-4 font-headline text-3xl font-bold">The Green Energy Revolution</h3>
              <p className="mt-4 text-lg text-muted-foreground">
                Harnessing its abundant wind and solar resources, Dakhla is becoming a leader in renewable energy. Major projects are underway to generate clean electricity for Morocco and for export. This green revolution is not only sustainable but also creates new industries, including green hydrogen production, attracting a skilled workforce and further stimulating the local economy.
              </p>
            </div>
            <div className="overflow-hidden rounded-lg shadow-xl">
              {energyImage && <Image src={energyImage.imageUrl} alt={energyImage.description} width={600} height={400} className="w-full object-cover" data-ai-hint={energyImage.imageHint}/>}
            </div>
          </div>

        </div>
      </section>

      <section>
        <div className="container mx-auto text-center">
           <h2 className="font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">Your Moment is Now</h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
              The confluence of these mega-projects creates a once-in-a-generation investment opportunity. By acquiring land in Dakhla today, you are positioning yourself at the forefront of Africa's next great success story.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/properties">
                View Available Properties <ArrowRight />
              </Link>
            </Button>
        </div>
      </section>
    </>
  );
}
