
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
  const [allSortingSteps, setAllSortingSteps] = useState<Record<string, SortStep[]>>({});
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [comparisonMode, setComparisonMode] = useState<'single' | 'dual' | 'all'>('single');
  
  // Generate sorting steps when data or algorithm changes
  useEffect(() => {
    if (data.length > 0) {
      const steps = selectedAlgorithm.execute([...data]);
      setSortingSteps(steps);
      setCurrentStep(0);
      setIsRunning(false);

      // Generate steps for all algorithms when in comparison mode
      if (comparisonMode !== 'single') {
        const allSteps: Record<string, SortStep[]> = {};
        algorithms.forEach(algo => {
          allSteps[algo.name] = algo.execute([...data]);
        });
        setAllSortingSteps(allSteps);
      }
    } else {
      setSortingSteps([]);
      setCurrentStep(0);
    }
  }, [data, selectedAlgorithm, comparisonMode]);

  const handleAlgorithmChange = (algorithm: typeof selectedAlgorithm) => {
    if (isRunning) {
      setIsRunning(false);
    }
    setSelectedAlgorithm(algorithm);
    setComparisonMode('single');
    toast.info(`Switched to ${algorithm.name}`);
  };
  
  const resetVisualization = () => {
    setCurrentStep(0);
    setIsRunning(false);
  };

  const handleComparisonModeChange = (mode: 'single' | 'dual' | 'all') => {
    setComparisonMode(mode);
    resetVisualization();
    
    if (mode !== 'single') {
      // Generate steps for all algorithms when switching to comparison mode
      const allSteps: Record<string, SortStep[]> = {};
      algorithms.forEach(algo => {
        allSteps[algo.name] = algo.execute([...data]);
      });
      setAllSortingSteps(allSteps);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <AlgorithmSelector 
          algorithms={algorithms}
          selectedAlgorithm={selectedAlgorithm}
          onSelectAlgorithm={handleAlgorithmChange}
          comparisonMode={comparisonMode}
          setComparisonMode={handleComparisonModeChange}
        />
        
        <div className={`mt-8 ${comparisonMode === 'single' ? 'grid grid-cols-1 md:grid-cols-3 gap-6' : ''}`}>
          {comparisonMode === 'single' && (
            <div className="md:col-span-1">
              <InputData data={data} setData={setData} />
            </div>
          )}
          
          <div className={comparisonMode === 'single' ? 'md:col-span-2' : 'mt-4'}>
            {comparisonMode === 'single' && (
              <DataVisualizer
                data={data}
                sortingSteps={sortingSteps}
                isRunning={isRunning}
                setIsRunning={setIsRunning}
                resetVisualization={resetVisualization}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                comparisonMode={comparisonMode}
                algorithms={algorithms}
              />
            )}
            
            {comparisonMode !== 'single' && (
              <div className="grid grid-cols-1 gap-6">
                <div className="md:col-span-1">
                  <InputData data={data} setData={setData} />
                </div>
                <DataVisualizer
                  data={data}
                  sortingSteps={sortingSteps}
                  allSortingSteps={allSortingSteps}
                  isRunning={isRunning}
                  setIsRunning={setIsRunning}
                  resetVisualization={resetVisualization}
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                  comparisonMode={comparisonMode}
                  algorithms={comparisonMode === 'dual' ? algorithms.slice(0, 2) : algorithms}
                />
              </div>
            )}
          </div>
        </div>
        
        {comparisonMode === 'single' && (
          <div className="mt-6">
            <AlgorithmInfo
              algorithm={selectedAlgorithm}
              currentStep={currentStep}
              sortingSteps={sortingSteps}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
