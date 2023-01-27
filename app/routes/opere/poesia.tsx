import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Books from "../../components/Books";

import { fetchBooksByCategory } from "../../services/books.server";

export default function Poesia() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <div className="content-header offset-by-one">
        <p>
          La poesia di Marco Ignazio de Santis è anche su{" "}
          <a href="http://www.italian-poetry.org/de_santis_marco_ignazio.html">
            italian-poetry.org
          </a>
          .
        </p>
      </div>
      <Books data={data} />;
    </>
  );
}

export async function loader() {
  const books = await fetchBooksByCategory("poesia");
  return json(books);
}
