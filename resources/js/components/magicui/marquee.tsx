import { cn } from '@/lib/utils';

interface MarqueeProps {
    className?: string;
    reverse?: boolean;
    pauseOnHover?: boolean;
    children?: React.ReactNode;
    vertical?: boolean;
    repeat?: number;
    [key: string]: unknown;
}

export default function Marquee({
    className,
    reverse = false,
    pauseOnHover = false,
    children,
    vertical = false,
    repeat = 2,
    ...props
}: MarqueeProps) {
    return (
        <div
            {...props}
            className={cn(
                'group flex overflow-hidden p-2 [--duration:40s] [--gap:1.5rem] gap-(--gap)',
                vertical ? 'flex-col' : 'flex-row',
                className,
            )}
        >
            {Array.from({ length: repeat }).map((_, i) => (
                <div
                    key={i}
                    className={cn(
                        'flex shrink-0 justify-around gap-(--gap)',
                        vertical ? 'flex-col animate-marquee-vertical' : 'flex-row animate-marquee',
                        reverse ? 'direction-reverse' : '',
                        pauseOnHover ? 'group-hover:paused' : '',
                    )}
                >
                    {children}
                </div>
            ))}
        </div>
    );
}
