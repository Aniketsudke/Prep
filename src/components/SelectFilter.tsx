import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

type FilterSelectProps = {
  width: string;
  placeholder: string;
  selectName: string[];
  isMultiple?: boolean; // Optional prop to toggle multiple select functionality
  onChange: (values: string[]) => void; // Callback to notify parent about selected values
};

const FilterSelect = ({
  width,
  placeholder,
  selectName,
  isMultiple = false,
  onChange,
}: FilterSelectProps) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleValueChange = (value: string) => {
    let newSelectedValues;
    if (isMultiple) {
      newSelectedValues = selectedValues.includes(value)
        ? selectedValues.filter((item) => item !== value)
        : [...selectedValues, value];
    } else {
      newSelectedValues = [value];
    }

    setSelectedValues(newSelectedValues);
    onChange(newSelectedValues); // Notify parent about the change
  };

  const removeElement = (
    elementToRemove: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); // Prevent default form submission behavior
    const updatedValues = selectedValues.filter(
      (element) => element !== elementToRemove
    );
    setSelectedValues(updatedValues);
    onChange(updatedValues); // Notify parent about the change
  };

  return (
    <>
      <Select
        onValueChange={handleValueChange}
        value={isMultiple ? undefined : selectedValues[0] || ""}
      >
        <SelectTrigger className={`w-${width}`}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {selectName.map((name) => (
            <SelectItem key={name} value={name}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {isMultiple && (
        <div>
          {selectedValues.length > 0 && (
            <div className="flex flex-wrap">
              {selectedValues.map((answer, index) => (
                <Badge
                  key={index}
                  variant={"outline"}
                  className="m-1 p-1 flex items-center"
                >
                  {answer}
                  <button
                    className="ml-2 text-red-500 hover:text-red-700"
                    onClick={(event) => removeElement(answer, event)}
                  >
                    &times; {/* Cross icon */}
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FilterSelect;