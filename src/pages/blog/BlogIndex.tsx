import { useState } from "react";
import { Search, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog/BlogCard";
import { getBlogPosts } from "@/lib/blog";
import { BlogPost } from "@/lib/types";

const BlogIndex = () => {
  const allPosts = getBlogPosts();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags from posts
  const allTags = Array.from(new Set(allPosts.flatMap((post) => post.tags)));

  // Filter posts based on search term and selected tag
  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;

    return matchesSearch && matchesTag;
  });

  // Calculate the featured post (most recent)
  const featuredPost =
    filteredPosts.length > 0
      ? filteredPosts.reduce((latest, current) =>
          new Date(current.date) > new Date(latest.date) ? current : latest
        )
      : null;

  // Other posts (excluding featured)
  const otherPosts = featuredPost
    ? filteredPosts.filter((post) => post.id !== featuredPost.id)
    : filteredPosts;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 animate-fade-in">Blog</h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 animate-fade-in">
        <div className="relative flex-grow">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <Input
            type="text"
            placeholder="Search posts..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedTag === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTag(null)}
            className={
              selectedTag === null
                ? "bg-electric-blue hover:bg-electric-blue/90"
                : ""
            }
          >
            All
          </Button>

          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(tag)}
              className={
                selectedTag === tag
                  ? "bg-electric-blue hover:bg-electric-blue/90"
                  : ""
              }
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <div className="mb-8 animate-fade-in">
          <BlogCard post={featuredPost} index={0} featured />
        </div>
      )}

      {/* Post Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index + 1} />
          ))}
        </div>
      ) : (
        <div className="glassmorphism rounded-lg p-8 text-center animate-fade-in">
          <Tag className="mx-auto mb-4 text-muted-foreground" size={48} />
          <h3 className="text-xl font-medium mb-2">No posts found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogIndex;
