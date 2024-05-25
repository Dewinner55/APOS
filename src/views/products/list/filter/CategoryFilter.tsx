// React Imports
import React from 'react';

// Next Imports
import { useTranslations } from 'next-intl';

// MUI Imports
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';

// Interface Imports
import {Category} from "src/@core/interface/category/interface";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  categories: Category[];
}

const CategoryFilter = ({
                          selectedCategory,
                          onCategoryChange,
                          categories
                        }: CategoryFilterProps) => {
  const t = useTranslations('subcategoryList');

  const handleCatChange = (event: SelectChangeEvent<string>) => {
    const newCategory = event.target.value;
    onCategoryChange(newCategory);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id='cat-select'>Выберите категорию</InputLabel>
      <Select
        id='select-cat'
        value={selectedCategory || 'reset'}
        onChange={handleCatChange}
        label='Select Category'
        labelId='cat-select'
        inputProps={{ placeholder: 'Select Category' }}
      >
        <MenuItem value='reset'>Все категории</MenuItem>
        {categories?.map((cat, index) => (
          <MenuItem key={`${cat.id}_${index}`} value={cat.id}>
            {cat.translate_content && cat.translate_content.length > 0 ? cat.translate_content[0].content.title : 'Безымянная категория'}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryFilter;
