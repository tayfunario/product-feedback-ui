interface TopProps {
  sort: string;
  setSort: (sort: string) => void;
}

interface DropdownProps {
  chosen: string;
  values: string[];
  callback: (param: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  targetElem?: string;
}

interface SuggestionProps {
  category: string;
  description: string;
  id: number;
  status: string;
  title: string;
  upvotes: number;
  willNavigate: boolean;
}

interface CommentProps {
  content: string;
  id: number;
  nick_name: string;
  request_id: number;
  user_image: string;
  user_name: string;
}

interface ReplyProps {
  comment_id: number;
  content: string;
  nick_name: string;
  replying_to: string;
  user_image: string;
  user_name: string;
}
