import { compileMDX } from "next-mdx-remote/rsc";
import Image from "next/image";

async function compileBlogMdx(fileContent: string) {
  const { content, frontmatter } = await compileMDX<{
    title: string;
    description: string;
    date: string;
  }>({
    source: fileContent,
    options: { parseFrontmatter: true },
    components: { Image: (props) => <Image {...props} /> },
  });

  const { title, description, date } = frontmatter;

  return {
    content,
    title,
    description,
    date,
  };
}

export default compileBlogMdx;
