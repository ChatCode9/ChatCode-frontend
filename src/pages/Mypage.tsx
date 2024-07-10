import Navbar from '../components/header/NavBar';
import Profile from '../components/mypage/Profile';
import Tabs from '../components/Tabs';
import PostStats from '../components/mypage/PostStats';

function Mypage() {
  return (
    <>
      <Navbar />
      <Profile />
      <PostStats />
      <Tabs />
    </>
  );
}
export default Mypage;
