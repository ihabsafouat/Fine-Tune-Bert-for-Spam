declare module '@splinetool/react-spline' {
    import { ComponentType } from 'react';
    import { Application } from '@splinetool/runtime';
    
    interface SplineProps {
        scene: string;
        className?: string;
        onLoad?: (splineApp: Application) => void;
        onError?: (error: Error) => void;
    }
    
    const Spline: ComponentType<SplineProps>;
    export default Spline;
}

declare module '@splinetool/runtime' {
    export class Application {
        constructor(canvas: HTMLCanvasElement);
        load(url: string): Promise<void>;
        dispose(): void;
    }
} 