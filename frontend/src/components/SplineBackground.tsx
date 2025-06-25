import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';

const SplineBackground: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [loadAttempts, setLoadAttempts] = useState(0);
  const [useLocalFile, setUseLocalFile] = useState(true);

  const handleLoad = (splineApp: any) => {
    console.log('Spline scene loaded successfully', splineApp);
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = (error: Error) => {
    console.error('Error loading Spline scene:', error);
    setHasError(true);
    setIsLoading(false);
    
    // Try local file first, then fall back to hosted URL
    if (useLocalFile && loadAttempts === 0) {
      console.log('Local file failed, trying hosted URL...');
      setUseLocalFile(false);
      setIsLoading(true);
      setHasError(false);
      setLoadAttempts(1);
      return;
    }
    
    // Retry loading after a delay
    if (loadAttempts < 2) {
      setTimeout(() => {
        setLoadAttempts((prev: number) => prev + 1);
        setIsLoading(true);
        setHasError(false);
      }, 2000);
    }
  };

  if (hasError && loadAttempts >= 2) {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-purple-900 via-black to-pink-900">
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/50 text-center">
          <p>3D Background unavailable</p>
          <p className="text-sm">Using fallback background</p>
        </div>
      </div>
    );
  }

  // Try local file first, then fall back to hosted URL
  const sceneUrl = useLocalFile 
    ? "/spline/scene.spline"
    : "https://prod.spline.design/78PVLJ3QlM5aiDZb/scene.splinecode";

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-pink-900 flex items-center justify-center">
          <div className="text-white/50">Loading 3D background...</div>
        </div>
      )}
      
      <Spline
        scene={sceneUrl}
        className="w-full h-full"
        onLoad={handleLoad}
        onError={handleError}
      />
      
      {/* Debug info - remove in production */}
      <div className="absolute top-4 left-4 text-white/30 text-xs">
        Spline: {isLoading ? 'Loading' : hasError ? 'Error' : 'Loaded'} 
        (Attempts: {loadAttempts})
        {useLocalFile ? ' (Local)' : ' (Hosted)'}
      </div>
    </div>
  );
};

export default SplineBackground; 