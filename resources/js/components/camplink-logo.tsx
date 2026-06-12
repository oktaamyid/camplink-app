export default function CampLinkLogo({ className = '', textClassName = '', compact = false }: { className?: string; textClassName?: string; compact?: boolean }) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <img src="/logo.png" alt="CampLink Logo" className="size-8 shrink-0 object-contain" />
            {!compact && <span className={`text-lg font-bold text-gray-900 dark:text-white truncate ${textClassName}`}>CampLink</span>}
        </div>
    );
}
