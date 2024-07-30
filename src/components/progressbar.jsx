"use client";

import * as React from "react";
import { Progress } from "@/components/ui/progress";

const LoadingProgress = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prevProgress) => prevProgress + 10);
      }
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, [progress]);

  return (
    <>
      {progress < 100 ? (
        <Progress
          value={progress}
          className="w-[60%]"
        />
      ) : (
        <div className="text-center mt-4">
          <p>Loading complete! Show your page or data here.</p>
        </div>
      )}
    </>
  );
};

export default LoadingProgress;
