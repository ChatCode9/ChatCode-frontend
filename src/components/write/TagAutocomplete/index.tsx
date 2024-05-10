import { useEffect, useState, Fragment } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { Wrapper } from './styles';

interface Props {
  tagList: string[];
  onTagListChange: (tagList: string[]) => void;
}

function sleep(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

function TagAutocomplete({ tagList, onTagListChange }: Props) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3);

      if (active) {
        setOptions(['javascript', 'react', 'python', 'Node.js']);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

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
            label="태그"
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
