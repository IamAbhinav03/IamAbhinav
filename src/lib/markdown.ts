import { marked } from "marked";

export const renderMarkdown = (markdown: string): string | Promise<string> => {
  return marked(markdown);
};
