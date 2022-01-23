import { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { toast } from "react-toastify";
import Table from "../shared/Table/Table";
import shortenWalletAddress from "../../utils/shortenWalletAddress";

import maticIcon from "../../assets/images/polygon-matic.svg";

const propTypes = {
  data: PropTypes.shape({ price: PropTypes.number, owner: PropTypes.string })
    .isRequired,
  price: PropTypes.string,
};

const handleClick = (address) => {
  navigator.clipboard.writeText(address);
  toast.success("Copied wallet address!");
};

const NftOwnerTable = ({ data, price }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 500);

  const handleResize = () => {
    if (window.innerWidth < 500) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const columns = useMemo(
    () => [
      {
        Header: "Owner",
        accessor: "owner",
        Cell: ({ value }) => (
          <button type="button" onClick={() => handleClick(value)}>
            {isMobile ? shortenWalletAddress(value) : value}
          </button>
        ),
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
    [isMobile]
  );
  return (
    <>
      <h1 className="py-5 text-xl font-bold">Owner</h1>
      <Table columns={columns} data={[{ ...data, price }]} />
    </>
  );
};

NftOwnerTable.defaultProps = {
  price: "--",
};
NftOwnerTable.propTypes = propTypes;
export default NftOwnerTable;
