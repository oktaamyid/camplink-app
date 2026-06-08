import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface MeteorsProps {
    number?: number;
    className?: string;
}

export default function Meteors({ number = 20, className }: MeteorsProps) {
    const [meteorStyles, setMeteorStyles] = useState<React.CSSProperties[]>([]);

    useEffect(() => {
        const styles = Array.from({ length: number }).map(() => ({
            top: '-5px',
            left: Math.floor(Math.random() * 100) + '%',
            animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + 's',
            animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + 's',
        }));
        setMeteorStyles(styles);
    }, [number]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {meteorStyles.map((style, idx) => (
                <span
                    key={'meteor' + idx}
                    className={cn(
                        'animate-meteor absolute size-0.5 rounded-full bg-slate-400 shadow-[0_0_0_1px_rgba(255,255,255,0.1)]',
                        'before:content-[""] before:absolute before:top-1/2 before:-translate-y-1/2 before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-indigo-500 before:to-transparent',
                        className,
                    )}
                    style={style}
                />
            ))}
        </div>
    );
}
