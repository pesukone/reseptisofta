import type { ActionFunction } from "remix";
import { Form, redirect } from "remix";
import { IngredientAmount } from "@prisma/client";
import { useState } from "react";
import { db } from "~/utils/db.server";

interface IngredientFormData {
  amount: number;
  unit: string;
  ingredient: string;
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const amounts = form.getAll("amount").map((a) => Number(a));
  const units = form.getAll("unit") as string[];
  const ingredients = form.getAll("ingredient") as string[];

  for (let i = 0; i < amounts.length; i++) {
    const unit = await db.unit.create({ data: { name: units[i] } });
    const ingredient = await db.ingredient.create({
      data: { name: ingredients[i] },
    });
  }

  return redirect("/");
};

export default function NewRecipeRoute() {
  const [ingredients, setIngredients] = useState<Partial<IngredientFormData>[]>(
    []
  );

  return (
    <div>
      <p>Uusi resepti</p>
      <Form method="post">
        <label>
          Nimi: <input type="text" name="name" />
        </label>
        <p>
          <button
            type="button"
            onClick={() => setIngredients([...ingredients, {}])}
          >
            + Lisää ainesosa
          </button>
        </p>
        {ingredients.map((i) => (
          <p>
            <input type="text" name="ingredient" />
            <input type="number" name="amount" />
            <input type="text" name="unit" />
          </p>
        ))}
        <p>
          <button type="submit">Tallenna</button>
        </p>
      </Form>
    </div>
  );
}
