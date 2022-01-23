import { useMemo } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Table from "../shared/Table/Table";
import shortenWalletAddress from "../../utils/shortenWalletAddress";

import maticIcon from "../../assets/images/polygon-matic.svg";

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      itemId: PropTypes.number.isRequired,
      tokenId: PropTypes.number.isRequired,
      owner: PropTypes.string.isRequired,
      seller: PropTypes.string.isRequired,
      sold: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

const NftHistoryTable = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Event",
        accessor: "sold",
        Cell: ({ value }) => <div>{value ? "Sold" : "Listed"}</div>,
      },
      {
        Header: "Price",
        accessor: "price",
        Cell: ({ value }) => (
          <div className="flex">
            <Image src={maticIcon} alt="Metamask logo" height={24} width={24} />
            <p className="ml-2">{value}</p>
          </div>
        ),
      },
      {
        Header: "From",
        accessor: "seller",
        Cell: ({ value }) => <div>{shortenWalletAddress(value)}</div>,
      },
      {
        Header: "To",
        accessor: "owner",
        Cell: ({ value }) => (
          <div>
            {value === "0x0000000000000000000000000000000000000000"
              ? "--"
              : shortenWalletAddress(value)}
          </div>
        ),
      },
    ],
    []
  );
  return (
    <>
      <h1 className="py-5 text-xl font-bold">Item activity</h1>
      <Table columns={columns} data={data} />
    </>
  );
};

NftHistoryTable.propTypes = propTypes;
export default NftHistoryTable;
