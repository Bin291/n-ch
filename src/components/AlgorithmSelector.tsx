
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { SortingAlgorithm } from '@/utils/sortingAlgorithms';
import { BarChart2 } from 'lucide-react';

interface AlgorithmSelectorProps {
  algorithms: SortingAlgorithm[];
  selectedAlgorithm: SortingAlgorithm;
  onSelectAlgorithm: (algorithm: SortingAlgorithm) => void;
}

const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({
  algorithms,
  selectedAlgorithm,
  onSelectAlgorithm
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <BarChart2 className="mr-2 text-blue-500" />
        <h1 className="text-xl font-semibold">Sort Lab</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <Select
          value={selectedAlgorithm.name}
          onValueChange={(value) => {
            const selected = algorithms.find(algo => algo.name === value);
            if (selected) onSelectAlgorithm(selected);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Algorithm" />
          </SelectTrigger>
          <SelectContent>
            {algorithms.map((algorithm) => (
              <SelectItem key={algorithm.name} value={algorithm.name}>
                {algorithm.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button variant="outline">
          Compare 2
        </Button>
        
        <Button variant="outline">
          Compare All
        </Button>
      </div>
    </div>
  );
};

export default AlgorithmSelector;
