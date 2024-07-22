import styled from 'styled-components';
import { Post } from '../../../types/post';
import { spliceTag } from '../../../utils/spliceTag';

function TagList({ tags }: Pick<Post, 'tags'>) {
  return (
    <Container className="tag-list">
      {spliceTag(tags).map((tag) => (
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
