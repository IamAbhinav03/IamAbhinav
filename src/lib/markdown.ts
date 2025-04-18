import { marked } from "marked";

export const renderMarkdown = (markdown: string): string => {
  return marked(markdown);
};
