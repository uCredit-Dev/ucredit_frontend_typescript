interface Props {
  children: any;
  width: number;
}

const TooltipPrimary: React.FC<Props> = ({ children, width }) => {
  return (
    <div
      className="flex items-center justify-center px-2 py-1 text-sm font-normal border rounded-md shadow-md bg-white/90 border-slate-200"
      style={{ width: `${width}px` }}
    >
      <div>{children}</div>
    </div>
  );
};

export { TooltipPrimary };
