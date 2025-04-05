import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, RotateCcw, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { SortStep } from '@/utils/sortingAlgorithms';

interface DataVisualizerProps {
  data: number[];
  sortingSteps: SortStep[];
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  resetVisualization: () => void;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const DataVisualizer: React.FC<DataVisualizerProps> = ({
  data,
  sortingSteps,
  isRunning,
  setIsRunning,
  resetVisualization,
  currentStep,
  setCurrentStep
}) => {
  const [speed, setSpeed] = useState<number>(1);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  
  const maxValue = Math.max(...data, 1) * 1.2; // Adding 20% to ensure bars fit
  
  // Set up animation interval
  useEffect(() => {
    if (isRunning) {
      // Clear any existing interval
      if (intervalId) {
        clearInterval(intervalId);
      }
      
      // Calculate the delay based on speed
      const delay = 1000 / speed;
      
      // Set new interval
      const id = setInterval(() => {
        setCurrentStep(step => {
          if (step < sortingSteps.length - 1) {
            return step + 1;
          } else {
            // If we've reached the end, stop running
            setIsRunning(false);
            if (step === sortingSteps.length - 1) {
              toast.success('Sorting complete!');
            }
            return step;
          }
        });
      }, delay);
      
      setIntervalId(id);
    } else if (intervalId) {
      // Clear interval if we're not running
      clearInterval(intervalId);
      setIntervalId(null);
    }
    
    // Clean up the interval when component unmounts
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, speed, sortingSteps.length, setCurrentStep]);
  
  // Get current array state for visualization
  const currentArray = sortingSteps.length > 0 && currentStep < sortingSteps.length
    ? sortingSteps[currentStep].array
    : data;
  
  // Get current comparison, swap, and sorted states
  const comparing = sortingSteps.length > 0 && currentStep < sortingSteps.length
    ? sortingSteps[currentStep].comparing
    : null;
  
  const swapping = sortingSteps.length > 0 && currentStep < sortingSteps.length
    ? sortingSteps[currentStep].swapping
    : null;
  
  const sorted = sortingSteps.length > 0 && currentStep < sortingSteps.length
    ? sortingSteps[currentStep].sorted
    : [];
  
  // Play/Pause button handler
  const handlePlayPause = () => {
    if (currentStep >= sortingSteps.length - 1) {
      resetVisualization();
    } else {
      setIsRunning(!isRunning);
    }
  };
  
  // Restart button handler
  const handleRestart = () => {
    resetVisualization();
    toast.info('Visualization restarted');
  };
  
  // Next step button handler
  const handleNextStep = () => {
    if (currentStep < sortingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      toast.info('Already at the last step');
    }
  };
  
  // Get the bar color based on its state
  const getBarColor = (index: number) => {
    // Green if it's sorted
    if (sorted.includes(index)) {
      return 'bg-green-500';
    }
    // Red if it's being swapped
    if (swapping && (swapping.includes(index))) {
      return 'bg-red-500';
    }
    // Yellow if it's being compared
    if (comparing && comparing.includes(index)) {
      return 'bg-yellow-400';
    }
    // Default color
    return 'bg-sortBar';
  };
  
  // Get animation class for bars
  const getBarAnimation = (index: number) => {
    return swapping && swapping.includes(index) ? 'animate-swap' : '';
  };
  
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 flex flex-col">
      {/* Visualization Area */}
      <div className="flex-grow flex items-end justify-center mt-4 space-x-1 min-h-[200px] pb-6 relative">
        {currentArray.map((value, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center"
            style={{ height: '100%', width: `${100 / Math.max(currentArray.length, 1)}%` }}
          >
            <div
              className={`${getBarColor(index)} ${getBarAnimation(index)} w-full transition-all duration-200 rounded-t-md`}
              style={{ 
                height: `${(value / maxValue) * 100}%`,
                maxWidth: '40px'
              }}
            ></div>
            <span className="absolute bottom-[-20px] text-xs text-gray-700">{value}</span>
          </div>
        ))}
      </div>
      
      {/* Controls Area */}
      <div className="mt-10 border-t pt-4">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium">Speed</div>
          <div className="flex items-center gap-1">
            <span className={`px-2 py-1 rounded text-xs ${speed === 1 ? 'bg-blue-100 text-blue-700 font-medium' : 'bg-gray-100 text-gray-500'}`}>x1</span>
            <span className={`px-2 py-1 rounded text-xs ${speed === 2 ? 'bg-blue-100 text-blue-700 font-medium' : 'bg-gray-100 text-gray-500'}`}>x2</span>
            <span className={`px-2 py-1 rounded text-xs ${speed === 5 ? 'bg-blue-100 text-blue-700 font-medium' : 'bg-gray-100 text-gray-500'}`}>x5</span>
            <span className={`px-2 py-1 rounded text-xs ${speed === 10 ? 'bg-blue-100 text-blue-700 font-medium' : 'bg-gray-100 text-gray-500'}`}>x10</span>
          </div>
        </div>
        
        <Slider
          value={[speed]}
          min={1}
          max={10}
          step={1}
          className="mb-6"
          onValueChange={([value]) => {
            setSpeed(value);
          }}
        />
        
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full"
            onClick={handleRestart}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          
          <Button
            className="px-10 bg-gray-900 hover:bg-gray-800"
            onClick={handlePlayPause}
          >
            {isRunning ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isRunning ? "Pause" : currentStep >= sortingSteps.length - 1 ? "Restart" : "Play"}
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full"
            onClick={handleNextStep}
            disabled={isRunning || currentStep >= sortingSteps.length - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="text-right text-sm text-gray-500 mt-2">
          {currentStep}/{sortingSteps.length - 1}
        </div>
      </div>
    </div>
  );
};

export default DataVisualizer;
