import { useMemo } from "react";
import Table from "../shared/Table/Table";

const NftOwnerTable = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Owner",
        accessor: "owner",
      },
      {
        Header: "Price",
        accessor: "price",
      },
    ],
    []
  );
  return <Table columns={columns} data={[{ ...data, price: "3" }]} />;
};

export default NftOwnerTable;
