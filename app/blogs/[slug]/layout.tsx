import { Metadata } from "next"
import { promises as fs } from "fs"
import path from "path"
import matter from "gray-matter"

interface BlogFrontmatter {
  title: string
  date: string
  excerpt: string
  coverImage: string
  category: string
  author?: string
  tags?: string[]
}

async function getBlogPost(slug: string): Promise<BlogFrontmatter | null> {
  try {
    const sanitizedSlug = slug.replace(/[^a-zA-Z0-9-]/g, "")
    const filePath = path.join(process.cwd(), "content", `${sanitizedSlug}.md`)
    const fileContent = await fs.readFile(filePath, "utf8")
    const { data } = matter(fileContent)

    return {
      title: data.title || "Blog Post",
      date: data.date || new Date().toISOString().split("T")[0],
      excerpt: data.excerpt || "",
      coverImage: data.coverImage || "/images/og-image.jpg",
      category: data.category || "Automotif",
      author: data.author || "Tim Jakarta Intl Denso",
      tags: data.tags || [],
    }
  } catch (error) {
    console.error("Error reading blog post:", error)
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return {
      title: "Blog Not Found | Jakarta Intl Denso Cirebon",
      description: "Blog post tidak ditemukan",
    }
  }

  const baseUrl = "https://jakartaintldenso.com"
  const blogUrl = `${baseUrl}/blogs/${params.slug}`

  // Ensure coverImage is absolute URL
  const ogImage = post.coverImage.startsWith("http")
    ? post.coverImage
    : `${baseUrl}${post.coverImage}`

  return {
    title: `${post.title} | Jakarta Intl Denso Cirebon`,
    description: post.excerpt,
    keywords: post.tags?.join(", ") || "bengkel ac mobil, cirebon, service ac",
    authors: [{ name: post.author || "Tim Jakarta Intl Denso" }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: blogUrl,
      siteName: "Jakarta Intl Denso Cirebon",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "id_ID",
      type: "article",
      publishedTime: post.date,
      authors: [post.author || "Tim Jakarta Intl Denso"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
    alternates: {
      canonical: blogUrl,
    },
  }
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
