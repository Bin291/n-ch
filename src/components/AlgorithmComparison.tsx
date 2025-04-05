
import React from 'react';
import DataBarChart from './DataBarChart';
import { SortStep, SortingAlgorithm } from '@/utils/sortingAlgorithms';

interface AlgorithmComparisonProps {
  algorithms: SortingAlgorithm[];
  data: number[];
  sortingSteps: Record<string, SortStep[]>;
  currentStep: number;
  isRunning: boolean;
  mode: 'dual' | 'all';
}

const AlgorithmComparison: React.FC<AlgorithmComparisonProps> = ({
  algorithms,
  data,
  sortingSteps,
  currentStep,
  isRunning,
  mode
}) => {
  // Get the actual algorithms to display based on the mode
  const displayAlgorithms = mode === 'dual' 
    ? algorithms.slice(0, 2) 
    : algorithms;

  return (
    <div className="w-full">
      <div className={`grid gap-4 ${mode === 'dual' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'}`}>
        {displayAlgorithms.map((algorithm) => {
          const steps = sortingSteps[algorithm.name] || [];
          const currentArray = steps.length > 0 && currentStep < steps.length
            ? steps[currentStep].array
            : data;
            
          const comparing = steps.length > 0 && currentStep < steps.length
            ? steps[currentStep].comparing
            : null;
            
          const swapping = steps.length > 0 && currentStep < steps.length
            ? steps[currentStep].swapping
            : null;

          return (
            <div key={algorithm.name} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-md font-medium mb-2">{algorithm.name}</h3>
              <DataBarChart 
                data={currentArray}
                highlightIndices={[
                  ...(comparing ? comparing : []),
                  ...(swapping ? swapping : [])
                ]}
                highlightColors={{
                  comparing: "#9b87f5",
                  swapping: "#ea384c"
                }}
              />
              <div className="mt-2 text-sm text-gray-600">
                <p>Current Action:</p>
                <p className="font-medium">
                  {steps.length > 0 && currentStep < steps.length
                    ? steps[currentStep].currentAction
                    : "Waiting to start..."}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlgorithmComparison;
