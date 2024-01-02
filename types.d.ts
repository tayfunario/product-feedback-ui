interface TopProps {
  sort: string;
  setSort: (sort: string) => void;
}

interface SortProps {
  sort: string;
  setSort: (sort: string) => void;
}

interface SuggestionProps {
  category: string;
  description: string;
  id: number;
  status: string;
  title: string;
  upvotes: number;
}
