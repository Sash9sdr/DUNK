
import React, { useEffect, useState, useRef } from 'react';
import { MenuSectionData } from '../types';

interface CategoryNavProps {
  sections: MenuSectionData[];
}

export const CategoryNav: React.FC<CategoryNavProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeSection && containerRef.current) {
      const container = containerRef.current;
      const activeButton = container.querySelector(`[data-section-id="${activeSection}"]`) as HTMLElement;
      if (activeButton) {
        const containerWidth = container.offsetWidth;
        const buttonWidth = activeButton.offsetWidth;
        const buttonLeft = activeButton.offsetLeft;
        const targetScrollLeft = buttonLeft - (containerWidth / 2) + (buttonWidth / 2) - 16;
        
        container.scrollTo({
          left: targetScrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [activeSection]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Default to the first section if nothing else is found
          let current = sections[0]?.id || '';
          const header = document.querySelector('header');
          const headerOffset = header ? header.offsetHeight : 180;

          for (const section of sections) {
            const element = document.getElementById(section.id);
            if (element) {
              const rect = element.getBoundingClientRect();
              // Check if the top of the section is near the current header bottom
              if (rect.top <= headerOffset + 40) {
                current = section.id;
              }
            }
          }
          setActiveSection(current);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 200;
      // Get absolute position relative to document
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="w-full border-t border-white/[0.04] bg-transparent mt-1">
      {/* 
        Increased padding-right (pr-24) to ensure the last item is clearly visible 
        and not hidden by the screen edge or gradient mask. 
      */}
      <div 
        ref={containerRef}
        className="max-w-4xl mx-auto pl-4 pr-24 py-2.5 overflow-x-auto no-scrollbar mask-gradient-right transform-gpu"
      >
        <div className="flex gap-2">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                data-section-id={section.id}
                onClick={(e) => scrollToSection(e, section.id)}
                className={`
                  flex-shrink-0 relative px-4 py-1.5 rounded-full transition-all duration-300 border
                  ${isActive 
                    ? 'bg-menu-highlight/15 border-menu-highlight/45 shadow-[0_2px_8px_rgba(255,0,51,0.12)]' 
                    : 'bg-white/[0.02] border-white/5 text-white/50 hover:bg-white/[0.04] hover:text-white/80 hover:border-white/10'
                  }
                `}
              >
                <span className={`
                  text-[10px] sm:text-xs font-semibold uppercase tracking-widest transition-colors whitespace-nowrap
                  ${isActive ? 'text-menu-highlight' : 'text-white/40'}
                `}>
                  {section.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
