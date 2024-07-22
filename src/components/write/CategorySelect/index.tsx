import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Wrapper } from './styles';
import { CategoriesStatus } from '../../../types/filter';
import { FILTERS_CATEGORIES_LIST } from '../../../constants/filters';

interface Props {
  category: CategoriesStatus;
  onCategoryChange: (category: CategoriesStatus) => void;
}

function CategorySelect({ category, onCategoryChange }: Props) {
  const handleChange = (e: SelectChangeEvent) => {
    onCategoryChange(e.target.value as CategoriesStatus);
  };

  return (
    <Wrapper>
      <FormControl style={{ width: '250px' }} size="medium">
        <InputLabel>게시판 선택</InputLabel>
        <Select label="게시판 선택" value={category} onChange={handleChange}>
          <MenuItem value={FILTERS_CATEGORIES_LIST.FREE}>자유</MenuItem>
          <MenuItem value={FILTERS_CATEGORIES_LIST.QUESTION}>Q&A</MenuItem>
        </Select>
      </FormControl>
    </Wrapper>
  );
}

export default CategorySelect;
