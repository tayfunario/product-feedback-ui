interface TopProps {
  sort: string;
  setSort: (sort: string) => void;
}

interface ToggleProps {
  chosen: string;
  values: string[];
  callback: (param: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface SuggestionProps {
  category: string;
  description: string;
  id: number;
  status: string;
  title: string;
  upvotes: number;
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
