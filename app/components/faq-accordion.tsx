"use client";

import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

export function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const answerId = `faq-answer-${index + 1}`;
        const isOpen = openIndex === index;

        return (
          <article className="faq-entry" key={item.question}>
            <h2 className="faq-question">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{item.question}</span>
                <span className="faq-toggle" aria-hidden="true">{isOpen ? "−" : "+"}</span>
              </button>
            </h2>
            <div id={answerId} className="faq-answer" hidden={!isOpen}>
              <p>{item.answer}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
