import Link from "next/link";
import path from "path";
import * as fs from "node:fs";
import compileBlogMdx from "@/utils/compileBlogMdx";

export default async function Home() {
  const postsDirectory = path.join(process.cwd(), "content/posts");
  const filenames = fs.readdirSync(postsDirectory);
  const promises = filenames.map(async (filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const result = await compileBlogMdx(fileContent);
    return {
      ...result,
      slug: filename.split(".mdx")[0],
    };
  });

  const allPosts = await Promise.all(promises);

  return (
    <div className="prose dark:prose-invert">
      {allPosts.map((post) => (
        <article key={post.title}>
          <Link href={`/posts/${post.slug}`}>
            <h2>{post.title}</h2>
          </Link>
          {post.description && <p>{post.description}</p>}
        </article>
      ))}
    </div>
  );
}
