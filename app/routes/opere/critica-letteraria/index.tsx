import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Books from "../../../components/Books";

import { fetchBooksByCategory } from "../../../services/books.server";

export default function CriticaLetteraria() {
  const data = useLoaderData<typeof loader>();
  return <Books data={data} />;
}

export async function loader() {
  const books = await fetchBooksByCategory("critica-letteraria");
  return json(books);
}
