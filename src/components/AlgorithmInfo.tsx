
import React from 'react';
import { SortingAlgorithm, SortStep } from '@/utils/sortingAlgorithms';

interface AlgorithmInfoProps {
  algorithm: SortingAlgorithm;
  currentStep: number;
  sortingSteps: SortStep[];
}

const AlgorithmInfo: React.FC<AlgorithmInfoProps> = ({
  algorithm,
  currentStep,
  sortingSteps
}) => {
  // Get current action text
  const currentAction = sortingSteps.length > 0 && currentStep < sortingSteps.length
    ? sortingSteps[currentStep].currentAction
    : 'Ready to start sorting';

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-lg font-medium mb-4">Instructions</h2>
      
      <div className="mb-6">
        <h3 className="font-medium text-gray-700 mb-2">Algorithm Overview</h3>
        <ol className="list-decimal pl-5 space-y-2">
          {algorithm.description.map((step, index) => (
            <li key={index} className="text-gray-600">{step}</li>
          ))}
        </ol>
      </div>
      
      <div>
        <h3 className="font-medium text-gray-700 mb-2">Current Actions</h3>
        <div className="border-l-4 border-blue-500 pl-3 py-1 text-gray-600">
          {currentAction}
        </div>
      </div>
    </div>
  );
};

export default AlgorithmInfo;
