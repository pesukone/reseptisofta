import { range } from "lodash";

const Pagination = ({
  pagesTotal,
  currentPage,
}: {
  pagesTotal: number;
  currentPage: number | null;
}) => {
  const page = currentPage ?? 1;

  return (
    <div>
      {pagesTotal < 2 ? null : (
        <>
          <button type="submit" name="page" value={page - 1}>
            {"<"}
          </button>
          {range(1, pagesTotal + 1).map((i) => (
            <button type="submit" name="page" value={i}>
              {i}
            </button>
          ))}
          <button type="submit" name="page" value={page + 1}>
            {">"}
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
