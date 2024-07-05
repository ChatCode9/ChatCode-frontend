import { useEffect, useState, Fragment } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { Wrapper } from './styles';

import { useCategoriesQuery } from '../../../hooks/api/useCategoriesQuery.ts';
import { TagsType } from '../../../types/tags.ts';

interface Props {
  tagList: string[];
  onTagListChange: (tagList: string[]) => void;
}

function TagAutocomplete({ tagList, onTagListChange }: Props) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const loading = open && options.length === 0;

  // 게시글 데이터 호출
  const { tagListData /*, isLoadingTagListData, isErrorTagListData*/ } = useCategoriesQuery();

  useEffect(() => {
    console.log(tagListData);
    if (tagListData) {
      const names = tagListData.data.map((item: TagsType) => item.name);
      setOptions(names);
    }
  }, [tagListData]);

  const handleChange = (_: React.SyntheticEvent, value: string[]) => {
    onTagListChange(value);
  };

  return (
    <Wrapper>
      <Autocomplete
        multiple
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="태그"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </Fragment>
              ),
            }}
          />
        )}
        value={tagList}
        onChange={handleChange}
      />
    </Wrapper>
  );
}

export default TagAutocomplete;
