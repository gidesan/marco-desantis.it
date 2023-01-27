import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Books from "../../components/Books";

import { fetchBooksByCategory } from "../../services/books.server";

export default function BookCategory() {
  const data = useLoaderData<typeof loader>();
  return <Books data={data} />;
}

interface Params {
  bookCategory: string;
}

export async function loader({ params }: { params: Params }) {
  const { bookCategory } = params;
  const books = await fetchBooksByCategory(bookCategory);
  return json(books);
}
