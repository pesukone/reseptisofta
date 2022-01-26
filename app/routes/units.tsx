import type { LoaderFunction } from "remix";
import { useLoaderData } from "remix";
import { db } from "~/utils/db.server";

type LoaderData = {
  units: { id: string; name: string }[];
};

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    units: await db.unit.findMany(),
  };

  return data;
};

export default function UnitRoute() {
  const { units } = useLoaderData<LoaderData>();

  return (
    <div>
      <ul>
        {units.map((u) => (
          <li>{u.name}</li>
        ))}
      </ul>
    </div>
  );
}
