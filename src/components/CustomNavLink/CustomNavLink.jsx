import { NavLink, useMatch, useResolvedPath } from "react-router-dom";

const CustomNavLink = ({ to, children, fontSize }) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <NavLink
      to={to}
      style={{ fontSize: fontSize ? fontSize : "26px" }}
      className={`p-2 border-b-2 border-transparent ${
        match ? "border-red-600 text-red-600" : "border-transparent"
      }`}
    >
      <span className="">{children}</span>
    </NavLink>
  );
};

export default CustomNavLink;
