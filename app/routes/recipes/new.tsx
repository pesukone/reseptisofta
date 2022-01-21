import { Form, LoaderFunction } from "remix";
import { IngredientAmount } from "@prisma/client";
import { useState } from "react";

export default function NewRecipeRoute() {
  const [ingredients, setIngredients] = useState<Partial<IngredientAmount>[]>(
    []
  );

  return (
    <div>
      <p>Uusi resepti</p>
      <Form>
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
            <input type="number" value={i?.amount?.count} />{" "}
            <input type="text" value={i?.amount?.unit} />{" "}
            <input type="text" value={i?.name} />
          </p>
        ))}
        <p>
          <button type="submit">Tallenna</button>
        </p>
      </Form>
    </div>
  );
}
