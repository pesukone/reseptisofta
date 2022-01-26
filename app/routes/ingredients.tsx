import type { LoaderFunction } from "remix";
import { useLoaderData } from "remix";
import { db } from "~/utils/db.server";

type Ingredients = { id: string; name: string }[];

export const loader: LoaderFunction = async () => {
  const ingredients: Ingredients = await db.ingredient.findMany();
  return ingredients;
};

export default function IngredientRoute() {
  const ingredients = useLoaderData<Ingredients>();

  return (
    <div>
      <ul>
        {ingredients.map((i) => (
          <li>{i.name}</li>
        ))}
      </ul>
    </div>
  );
}
