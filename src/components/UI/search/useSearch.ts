import { useState } from 'react';

export interface Brand {
  brandId?: string;
  brandName: string;
  brandType?: string | null;
  displayName?: string | null;
  imageUrl?: string;
}

export interface UseSearchResult {
  searchTerm: string;
  filteredData: Brand[];
  selectedBrand: Brand[];
  handleSearch: (value: string) => void;
  updateSelectedBrand: (item: Brand) => void;
  deleteBrand: (brandName: string) => void;
}

const useSearch = (data: Brand[]): UseSearchResult => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredData, setFilteredData] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<Brand[]>([]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);

    // Update the filteredData based on the search term
    const updatedData = data.filter(item =>
      item.brandName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(updatedData);
  };

  const isUnique = (array: Brand[], newItem: Brand) =>
    !array.some(item => item.brandName === newItem.brandName);

  const addUniqueObject = (array: Brand[], newItem: Brand) => {
    if (isUnique(array, newItem)) {
      return [...array, newItem];
    }
    return array;
  };

  const updateSelectedBrand = (item: Brand) => {
    const updatedSelectedBrand = addUniqueObject(selectedBrand, item);
    setSelectedBrand(updatedSelectedBrand);
  };

  const deleteBrand = (brandName: string) => {
    const updatedSelectedBrand = selectedBrand.filter(item => item.brandName !== brandName);
    setSelectedBrand(updatedSelectedBrand);
  };

  return {
    searchTerm,
    filteredData,
    selectedBrand,
    handleSearch,
    updateSelectedBrand,
    deleteBrand,
  };
};

export default useSearch;
