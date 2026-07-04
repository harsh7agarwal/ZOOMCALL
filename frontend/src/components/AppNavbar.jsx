import BrandLogo from './BrandLogo';

export default function AppNavbar({ light = false, children }) {
    return (
        <nav className={`appNavbar ${light ? 'appNavbarLight' : ''}`}>
            <BrandLogo light={light} />
            {children && <div className="appNavbarActions">{children}</div>}
        </nav>
    );
}
