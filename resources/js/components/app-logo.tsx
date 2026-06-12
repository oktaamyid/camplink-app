import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center">
                <img src="/logo.png" alt="CampLink Logo" className="size-full object-contain" />
            </div>
            <div className="ml-2 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-bold text-gray-900 dark:text-white">CampLink</span>
            </div>
        </>
    );
}
