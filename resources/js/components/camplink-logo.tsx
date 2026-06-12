export default function CampLinkLogo({ className = '', textClassName = '', compact = false }: { className?: string; textClassName?: string; compact?: boolean }) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <img src="/logo.png" alt="CampLink" className="h-8 w-auto shrink-0" />
            {!compact && <span className={`text-lg font-bold text-gray-900 truncate ${textClassName}`}>CampLink</span>}
        </div>
    );
}
