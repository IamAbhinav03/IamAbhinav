import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Edit, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getBlogPostBySlug } from "@/lib/blog";
import { renderMarkdown } from "@/lib/markdown";
import { isAuthenticated } from "@/lib/auth";
import { BlogPost as BlogPostType } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const isAdmin = isAuthenticated();

  useEffect(() => {
    if (slug) {
      const blogPost = getBlogPostBySlug(slug);

      if (blogPost) {
        setPost(blogPost);
        setHtmlContent(renderMarkdown(blogPost.content));
      } else {
        toast({
          title: "Post not found",
          description: "The blog post you're looking for doesn't exist.",
          variant: "destructive",
        });
        navigate("/blog");
      }
    }
  }, [slug, navigate, toast]);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-electric-blue mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Loading post...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        <Link
          to="/blog"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to all posts
        </Link>

        {/* Post header */}
        <header className="mb-8 animate-fade-in">
          {post.coverImage && (
            <div className="mb-6 rounded-lg overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-auto"
              />
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2 py-1 rounded-full bg-secondary/80 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <Calendar size={16} className="mr-1" />
            <span>{new Date(post.date).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <Clock size={16} className="mr-1" />
            <span>{Math.ceil(post.content.length / 1000)} min read</span>
          </div>

          {isAdmin && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/admin?edit=${post.id}`)}
              className="mt-4"
            >
              <Edit size={14} className="mr-2" />
              Edit Post
            </Button>
          )}
        </header>

        <Separator className="mb-8" />

        {/* Post content */}
        <article
          className="prose dark:prose-invert prose-img:rounded-md animate-fade-in"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        <Separator className="my-8" />

        {/* Post footer */}
        <footer className="flex justify-between items-center animate-fade-in">
          <Link
            to="/blog"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to all posts
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default BlogPost;
