import path from "path";
import * as fs from "node:fs";
import compileBlogMdx from "@/utils/compileBlogMdx";

async function getBlogContentFromParams({
  params,
  folder,
}: {
  params: Promise<{ slug: string[] }>;
  folder: "posts" | "pages";
}) {
  const { slug } = await params;
  const blogName = slug[0];
  const filePath = path.join(process.cwd(), `content/${folder}`, `${blogName}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf-8");

  if (!fileContent) {
    return null;
  }

  return compileBlogMdx(fileContent);
}

export default getBlogContentFromParams;
