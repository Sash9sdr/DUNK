import React from 'react';

interface LogoProps {
  compact?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ compact }) => {
  return (
    <div className={`select-none flex justify-center transition-all duration-300 ${compact ? 'py-0.5' : 'py-2'}`}>
      <img 
        src="https://s3.twcstorage.ru/85179b75-53e6e7d0-fc40-45c5-af31-5645db263308/logo%20(2).png" 
        alt="DUNK" 
        className={`w-auto object-contain brightness-110 transition-all duration-300 ${compact ? 'h-7' : 'h-14'}`}
      />
    </div>
  );
};