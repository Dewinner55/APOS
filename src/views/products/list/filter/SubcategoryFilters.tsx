// MUI Imports
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, {SelectChangeEvent} from '@mui/material/Select'

// Interface Imports
import {useTranslations} from "next-intl";
import {Category} from "src/@core/interface/category/interface";

interface Props {
  selectedLang: string;
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (categoryId: string) => void;
  selectStyle?: React.CSSProperties;
}

const SubcategoryFilters = ({ selectedLang, categories, selectedCategory, setSelectedCategory, selectStyle }: Props) => {
  const t = useTranslations('subcategoryList');

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
  };

  return (
    <FormControl fullWidth sx={{marginBottom: 2}}>
      <InputLabel id='lang-select'>Выберите категорию</InputLabel>
      <Select
        fullWidth
        id='select-lang'
        value={selectedCategory}
        onChange={handleCategoryChange}
        label='Select Language'
        labelId='lang-select'
        inputProps={{placeholder: 'Select Language'}}
        style={selectStyle}
      >
        {categories?.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.translate_content?.find((item) => item.lang_code === selectedLang)?.content.title || 'Translation not available'}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SubcategoryFilters;
