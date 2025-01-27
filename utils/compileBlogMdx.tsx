import { compileMDX } from "next-mdx-remote/rsc";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

async function compileBlogMdx(fileContent: string) {
  const { content, frontmatter } = await compileMDX<{
    title: string;
    description: string;
    date: string;
    imageUrl: string;
  }>({
    source: fileContent,
    options: { parseFrontmatter: true },
    components: {
      Image: (props) => <Image {...props} width={1000} height={1000} />,
      code: ({ children, className }) => {
        const language = className?.replace("language-", "");
        if (!language) {
          return <span className="font-bold">{children}</span>;
        }

        return (
          <SyntaxHighlighter style={materialDark} language={language}>
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        );
      },
    },
  });

  const { title, description, date, imageUrl } = frontmatter;

  return {
    content,
    title,
    description,
    date,
    imageUrl,
  };
}

export default compileBlogMdx;
