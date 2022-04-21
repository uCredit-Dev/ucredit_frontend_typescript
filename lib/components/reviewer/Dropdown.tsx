import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ChevronDownIcon, XIcon } from '@heroicons/react/solid';
import 'react-toastify/dist/ReactToastify.css';
import { useClickOutside } from '../utils';

interface DropdownOptions {
  label: string | number;
  content?: ReactNode | string;
}

interface Props {
  width: number;
  options: DropdownOptions[];
  _default: string | number | string[] | number[];
  multi?: boolean;
  onChange?: (values: any) => void;
}

const Dropdown: React.FC<Props> = ({
  width,
  options,
  _default,
  multi = false,
  onChange = undefined,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState([]);
  const ref = useRef(null);
  const [clickedOutside, setClickedOutside] = useClickOutside(ref);

  useEffect(() => {
    if (typeof _default === 'string') {
      const defaultOption = options.filter(({ label }) => label === _default);
      if (defaultOption.length > 0) setSelected([defaultOption[0]]);
      else setSelected([options[0]]);
    } else if (Array.isArray(_default)) {
      if (!multi) return;
      const defaultOptions = [];
      for (const d of _default) {
        const defaultOption = options.filter(({ label }) => label === d);
        if (defaultOption.length > 0) defaultOptions.push(defaultOption[0]);
      }
      setSelected(defaultOptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_default]);

  useEffect(() => {
    if (clickedOutside) {
      setExpanded(false);
      (setClickedOutside as Dispatch<SetStateAction<boolean>>)(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedOutside]);

  const handleExpand = (e) => {
    e.stopPropagation();
    setExpanded((expanded) => !expanded);
  };

  const handleSelect = async (e, option) => {
    e.stopPropagation();
    if (multi) {
      const found = selected.find((s) => s.label === option.label);
      if (found) {
        setExpanded(false);
        return;
      }
      const newSelected = [...selected, option];
      setSelected(newSelected);
      onChange(newSelected);
    } else {
      setSelected([option]);
      onChange([option]);
    }
    setExpanded(false);
  };

  return (
    <div
      className="relative pl-2 py-[2.5px] text-sm border rounded select-none z-50"
      style={{ width }}
      onClick={handleExpand}
      ref={ref}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-wrap flex-none w-full gap-1">
          {multi
            ? selected.map((s) => (
                <span
                  className="flex items-center h-4 gap-1 px-1 text-xs transition-shadow duration-100 ease-in rounded-sm bg-slate-200 hover:shadow"
                  key={s.label}
                >
                  <p className="truncate" style={{ maxWidth: width }}>
                    {s.content || s.label}
                  </p>
                  <div
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      const newSelected = selected.filter(
                        (c) => c.label !== s.label,
                      );
                      setSelected(newSelected);
                      onChange(newSelected);
                    }}
                  >
                    <XIcon className="w-3 h-3" />
                  </div>
                </span>
              ))
            : selected.length && (selected[0].content || selected[0].label)}
        </div>
        <ChevronDownIcon className="flex-none w-4 h-4 -translate-x-5 text-slate-600" />
      </div>
      {expanded && (
        <div
          className="absolute bg-white border -translate-x-[9px] translate-y-1.5 rounded px-2 py-[2.5px] flex flex-col gap-1"
          style={{ width }}
        >
          {options.map((option) => {
            return (
              <div
                key={option.label}
                onClick={(e) => handleSelect(e, option)}
                className="cursor-pointer"
              >
                {option.content || option.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
