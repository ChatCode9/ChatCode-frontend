import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Wrapper } from './styles';

interface Props {
  category: 'question' | 'free' | undefined;
  onCategoryChange: (category: 'question' | 'free') => void;
}

function CategorySelect({ category, onCategoryChange }: Props) {
  const handleChange = (e: SelectChangeEvent) => {
    onCategoryChange(e.target.value as 'question' | 'free');
  };

  return (
    <Wrapper>
      <FormControl style={{ width: '250px' }} size="medium">
        <InputLabel>게시판 선택</InputLabel>
        <Select label="게시판 선택" value={category} onChange={handleChange}>
          <MenuItem value={'question'}>Q&A</MenuItem>
          <MenuItem value={'free'}>자유</MenuItem>
        </Select>
      </FormControl>
    </Wrapper>
  );
}

export default CategorySelect;
