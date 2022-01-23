import { useMemo } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Table from "../shared/Table/Table";

import maticIcon from "../../assets/images/polygon-matic.svg";

const propTypes = {
  data: PropTypes.shape({ price: PropTypes.number, owner: PropTypes.string })
    .isRequired,
  price: PropTypes.string,
};

const NftOwnerTable = ({ data, price }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Owner",
        accessor: "owner",
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
    ],
    []
  );
  return <Table columns={columns} data={[{ ...data, price }]} />;
};

NftOwnerTable.defaultProps = {
  price: "--",
};
NftOwnerTable.propTypes = propTypes;
export default NftOwnerTable;
