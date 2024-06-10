import ActionButtons from '../ActionButtons';
import PostHeader from '../PostHeader';
import WriterProfile from '../WriterProfile';
import { Container } from './styles';

interface Props {
  postId : number;
}

const data = {
  title: '코딩 문제 중 이게 어떻게 어쩌고 저쩌고 하는지 잘 모르겠는데 봐주세요 어쩌고저쩌고',
  timeline: '2024-06-09T12:34:56Z',
  updated : true,
  viewCount: 1230000,
  bookmark: true,
  tags: ['coding', 'react', 'spring', 'html', 'vscode', 'css', 'js', 'study'],
  content: '<p>내용</p>',
  writer: '가나다라바마사',
};

function Post({postId} : Props) {
  const { title, timeline, updated, viewCount, bookmark, tags, content, writer } = data;

  return (
    <Container>
      <PostHeader postId={postId} title={title} timeline={timeline} updated={updated} viewCount={viewCount} bookmark={bookmark} />
      <div className="tags">
        {tags.map((tag) => (
          <li key={tag}>#{tag}</li>
        ))}
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
      <WriterProfile writer={writer} />
      <ActionButtons />
    </Container>
  );
}

export default Post;
