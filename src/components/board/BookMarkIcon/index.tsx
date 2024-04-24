import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';

interface Props {
  isActive: boolean;
}

function BookMarkIcon({ isActive }: Props) {
  return <>{isActive ? <BookmarkOutlinedIcon fontSize="large" /> : <BookmarkBorderOutlinedIcon fontSize="large" />}</>;
}

export default BookMarkIcon;
