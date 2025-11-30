import React from 'react';

export const Logo: React.FC = () => {
  return (
    <div className="select-none flex justify-center py-2">
      <img 
        src="https://s3.twcstorage.ru/85179b75-53e6e7d0-fc40-45c5-af31-5645db263308/logo%20(2).png" 
        alt="DUNK" 
        className="h-16 w-auto object-contain brightness-100 contrast-125 drop-shadow-xl"
      />
    </div>
  );
};