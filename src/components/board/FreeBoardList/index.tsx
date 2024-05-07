const list = [
  {
    id: 1,
    nickname: '가나다라마바사',
    title: '~~인데 맞음?',
    tags: ['coding', 'react', 'spring', 'html', 'vscode', 'css', 'js', 'study'],
    viewCount: 20,
    commentCount: 20,
    likeCount: 20,
    bookmark: false,
    block: false,
  },
  {
    id: 2,
    nickname: '가나다라마바사',
    title: '~~인데 맞음?',
    tags: ['coding', 'react', 'spring', 'html', 'vscode', 'css', 'js', 'study'],
    viewCount: 20,
    commentCount: 20,
    likeCount: 20,
    bookmark: true,
    block: true,
  },
];

function FreeBoardList() {
  return (
    <ul>
      {list.map(({ id }) => (
        <li key={id}></li>
      ))}
    </ul>
  );
}

export default FreeBoardList;
