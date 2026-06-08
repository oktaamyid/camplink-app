import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAppearance } from '@/hooks/use-appearance';
import { Monitor, Moon, Sun } from 'lucide-react';
import { HTMLAttributes } from 'react';

export default function AppearanceToggleDropdown({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    const { appearance, updateAppearance } = useAppearance();

    const getCurrentIcon = () => {
        switch (appearance) {
            case 'dark':
                return <Moon className="h-4.5 w-4.5 text-[#787774] dark:text-slate-400 group-hover:text-[#111111] dark:group-hover:text-slate-200" />;
            case 'light':
                return <Sun className="h-4.5 w-4.5 text-[#787774] dark:text-slate-400 group-hover:text-[#111111] dark:group-hover:text-slate-200" />;
            default:
                return <Monitor className="h-4.5 w-4.5 text-[#787774] dark:text-slate-400 group-hover:text-[#111111] dark:group-hover:text-slate-200" />;
        }
    };

    return (
        <div className={className} {...props}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative flex size-8 items-center justify-center rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors focus:outline-none group">
                        {getCurrentIcon()}
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-36 p-1 rounded-xl shadow-lg border border-[#EAEAEA] dark:border-slate-800 bg-white dark:bg-[#111625] text-slate-900 dark:text-slate-100 animate-in fade-in zoom-in-95 duration-100">
                    <DropdownMenuItem onClick={() => updateAppearance('light')} className="rounded-lg px-2.5 py-1.5 focus:bg-[#F8F9FB] dark:focus:bg-slate-800 cursor-pointer">
                        <span className="flex items-center gap-2 text-xs font-semibold">
                            <Sun className="h-4 w-4" />
                            Light
                        </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => updateAppearance('dark')} className="rounded-lg px-2.5 py-1.5 focus:bg-[#F8F9FB] dark:focus:bg-slate-800 cursor-pointer">
                        <span className="flex items-center gap-2 text-xs font-semibold">
                            <Moon className="h-4 w-4" />
                            Dark
                        </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => updateAppearance('system')} className="rounded-lg px-2.5 py-1.5 focus:bg-[#F8F9FB] dark:focus:bg-slate-800 cursor-pointer">
                        <span className="flex items-center gap-2 text-xs font-semibold">
                            <Monitor className="h-4 w-4" />
                            System
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
