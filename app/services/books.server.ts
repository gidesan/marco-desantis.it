import fs from "fs";
import path from "path";
import parseFrontMatter from "front-matter";

interface BookFrontmatter {
  title: string;
  date: string;
  slug: string;
  image?: string;
}

export async function fetchBooksByCategory(category: string) {
  const categoryDir = `${__dirname}/../../content/${category}`;
  const filePaths = await fs.promises.readdir(categoryDir);

  const bookPromises = filePaths
    .filter((path) => path.endsWith(".mdx"))
    .map(async (mdxFileName) => {
      const mdxFilePath = path.join(categoryDir, mdxFileName);
      const mdxFile = await fs.promises.readFile(mdxFilePath);
      const { attributes } = parseFrontMatter<BookFrontmatter>(
        mdxFile.toString()
      );
      const maybeDefaultImageFileName = mdxFileName.replace(/\.mdx/, ".jpg");
      const defaultImageFileName = filePaths.includes(maybeDefaultImageFileName)
        ? maybeDefaultImageFileName
        : undefined;

      return {
        slug: mdxFileName.replace(/\.mdx/, ""),
        title: attributes.title,
        date: new Date(attributes.date),
        image: attributes.image || defaultImageFileName,
      };
    });

  return Promise.all(bookPromises);
}
