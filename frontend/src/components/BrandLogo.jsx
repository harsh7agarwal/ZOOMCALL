import VideocamIcon from '@mui/icons-material/Videocam';

export default function BrandLogo({ light = false, size = 'md' }) {
    const fontSize = size === 'lg' ? '1.5rem' : '1.25rem';
    const iconSize = size === 'lg' ? 28 : 22;

    return (
        <div className={`brandLogo ${light ? 'brandLogoLight' : ''}`}>
            <span className="brandLogoIcon">
                <VideocamIcon sx={{ fontSize: iconSize }} />
            </span>
            <span className="brandLogoText" style={{ fontSize }}>Prime Call</span>
        </div>
    );
}
