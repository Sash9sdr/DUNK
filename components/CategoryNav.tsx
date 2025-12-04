
import React, { useEffect, useState } from 'react';
import { MenuSectionData } from '../types';

interface CategoryNavProps {
  sections: MenuSectionData[];
}

export const CategoryNav: React.FC<CategoryNavProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Default to the first section if nothing else is found
          let current = sections[0]?.id || '';
          const headerOffset = 220; // Approximate header height + buffer

          for (const section of sections) {
            const element = document.getElementById(section.id);
            if (element) {
              const rect = element.getBoundingClientRect();
              // Check if the top of the section is near the header
              // Use a larger detection range for better mobile feel
              if (rect.top <= headerOffset + 100) {
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
    <div className="w-full border-t border-white/5 bg-transparent">
      <div className="max-w-4xl mx-auto px-4 py-3 overflow-x-auto no-scrollbar mask-gradient-right transform-gpu">
        <div className="flex gap-3">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={(e) => scrollToSection(e, section.id)}
                className={`
                  flex-shrink-0 relative px-4 py-2 rounded-full transition-all duration-300 border
                  ${isActive 
                    ? 'bg-menu-highlight/10 border-menu-highlight/30 shadow-[0_0_15px_rgba(214,64,69,0.2)]' 
                    : 'bg-white/5 border-transparent hover:bg-white/10'
                  }
                `}
              >
                <span className={`
                  text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap
                  ${isActive ? 'text-menu-highlight' : 'text-menu-muted'}
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
