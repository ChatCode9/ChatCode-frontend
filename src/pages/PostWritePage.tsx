import { useState } from 'react';
import styled from 'styled-components';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Editor from '../components/Editor';
import Button from '@mui/material/Button';
import EastIcon from '@mui/icons-material/East';

function PostWritePage() {
  const [mainCategory, setMainCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');

  const handleMainChange = (e: SelectChangeEvent) => {
    setMainCategory(e.target.value as string);
  };

  const handleSubChange = (e: SelectChangeEvent) => {
    setSubCategory(e.target.value as string);
  };

  return (
    <Container>
      <Form>
        <Header>
          <SelectWrapper>
            <FormControl fullWidth size="small">
              <InputLabel>대분류</InputLabel>
              <Select label="대분류" value={mainCategory} onChange={handleMainChange}>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel>중분류</InputLabel>
              <Select label="중분류" value={subCategory} onChange={handleSubChange}>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </SelectWrapper>

          <TextField fullWidth placeholder="제목" />

          <TagAutocompleteWrapper>
            <Autocomplete
              multiple
              options={['javascript', 'react', 'python', 'Node.js']}
              renderInput={(params) => <TextField {...params} placeholder="태그" />}
            />
          </TagAutocompleteWrapper>
        </Header>

        <EditorWrapper>
          <Editor />
        </EditorWrapper>

        <ButtonWrapper>
          <Button variant="outlined" sx={{ backgroundColor: '#F8FAFF' }}>
            Save
          </Button>
          <Button
            variant="contained"
            endIcon={<EastIcon />}
            sx={{
              backgroundColor: '#6D758F',
              ':hover': { backgroundColor: '#6D758F' },
              '.MuiButton-icon': { marginLeft: '0px' },
            }}
          >
            Post
          </Button>
        </ButtonWrapper>
      </Form>
    </Container>
  );
}

export default PostWritePage;

const Container = styled.div`
  padding-bottom: 100px;
`;

const Form = styled.form`
  max-width: 856px;
  margin: 0 auto;
  padding-top: 100px;
`;

const Header = styled.header``;

const SelectWrapper = styled.div`
  display: flex;
  max-width: 500px;
  margin-bottom: 10px;

  .MuiFormControl-root + .MuiFormControl-root {
    margin-left: 20px;
  }
`;

const TagAutocompleteWrapper = styled.div`
  margin-top: 10px;
`;

const EditorWrapper = styled.div`
  margin-top: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 70px;

  button + button {
    margin-left: 10px;
  }
`;
