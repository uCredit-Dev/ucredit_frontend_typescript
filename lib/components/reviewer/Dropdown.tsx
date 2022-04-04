import { ReactNode, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';

interface DropdownOptions {
  label: string | ReactNode;
  cb: () => any;
}

interface Props {
  options: DropdownOptions[];
}

const Dropdown: React.FC<Props> = ({ options }) => {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(options[0].label);

  const handleExpand = (e) => {
    e.stopPropagation();
    setExpanded((expanded) => !expanded);
  };

  const handleSelect = (e, label, cb) => {
    e.stopPropagation();
    setSelected(label);
    cb();
    setExpanded(false);
  };

  return (
    <div
      className="relative pl-2 pr-1 py-[2.5px] w-[130px] text-sm border rounded select-none"
      onClick={handleExpand}
    >
      <div className="flex items-center justify-between">
        <p className="flex-none">{selected}</p>
        <ChevronDownIcon className="w-4 h-4 text-slate-600" />
      </div>
      {expanded && (
        <div className="absolute bg-white border w-[130px] -translate-x-[9px] translate-y-1.5 rounded px-2 py-[2.5px]">
          {options.map(({ label, cb }) => (
            <div onClick={(e) => handleSelect(e, label, cb)}>{label}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
