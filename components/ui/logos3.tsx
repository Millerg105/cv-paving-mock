"use client"

import AutoScroll from "embla-carousel-auto-scroll"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import { cn } from "@/lib/utils"

interface Logo {
  id: string
  description: string
  image: string
  className?: string
}

interface Logos3Props {
  heading?: string
  logos?: Logo[]
  className?: string
}

const Logos3 = ({
  heading = "NVQ & Accreditation Badges",
  logos = [
    {
      id: "logo-1",
      description: "City & Guilds NVQ Qualified",
      image: "/city guilds.jpg",
      className: "h-10 w-auto",
    },
    {
      id: "logo-2",
      description: "Gas Safe Registered",
      image: "/gas safe.png",
      className: "h-10 w-auto",
    },
    {
      id: "logo-3",
      description: "Baxi Approved",
      image: "/baxi.png",
      className: "h-10 w-auto",
    },
    {
      id: "logo-4",
      description: "Baxi Badge 1",
      image: "/baxi (1).png",
      className: "h-10 w-auto",
    },
    {
      id: "logo-5",
      description: "Baxi Badge 2",
      image: "/baxi (2).png",
      className: "h-10 w-auto",
    },
    {
      id: "logo-6",
      description: "Baxi Badge 3",
      image: "/baxi (3).png",
      className: "h-10 w-auto",
    },
  ],
  className,
}: Logos3Props) => {
  return (
    <section className={cn("py-0", className)}>
      <div className="flex flex-col items-start text-left">
        <h3 className="mb-3 text-xs tracking-[0.2em] uppercase text-slate-400 font-altform">
          {heading}
        </h3>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 md:p-4">
        <div className="relative mx-auto flex items-center justify-center w-full">
          <Carousel
            opts={{ loop: true, align: "start" }}
            plugins={[
              AutoScroll({
                playOnInit: true,
                speed: 0.8,
                stopOnInteraction: false,
                stopOnMouseEnter: false,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="ml-0">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/2 justify-center pl-0 sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="mx-2 md:mx-3 flex h-24 w-full max-w-[240px] shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 shadow-sm">
                    <img
                      src={logo.image}
                      alt={logo.description}
                      className={cn("h-12 w-auto max-w-full object-contain opacity-95", logo.className)}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-slate-50 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-slate-50 to-transparent" />
        </div>
      </div>
    </section>
  )
}

export { Logos3 }
