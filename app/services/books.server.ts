import fs from "fs";
import path from "path";
import parseFrontMatter from "front-matter";

interface Frontmatter {
  title: string;
  date: string;
  slug: string;
  image?: string;
}

export async function fetchBooksByCategory(category: string) {
  const filePaths = await fs.promises.readdir(
    `${__dirname}/../../content/${category}`
  );

  const bookPromises = filePaths
    .filter((path) => path.endsWith(".mdx"))
    .map(async (mdxFileName) => {
      const mdxFilePath = path.join(
        `${__dirname}/../../content/${category}`,
        mdxFileName
      );
      const mdxFile = await fs.promises.readFile(mdxFilePath);
      const { attributes } = parseFrontMatter<Frontmatter>(mdxFile.toString());
      const defaultImageFileName = mdxFileName.replace(/\.mdx/, ".jpg");
      const defaultImage = filePaths.includes(defaultImageFileName)
        ? defaultImageFileName
        : undefined;

      console.log({ defaultImageFileName, defaultImage, filePaths });

      return {
        slug: mdxFileName.replace(/\.mdx/, ""),
        title: attributes.title,
        date: new Date(attributes.date),
        image: attributes.image || defaultImage,
      };
    });

  return Promise.all(bookPromises);
}
