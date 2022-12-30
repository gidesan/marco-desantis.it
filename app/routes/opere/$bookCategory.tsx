import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { fetchBooksByCategory } from "../../services/books.server";

export default function BookCategory() {
  const data = useLoaderData();
  return (
    <>
      <Outlet />
      data={JSON.stringify(data)}
    </>
  );
}

interface Params {
  bookCategory: string;
}

export async function loader({
  params,
  request,
}: {
  params: Params;
  request: Request;
}) {
  const { bookCategory } = params;

  const books = await fetchBooksByCategory(bookCategory);

  return json(books);
}
