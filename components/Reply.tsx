export default function Reply({
  comment_id,
  content,
  nick_name,
  replying_to,
  user_image,
  user_name,
}: ReplyProps) {
  return (
    <div className="py-3 border-l pl-5">
      <div className="flex items-center">
        <img
          src={`/user-images/${user_image}`}
          alt="avatar-ali"
          className="w-11 h-11 rounded-full"
        />
        <div className="ml-4">
          <h3 className="bold-13 text-3A4">Ali Bravo</h3>
          <p className="text-[13px] text-647">26 August 2020</p>
        </div>
        <button className="ml-auto text-466 body-3">Reply</button>
      </div>

      <p className="text-647 mt-5">
        We need this feature too! Having folders seems like a basic feature that
        is available on most apps similar to this one.
      </p>
    </div>
  );
}
