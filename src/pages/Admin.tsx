import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, Save, Trash, ChevronLeft, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  getBlogPosts,
  saveBlogPost,
  deleteBlogPost,
  slugify,
} from "@/lib/blog";
import { renderMarkdown } from "@/lib/markdown";
import { isAuthenticated, login, logout } from "@/lib/auth";
import { BlogPost } from "@/lib/types";

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginDialog, setShowLoginDialog] = useState(!authenticated);

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentTab, setCurrentTab] = useState("write");
  const [previewHtml, setPreviewHtml] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // New/edit post state
  const [postId, setPostId] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState("");

  // Check for edit parameter in URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const editId = params.get("edit");

    if (editId) {
      const allPosts = getBlogPosts();
      const postToEdit = allPosts.find((post) => post.id === editId);

      if (postToEdit) {
        setPostId(postToEdit.id);
        setTitle(postToEdit.title);
        setSlug(postToEdit.slug);
        setContent(postToEdit.content);
        setExcerpt(postToEdit.excerpt);
        setDate(new Date(postToEdit.date).toISOString().slice(0, 10));
        setTags(postToEdit.tags.join(", "));
        setCoverImage(postToEdit.coverImage || "");

        // Update preview
        setPreviewHtml(renderMarkdown(postToEdit.content));
      }
    }

    // Load all posts
    setPosts(getBlogPosts());
  }, [location.search]);

  // Authentication functions
  const handleLogin = () => {
    if (login(loginPassword)) {
      setAuthenticated(true);
      setShowLoginDialog(false);
      toast({
        title: "Logged in successfully",
        description: "You now have access to the admin panel.",
      });
    } else {
      toast({
        title: "Login failed",
        description: "Incorrect password. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
    setShowLoginDialog(true);
    toast({
      title: "Logged out",
      description: "You have been logged out of the admin panel.",
    });
  };

  // Post management functions
  const handlePreview = () => {
    setPreviewHtml(renderMarkdown(content));
    setCurrentTab("preview");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);

    // Auto-generate slug if not manually edited
    if (!slug || slug === slugify(title)) {
      setSlug(slugify(newTitle));
    }
  };

  const handleSave = () => {
    if (!title || !content) {
      toast({
        title: "Missing fields",
        description: "Title and content are required.",
        variant: "destructive",
      });
      return;
    }

    const newPost: BlogPost = {
      id: postId || Date.now().toString(),
      title,
      slug: slug || slugify(title),
      excerpt: excerpt || content.substring(0, 150) + "...",
      content,
      date: new Date(date).toISOString(),
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      coverImage: coverImage || undefined,
    };

    saveBlogPost(newPost);

    // Update posts list
    setPosts(getBlogPosts());

    toast({
      title: "Post saved",
      description: `"${title}" has been saved successfully.`,
    });

    // Clear form if it was a new post
    if (!postId) {
      resetForm();
    } else {
      // Update preview after save
      setPreviewHtml(renderMarkdown(content));
    }
  };

  const handleDelete = () => {
    if (postId) {
      deleteBlogPost(postId);
      setPosts(getBlogPosts());
      resetForm();
      setDeleteDialogOpen(false);

      toast({
        title: "Post deleted",
        description: "The post has been deleted successfully.",
      });
    }
  };

  const resetForm = () => {
    setPostId("");
    setTitle("");
    setSlug("");
    setContent("");
    setExcerpt("");
    setDate(new Date().toISOString().slice(0, 10));
    setTags("");
    setCoverImage("");
    setPreviewHtml("");
    setCurrentTab("write");

    // Clear the edit parameter from URL
    navigate("/admin");
  };

  // If not authenticated, show login dialog
  if (!authenticated) {
    return (
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Admin Login</DialogTitle>
            <DialogDescription>
              Enter your password to access the admin panel.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-4">
              <Lock className="text-muted-foreground" />
              <div className="flex-1 space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => navigate("/")}>Cancel</Button>
            <Button
              onClick={handleLogin}
              className="bg-electric-blue hover:bg-electric-blue/90"
            >
              Login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="flex justify-between items-center mb-8">
        <div>
          <Button
            variant="ghost"
            onClick={() => navigate("/blog")}
            className="mb-2"
          >
            <ChevronLeft size={16} className="mr-2" />
            Back to Blog
          </Button>
          <h1 className="text-4xl font-bold">Blog Admin</h1>
        </div>

        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Post list */}
        <div className="glassmorphism rounded-lg p-6 h-min">
          <h2 className="text-xl font-bold mb-4">Posts</h2>

          <div className="space-y-4">
            <Button
              className="w-full bg-electric-blue hover:bg-electric-blue/90"
              onClick={resetForm}
            >
              New Post
            </Button>

            <Separator />

            {posts.length > 0 ? (
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className={`p-3 rounded-md cursor-pointer transition-colors ${
                      postId === post.id
                        ? "bg-secondary"
                        : "hover:bg-secondary/50"
                    }`}
                    onClick={() => navigate(`/admin?edit=${post.id}`)}
                  >
                    <h3 className="font-medium line-clamp-1">{post.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {new Date(post.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                No posts yet. Create your first one!
              </div>
            )}
          </div>
        </div>

        {/* Editor */}
        <div className="glassmorphism rounded-lg p-6 lg:col-span-2">
          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="write">Write</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>

              <div className="flex space-x-2">
                {postId && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    <Trash size={16} className="mr-2" />
                    Delete
                  </Button>
                )}

                <Button variant="outline" size="sm" onClick={handlePreview}>
                  <Eye size={16} className="mr-2" />
                  Preview
                </Button>

                <Button
                  size="sm"
                  onClick={handleSave}
                  className="bg-electric-blue hover:bg-electric-blue/90"
                >
                  <Save size={16} className="mr-2" />
                  Save
                </Button>
              </div>
            </div>

            <TabsContent value="write" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Post title"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="post-url-slug"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief description (optional)"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="tech, personal, poetry, etc."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverImage">Cover Image URL (optional)</Label>
                <Input
                  id="coverImage"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content (Markdown)</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your post content in Markdown..."
                  className="font-mono"
                  rows={16}
                />
              </div>
            </TabsContent>

            <TabsContent value="preview">
              <div className="glassmorphism rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">{title}</h1>

                {coverImage && (
                  <div className="mb-6 rounded-lg overflow-hidden">
                    <img
                      src={coverImage}
                      alt={title}
                      className="w-full h-auto"
                    />
                  </div>
                )}

                <div className="prose dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this post? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
