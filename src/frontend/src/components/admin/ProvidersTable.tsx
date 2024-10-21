import { useArchivedUsers, useUnverifiedProviders, useUserByProviders } from "@/hooks/useUserData";
import { useState } from "react";
import { DataTable } from "../tables/data-table";
import { providersColumns } from "../tables/ProvidersColumnDef";


const VerfiedProvidersTable = () => {
  const [page, setPage] = useState(0);

  const take = 10; 
  const skip = page * take;

  const { data, isLoading } = useUserByProviders(skip, take);
  const totalRows = data?.count || 0;

  return (
    <>
      <DataTable
        columns={providersColumns}
        data={data?.providers || []}
        page={page}
        pageSize={take}
        totalRows={totalRows}
        onPageChange={setPage}
        loading={isLoading} // Pass the loading state to the DataTable component
      />
    </>
  );
};
const UnverifiedProvidersTable = () => {
  const [page, setPage] = useState(0);

  const take = 10; 
  const skip = page * take;

  const { data, isLoading } = useUnverifiedProviders(skip, take);
  const totalRows = data?.count || 0;

  return (
    <>
      <DataTable
        columns={providersColumns}
        data={data?.providers || []}
        page={page}
        pageSize={take}
        totalRows={totalRows}
        onPageChange={setPage}
        loading={isLoading} // Pass the loading state to the DataTable component
      />
    </>
  );
};
const ArchivedUsers = () => {
  const [pages, setPage] = useState(0);

  const take = 10; 
  const page = pages * take;

  const { data, isLoading } = useArchivedUsers(page, take);
  console.log("ln:60 Archived:", data); 
  const totalRows = data?.count || 0;

  return (
    <>
      <DataTable
        columns={providersColumns}
        data={data?.users || []}
        page={pages}
        pageSize={take}
        totalRows={totalRows}
        onPageChange={setPage}
        loading={isLoading} // Pass the loading state to the DataTable component
      />
    </>
  );
};

export { VerfiedProvidersTable, UnverifiedProvidersTable, ArchivedUsers }

