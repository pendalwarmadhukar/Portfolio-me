import { Project } from '../types.ts';
import { Language } from '../data/translations.ts';

/**
 * Calculates an accurate estimated reading time for a project post or modal review.
 * Assumes a technical reading pace of ~160 words per minute.
 */
export const getProjectReadingTime = (project: Project, lang: Language = 'en'): string => {
  const textSegments = [
    project.title,
    project.category,
    project.shortDescription,
    project.overview,
    project.problemStatement,
    project.solution,
    ...project.keyFeatures,
    ...project.technologies,
    ...project.architectureSteps,
  ];

  const wordCount = textSegments
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const minutes = Math.max(1, Math.ceil(wordCount / 160));
  if (lang === 'hi') {
    return `${minutes} मिनट अध्ययन`;
  }
  return `${minutes} min read`;
};
