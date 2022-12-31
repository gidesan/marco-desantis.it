import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { fetchBooksByCategory } from "../../services/books.server";

export default function BookCategory() {
  const data = useLoaderData<typeof loader>();
  return (
    <div id="features">
      {data.map(({ content, imageUrl, slug, title }) => (
        <div key={slug}>
          <br className="clear" />
          <div className="four columns offset-by-four book-image">
            <a className="fancybox" rel="gallery" href={imageUrl}>
              <img
                className="four columns imagedropshadow"
                src={imageUrl}
                alt={title}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = "/images/book-image-unavailable.png";
                }}
              />
            </a>
          </div>
          <div className="four columns offset-by-one description">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
          <br className="clear" />
        </div>
      ))}
    </div>
  );
}

interface Params {
  bookCategory: string;
}

export async function loader({ params }: { params: Params }) {
  const { bookCategory } = params;
  const books = await fetchBooksByCategory(bookCategory);
  return json(books);
}
