'use client';

const SmallTextArea = ({content}: {content: string}) => {
  return (
    <textarea
      className="min-w-full rounded border-2 border-slate-800 bg-white p-2 text-sm shadow-sm focus:border-slate-400 focus:outline-none"
      rows={5}
      defaultValue={content}
    />
  );
};

export default SmallTextArea;
