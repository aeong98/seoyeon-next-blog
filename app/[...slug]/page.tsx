import { notFound } from "next/navigation";
import { Metadata } from "next";
import getBlogContentFromParams from "@/utils/getBlogContentFromParams";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await getBlogContentFromParams({ params, folder: "pages" });

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
  };
}

export default async function PagePage({ params }: PageProps) {
  const page = await getBlogContentFromParams({ params, folder: "pages" });

  if (!page) {
    notFound();
  }

  return (
    <article className="py-6 prose dark:prose-invert">
      <h1>{page.title}</h1>
      {page.description && <p className="text-xl">{page.description}</p>}
      <hr />
      {page.content}
    </article>
  );
}
