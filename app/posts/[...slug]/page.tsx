import { notFound } from "next/navigation";
import { Metadata } from "next";
import getBlogContentFromParams from "@/utils/getBlogContentFromParams";

interface PostProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
  const post = await getBlogContentFromParams({ params, folder: "posts" });

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      releaseDate: post.date,
      images: [post.imageUrl],
    },
  };
}

export default async function PostPage({ params }: PostProps) {
  const post = await getBlogContentFromParams({ params, folder: "posts" });

  if (!post) {
    notFound();
  }

  return (
    <article className="py-6 prose dark:prose-invert overflow-x-hidden">
      <h1 className="mb-2">{post.title}</h1>
      {post.description && (
        <p className="text-xl mt-0 text-slate-700 dark:text-slate-200">{post.description}</p>
      )}
      <hr className="my-4" />
      {post.content}
    </article>
  );
}
