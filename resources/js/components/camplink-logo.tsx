export default function CampLinkLogo({ className = '' }: { className?: string }) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#2F3E8F]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 2L3 7V17L12 22L21 17V7L12 2Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path d="M12 2V22" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M3 7L21 17" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M21 7L3 17" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </div>
            <span className="text-base font-semibold text-[#2F3E8F]">CampLink</span>
        </div>
    );
}
