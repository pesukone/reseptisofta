import type { LoaderFunction } from "remix";
import { useLoaderData, useSearchParams, Form } from "remix";
import { db } from "~/utils/db.server";

import Pagination from "~/components/pagination";

type Ingredients = { id: string; name: string }[];

const perPage = 3;

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page");
  const parsedPage = page ? parseInt(page, 10) : 1;

  const ingredients: Ingredients = await db.ingredient.findMany({
    skip: (parsedPage - 1) * perPage,
    take: perPage,
  });
  const count = await db.ingredient.count();
  return { ingredients, pagesTotal: count / perPage };
};

export default function IngredientRoute() {
  const { ingredients, pagesTotal } =
    useLoaderData<{ ingredients: Ingredients; pagesTotal: number }>();

  const [params] = useSearchParams();
  const page = params.get("page");

  return (
    <Form method="get">
      <div>
        <ul>
          {ingredients.map((i) => (
            <li>{i.name}</li>
          ))}
        </ul>
      </div>
      <Pagination
        pagesTotal={pagesTotal}
        currentPage={page ? parseInt(page, 10) : null}
      />
    </Form>
  );
}
