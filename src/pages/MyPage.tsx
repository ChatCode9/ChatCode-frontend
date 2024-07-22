import Navbar from '../components/header/NavBar';
import Profile from '../components/myPage/Profile';
import Tabs from '../components/Tabs';
import PostStats from '../components/myPage/PostStats';

function MyPage() {
  return (
    <>
      <Navbar />
      <Profile />
      <PostStats />
      <Tabs />
    </>
  );
}
export default MyPage;
