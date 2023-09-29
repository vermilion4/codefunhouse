"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import ExplanationRequest from './axios/explanationRequest';
import QueryForm from './QueryForm';
import TextHighlight from './TextHighlight';

export default function Home ()
{
  const [showExplanation, setShowExplanation] = useState(false);
  const [showExplanationBtn, setShowExplanationBtn] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [textToExplain, setTextToExplain] = useState('');
  const [loading, setLoading] = useState(false);
  const tooltipRef = useRef(null);
  const btnRef = useRef(null);

  const handleMouseHighlight = useCallback(async () =>
  {
    const selectedText = window.getSelection().toString();

    if (selectedText)
    {
      setTextToExplain(selectedText);
      setShowExplanationBtn(true);
      setLoading(true);

      try
      {
        const explanation = await ExplanationRequest(selectedText);
        setExplanation(`Explanation for ${ selectedText }: ${ explanation }`);
      } catch (error)
      {
        console.error('Error:', error);
        setExplanation(null);
      } finally
      {
        setLoading(false);
      }
    }
  }, []);

  // Show explanation tooltip text
  const handleShowExplanationText = useCallback(() =>
  {
    setShowExplanationBtn(false);
    setShowExplanation(true);
  }, []);

  // Handle text change
  const handleChange = useCallback((e) =>
  {
    setTextToExplain(e.target.value);
    clearTooltips();
  }, []);

  // Clear all tooltips
  const clearTooltips = useCallback(() =>
  {
    setShowExplanation(false);
    setShowExplanationBtn(false);
  }, []);

  // UseEffect for setting tooltip position
  useEffect(() =>
  {
    if (showExplanation && tooltipRef.current)
    {
      const tooltipHeight = tooltipRef.current.clientHeight;
      tooltipRef.current.parentElement.style.marginTop = `${ tooltipHeight }px`;
      tooltipRef.current.style.marginTop = `-${ tooltipHeight / 3.5 }px`;
    }

    if (showExplanationBtn && btnRef.current)
    {
      const tooltipBtnHeight = btnRef.current.clientHeight;
      btnRef.current.parentElement.style.marginTop = `${ tooltipBtnHeight }px`;
      btnRef.current.style.marginTop = `-${ tooltipBtnHeight / 4.5 }px`;
    }
  }, [showExplanation, showExplanationBtn, tooltipRef, btnRef]);

  return (
    <main className="min-h-screen w-[90vw] max-w-2xl mx-auto flex-col grid place-content-center py-5" onMouseDown={ () => setShowExplanation(false) }>
      <h1 className="text-3xl">Highlight For Explanation</h1>

      <QueryForm textToExplain={ textToExplain } handleChange={ handleChange } />

      <div onMouseUp={ handleMouseHighlight }>
        <h3 className="relative flex flex-col gap-5 mt-3 mb-10">
          <span id="highlightInstructions">Highlight your query below for explanation</span>
          <TextHighlight
            textToExplain={ textToExplain }
            handleShowExplanationText={ handleShowExplanationText }
            showExplanationBtn={ showExplanationBtn }
            showExplanation={ showExplanation }
            explanation={ explanation }
            btnRef={ btnRef }
            tooltipRef={ tooltipRef }
            loading={ loading }
          />
        </h3>
      </div>
    </main>
  );
}
