export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  coverImage?: string;
  tags: string[];
}

export type BlogCategory = "tech" | "personal" | "poetry" | "reviews";
