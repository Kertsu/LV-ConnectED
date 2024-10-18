import { useUserByProviders } from "@/hooks/useUserData";
import { DataTable } from "../tables/data-table";
import { providersColumns } from "../tables/ProvidersColumnDef";
import { useState } from "react";
import { dummyUsers } from "../data/dummy-data";

const ProvidersTable = () => {
  const [page, setPage] = useState(0);

  const take = 10; // Number of items per page
  const skip = page * take;

  // Assume this API returns both `data` and `total` (total number of rows)
  const { data, isLoading, isError } = useUserByProviders(skip, take);
  const totalRows = data || 0

  
  return (
    <>
      <DataTable
        columns={providersColumns}
        data={data || []}
        page={page}
        pageSize={take}
        totalRows={totalRows}
        onPageChange={setPage}
      />
    </>
  );
};

export default ProvidersTable;
