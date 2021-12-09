import Header from "../Header/Header";

const Layout = ({ children }) => {
  return (
    <div className=" max-w-screen-2xl">
      <Header />
      <div className="px-4">{children}</div>
    </div>
  );
};

export default Layout;
