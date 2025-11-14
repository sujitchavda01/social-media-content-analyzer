import React from 'react'

/**
 * TextAnalysis
 *
 * Small, deterministic analysis helper that computes basic metrics from the
 * extracted text and returns a short set of editorial suggestions that improve
 * social media engagement (length, sentence complexity, link usage).
 *
 * Props:
 * - text: string - extracted or input text to analyze
 */
export function TextAnalysis({ text }) {
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0
  const sentences = text.split(/[.!?]\s/).filter(Boolean)
  const sentenceCount = sentences.length
  const avgWordsPerSentence = sentenceCount ? Math.round(wordCount / sentenceCount) : 0

  const suggestions = []
  if (wordCount < 30) suggestions.push('Post is short — consider adding more context or a question to increase engagement.')
  if (avgWordsPerSentence > 25) suggestions.push('Sentences are long — break into shorter sentences for readability.')
  if (/https?:\/\//.test(text)) suggestions.push('Contains links — add a short caption or CTA near the link.')

  return (
    <section className="analysis">
      <h3>Analysis</h3>
      <ul>
        <li>Word count: {wordCount}</li>
        <li>Sentence count: {sentenceCount}</li>
        <li>Avg words/sentence: {avgWordsPerSentence}</li>
      </ul>

      <h4>Suggestions</h4>
      {suggestions.length ? (
        <ul>
          {suggestions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      ) : (
        <p>No specific suggestions. Looks good!</p>
      )}
    </section>
  )
}
