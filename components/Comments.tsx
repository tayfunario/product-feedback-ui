export default function Comments({ numOfComments }: { numOfComments: number }) {
  return (
    <div className="flex justify-center items-center">
      <img src="/icon-comments.svg" alt="comments" className="mr-2" />
      <span className="bold-13">{numOfComments}</span>
    </div>
  );
}
