
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Plus, Shuffle } from 'lucide-react';
import { toast } from 'sonner';
import DataBarChart from './DataBarChart';

interface InputDataProps {
  data: number[];
  setData: React.Dispatch<React.SetStateAction<number[]>>;
}

const InputData: React.FC<InputDataProps> = ({ data, setData }) => {
  const [newValue, setNewValue] = useState<string>('');
  const [highlightIndex, setHighlightIndex] = useState<number | undefined>(undefined);

  const handleAddValue = () => {
    if (newValue.trim() === '') {
      toast.error('Please enter a value');
      return;
    }

    const numValue = parseInt(newValue);
    if (isNaN(numValue)) {
      toast.error('Please enter a valid number');
      return;
    }

    const newData = [...data, numValue];
    setData(newData);
    setNewValue('');
    
    // Highlight the newly added bar
    setHighlightIndex(newData.length - 1);
    setTimeout(() => setHighlightIndex(undefined), 2000);
  };

  const handleRemoveValue = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const handleRandom = () => {
    const randomData = Array.from({ length: 8 }, () => Math.floor(Math.random() * 20) + 1);
    setData(randomData);
    toast.success('Random data generated');
  };

  const handleClear = () => {
    setData([]);
    toast.success('Data cleared');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddValue();
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-lg font-medium mb-4">Input data</h2>
      
      <div className="mb-4">
        <DataBarChart 
          data={data} 
          highlightIndices={highlightIndex !== undefined ? [highlightIndex] : []} 
          barColor="#9b87f5"
        />
      </div>
      
      <div className="space-y-2">
        {data.map((value, index) => (
          <div key={index} className="flex items-center">
            <div className="flex-grow text-right pr-3">
              <input
                className="w-full text-right border rounded-md px-3 py-2 bg-white"
                value={value}
                readOnly
              />
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-10 w-10"
              onClick={() => handleRemoveValue(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      
      <div className="flex mt-4">
        <div className="flex-grow mr-2">
          <Input
            type="number"
            placeholder="Add a number..."
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <Button 
          variant="outline"
          className="flex items-center gap-1 px-4"
          onClick={handleAddValue}
        >
          <Plus className="h-4 w-4" />
          <span>Add value</span>
        </Button>
      </div>
      
      <div className="flex mt-4 gap-2">
        <Button
          variant="outline"
          className="flex items-center gap-2 flex-1"
          onClick={handleRandom}
        >
          <Shuffle className="h-4 w-4" />
          <span>Random</span>
        </Button>
        
        <Button
          variant="outline"
          className="flex-1"
          onClick={handleClear}
        >
          Clear
        </Button>
      </div>
      
      <div className="mt-4">
        <Button 
          className="w-full" 
          disabled={data.length === 0}
          onClick={() => toast.success('Data submitted!')}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default InputData;
