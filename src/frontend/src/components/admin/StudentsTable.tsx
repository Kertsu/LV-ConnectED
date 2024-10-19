import { useUserByStudents } from "@/hooks/useUserData";
import { DataTable } from "../tables/data-table";
import { useState } from "react";
import { studentsColumns } from "../tables/StudentsColumnDef";

const StudentsTable = () => {
  const [pages, setPages] = useState(0);

  const take = 10; // Number of items per page
  const page = pages * take;
  
  const { data, isLoading, isError,  } = useUserByStudents(page, take);
  console.log("Students Table:", data)
  const totalRows = data?.count || 0;

  return (
    <>
      <DataTable
        columns={studentsColumns}
        data={data?.students || []}
        page={page}
        pageSize={take}
        totalRows={totalRows}
        onPageChange={setPages}
      />
    </>
  );
};

export default StudentsTable;