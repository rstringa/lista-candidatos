import React from 'react';

export const Header = React.forwardRef((props, ref) => {
  return (
    <header ref={ref} className='header'>
    <div className="p-2 bg-slate-900 text-center overflow-hidden ">
        <h1 className="text-slate-500 text-xl font-normal leading-none">APP - Votación Online</h1>
    </div>
    </header>
  )
});


