import fs from "fs";
import path from "path";
import parseFrontMatter from "front-matter";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

interface BookFrontmatter {
  date: string;
  imageUrl: string;
  title: string;
}

export interface BookAttributes {
  content: string;
  date: Date;
  imageUrl: string;
  slug: string;
  title: string;
}

export async function fetchBooksByCategory(
  category: string
): Promise<BookAttributes[]> {
  const categoryDir = path.join(process.cwd(), `./content/${category}`);
  console.log({ categoryDir });
  const filePaths = await fs.promises.readdir(categoryDir);

  const unsortedBooks = await Promise.all(
    filePaths
      .filter((path) => path.endsWith(".mdx"))
      .map(async (mdxFileName) => {
        const mdxFilePath = path.join(categoryDir, mdxFileName);
        const mdxFile = await fs.promises.readFile(mdxFilePath);
        const { attributes, body } = parseFrontMatter<BookFrontmatter>(
          mdxFile.toString()
        );
        const imageFileName = mdxFileName.replace(/\.mdx/, ".jpg");
        const imageUrl =
          attributes.imageUrl || `/images/books/${imageFileName}`;

        const content = DOMPurify.sanitize(marked.parse(body));

        return {
          content,
          date: new Date(attributes.date),
          imageUrl,
          title: attributes.title,
          slug: mdxFileName.replace(/\.mdx/, ""),
        };
      })
  );
  return unsortedBooks.sort((a, b) => b.date.getTime() - a.date.getTime());
}
