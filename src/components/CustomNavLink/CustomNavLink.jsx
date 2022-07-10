import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';

const CustomNavLink = ({ to, children, fontSize }) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <NavLink
            to={to}
            style={{ fontSize: fontSize ? fontSize : '26px' }}
            className={`p-2 px-3 border-b-[3px] border-transparent ${
                match
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-blue-900 '
            }`}
        >
            <span className="">{children}</span>
        </NavLink>
    );
};

export default CustomNavLink;
