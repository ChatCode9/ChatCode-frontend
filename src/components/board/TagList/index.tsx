import styled from 'styled-components';

interface Props {
  tags: string[];
}

function TagList({ tags }: Props) {
  return (
    <Container className="tag-list">
      {tags.map((tag) => (
        <li key={tag}>{`#${tag}`}</li>
      ))}
    </Container>
  );
}

export default TagList;

const Container = styled.ul`
  display: flex;
  margin-top: 5px;
  color: #353e5c;

  li + li {
    margin-left: 5px;
  }
`;
