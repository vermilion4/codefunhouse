"use client";

import { useState, useRef, useEffect } from 'react';

export default function Home ()
{
  const [showExplanation, setShowExplanation] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [textToExplain, setTextToExplain] = useState('');
  const tooltipRef = useRef(null);

  const handleMouseHighlight = () =>
  {
    const selectedText = window.getSelection().toString();

    if (selectedText)
    {
      // Axios call and setExplanation here
      setExplanation('Explanation for ' + selectedText);
      setShowExplanation(true);
    }

  };


  const handleChange = (e) =>
  {
    setTextToExplain(e.target.value);
    setShowExplanation(false);
  };

  useEffect(() =>
  {
    if (showExplanation)
    {

      const tooltipHeight = tooltipRef.current.clientHeight;
      console.log(tooltipRef.current.parentElement);
      tooltipRef.current.parentElement.style.marginTop = `${ tooltipHeight }px`;
      tooltipRef.current.style.marginTop = `-${ tooltipHeight / 2.5 }px`;
    }
  }, [showExplanation]);

  return (
    <main className="min-h-screen w-[90vw] max-w-2xl mx-auto flex-col grid place-content-center py-5" onMouseDown={ () => setShowExplanation(false) } >
      <h1 className='text-3xl'>Highlight For Explanation</h1>

      <div className='flex flex-col gap-2 mt-10'>
        <label htmlFor="queryInput">Explain?</label>
        <input type='text' id="queryInput" placeholder='Enter your Query Content' className='border border-gray-300 rounded p-2 text-black' onChange={ handleChange } value={ textToExplain } />
      </div>

      <div onMouseUp={ handleMouseHighlight }>
        <h3 className='relative flex flex-col gap-5 mt-3 mb-10'>
          <span id="highlightInstructions">Highlight your query below for explanation</span>
          <div className='mt-5 relative' >
            <div
              id="highlightText"
              tabIndex={ 0 }
              role="textbox"
              aria-multiline="true"
              aria-aria-labelledby="highlightInstructions"
              className={ `cursor-text outline-none focus:ring focus:ring-opacity-50 ` }
              onMouseDown={ (e) => e.preventDefault() }
            >
              { textToExplain }
            </div>
            { showExplanation && (
              <div
                ref={ tooltipRef }
                role="tooltip"
                aria-describedby="highlightText"
                className={ `absolute -top-5 left-0 p-3 text-xs bg-black text-white rounded-lg transform -translate-y-1/2 max-w-lg overflow-y-scroll scroll-content line-clamp-5 opacity-100 z-10 border border-white dark:bg-white dark:text-black` }
              >
                <p>{ explanation }</p>
              </div>
            ) }
          </div>
        </h3>
      </div>
    </main>
  );
}
