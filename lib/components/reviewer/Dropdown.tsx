import { ReactNode, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';

interface DropdownOptions {
  label: string;
  content?: ReactNode | string;
  cb: () => any;
}

interface Props {
  width: number;
  options: DropdownOptions[];
  _default: string;
}

const Dropdown: React.FC<Props> = ({ width, options, _default }) => {
  const defaultOption = options.filter(({ label }) => label === _default);
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(
    (defaultOption && (defaultOption[0].content || defaultOption[0].label)) ||
      options[0].content ||
      options[0].label,
  );

  const handleExpand = (e) => {
    e.stopPropagation();
    setExpanded((expanded) => !expanded);
  };

  const handleSelect = async (
    e,
    label: string,
    content: ReactNode | string,
    cb: () => any,
  ) => {
    e.stopPropagation();
    setSelected(content || label);
    await cb();
    setExpanded(false);
  };

  return (
    <div
      className="relative pl-2 pr-1 py-[2.5px] text-sm border rounded select-none"
      style={{ width }}
      onClick={handleExpand}
    >
      <div className="flex items-center justify-between">
        <div className="flex-none">{selected}</div>
        <ChevronDownIcon className="w-4 h-4 text-slate-600" />
      </div>
      {expanded && (
        <div
          className="absolute bg-white border -translate-x-[9px] translate-y-1.5 rounded px-2 py-[2.5px] flex flex-col gap-1"
          style={{ width }}
        >
          {options.map(({ label, content, cb }) => (
            <div
              key={label}
              onClick={(e) => handleSelect(e, label, content, cb)}
              className="cursor-pointer"
            >
              {content || label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
