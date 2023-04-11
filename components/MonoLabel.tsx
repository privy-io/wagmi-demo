const MonoLabel = ({ label }: { label: string }) => {
  return (
    <span className="px-2 py-1 font-mono bg-slate-200 rounded-xl">{label}</span>
  );
};

export default MonoLabel;
