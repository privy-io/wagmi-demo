const SmallTextArea = ({ content }: { content: string }) => {
  return (
    <textarea
      className="min-w-full text-sm bg-white border-2 rounded border-slate-800 focus:border-slate-400 focus:outline-none shadow-sm p-2"
      rows={5}
    >
      {content}
    </textarea>
  );
};

export default SmallTextArea;
