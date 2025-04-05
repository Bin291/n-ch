
import React, { useState, useEffect } from 'react';
import InputData from '@/components/InputData';
import DataVisualizer from '@/components/DataVisualizer';
import AlgorithmInfo from '@/components/AlgorithmInfo';
import AlgorithmSelector from '@/components/AlgorithmSelector';
import { algorithms, bubbleSort, SortStep } from '@/utils/sortingAlgorithms';
import { toast } from 'sonner';

const Index: React.FC = () => {
  const [data, setData] = useState<number[]>([3, 7, 4, 5, 13, 10, 6, 8, 1]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(bubbleSort);
  const [sortingSteps, setSortingSteps] = useState<SortStep[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  // Generate sorting steps when data or algorithm changes
  useEffect(() => {
    if (data.length > 0) {
      const steps = selectedAlgorithm.execute([...data]);
      setSortingSteps(steps);
      setCurrentStep(0);
      setIsRunning(false);
    } else {
      setSortingSteps([]);
      setCurrentStep(0);
    }
  }, [data, selectedAlgorithm]);

  const handleAlgorithmChange = (algorithm: typeof selectedAlgorithm) => {
    if (isRunning) {
      setIsRunning(false);
    }
    setSelectedAlgorithm(algorithm);
    toast.info(`Switched to ${algorithm.name}`);
  };
  
  const resetVisualization = () => {
    setCurrentStep(0);
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <AlgorithmSelector 
          algorithms={algorithms}
          selectedAlgorithm={selectedAlgorithm}
          onSelectAlgorithm={handleAlgorithmChange}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="md:col-span-1">
            <InputData data={data} setData={setData} />
          </div>
          
          <div className="md:col-span-2">
            <DataVisualizer
              data={data}
              sortingSteps={sortingSteps}
              isRunning={isRunning}
              setIsRunning={setIsRunning}
              resetVisualization={resetVisualization}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          </div>
        </div>
        
        <div className="mt-6">
          <AlgorithmInfo
            algorithm={selectedAlgorithm}
            currentStep={currentStep}
            sortingSteps={sortingSteps}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
