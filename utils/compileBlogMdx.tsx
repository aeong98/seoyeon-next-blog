import { compileMDX } from "next-mdx-remote/rsc";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

async function compileBlogMdx(fileContent: string) {
  const { content, frontmatter } = await compileMDX<{
    title: string;
    description: string;
    date: string;
  }>({
    source: fileContent,
    options: { parseFrontmatter: true },
    components: {
      Image: (props) => <Image {...props} />,
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

  const { title, description, date } = frontmatter;

  return {
    content,
    title,
    description,
    date,
  };
}

export default compileBlogMdx;
