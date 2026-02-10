import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import agentFlowImage from 'figma:asset/7dab76c8bd67019090a5609cf9a1a41e8c727fbb.png';
import functionCallingImage from 'figma:asset/62582804397f26f4d27fce669c639631250afc5e.png';

export function AgenticFrameworkCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

  const slides = [
    {
      id: 1,
      title: "Modular Flows, Designed Around How You Work",
      description: "No two clinics work the same way. Your agent runs on flows built specifically for your workflows calls, messages, reminders, follow ups modular enough to handle any scenario, rigid enough to stay on protocol.",
      image: agentFlowImage,
      video: "https://s3.amazonaws.com/webflow-prod-assets/6935ed01e1dd66f3db9dacf0/69850b0e9bc9fada14bd38fa_Kapture%202026-02-05%20at%2021.01.26.mp4"
    },
    {
      id: 2,
      title: "Your Protocols, Guidelines & Documents Always On",
      description: "Upload your clinical documents, medication rules, and escalation policies. The agent doesn't just store them it references them across every interaction, so nothing gets missed.",
      image: functionCallingImage,
      video: "https://s3.amazonaws.com/webflow-prod-assets/6935ed01e1dd66f3db9dacf0/698513b6fbebddded1d44648_Kapture%202026-02-05%20at%2021.48.30.mp4"
    },
    {
      id: 3,
      title: "An AI That Knows Your Patients And Gets Better Over Time",
      description: "Every interaction adds context. Preferred channel, best time to reach them, past conversations, care status. Whether it's a call, a text, or a reminder the agent carries it all forward so every touchpoint feels personal.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    }
  ];

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1.4, // Show 1 full slide + 40% of the next
    slidesToScroll: 1,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1.1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  const next = () => {
    sliderRef.current?.slickNext();
  };

  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  return (
    <section className="py-24 bg-[#F5F5F5] dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-normal tracking-tight text-slate-900 dark:text-white max-w-2xl leading-[1.1]">
            Intelligent Patient Engagement Platform Built for Clinical Workflows
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed md:mt-4 font-sans">
            Handle everything from routine follow ups to complex care pathways without trade offs. Deploy in days, not quarters.
          </p>
        </div>

        {/* Carousel */}
        <div className="-mx-4 md:-mx-8"> {/* Negative margin to allow slider to touch edges on small screens if needed, or just standard */}
            <Slider ref={sliderRef} {...settings} className="agentic-carousel pl-4 md:pl-0">
            {slides.map((slide) => (
                <div key={slide.id} className="px-4 md:px-6 focus:outline-none h-full">
                <div className="group h-full flex flex-col">
                    {/* Image Container with Light Gray Border/Background */}
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800 p-1 shadow-lg">
                        {/* Inner Image (Screenshot) or Video */}
                        <div className="w-full h-full rounded-lg overflow-hidden bg-white dark:bg-slate-900 relative">
                            {slide.video ? (
                                <video
                                    src={slide.video}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                slide.id === 3 ? (
                                    <video
                                        src="https://s3.amazonaws.com/webflow-prod-assets/6935ed01e1dd66f3db9dacf0/6985318dfce8af6163ebd6b2_Kapture%202026-02-06%20at%2000.10.12.mp4"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <img 
                                        src={slide.image} 
                                        alt={slide.title} 
                                        className="w-full h-full object-cover object-left-top"
                                    />
                                )
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="mt-8">
                        <h3 className="text-2xl font-medium text-slate-900 dark:text-white mb-3">
                            {slide.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base max-w-xl">
                            {slide.description}
                        </p>
                    </div>
                </div>
                </div>
            ))}
            </Slider>
        </div>

        {/* Navigation Controls */}
        <div className="mt-12 flex items-center gap-6">
            <div className="flex gap-3">
                <button 
                    onClick={previous}
                    disabled={currentSlide === 0}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                    onClick={next}
                    disabled={currentSlide === slides.length - 1}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
            
            {/* Page Indicator */}
            <div className="text-sm font-medium tracking-widest text-slate-500 dark:text-slate-400 select-none">
                <span className="text-slate-900 dark:text-white">{currentSlide + 1}</span>
                <span className="mx-2"> </span>
                <span>{slides.length}</span>
            </div>

             {/* Horizontal Line */}
             <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1 ml-4" />
        </div>

      </div>
      
      {/* CSS Override */}
      <style>{`
        .slick-list {
            overflow: visible !important;
        }
        .agentic-carousel .slick-slide {
            opacity: 0.4;
            transition: opacity 0.5s ease;
        }
        .agentic-carousel .slick-slide.slick-active {
            opacity: 1;
        }
      `}</style>
    </section>
  )
}
