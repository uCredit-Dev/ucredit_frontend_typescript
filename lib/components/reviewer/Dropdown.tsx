import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  BackspaceIcon,
  ChevronDownIcon,
  RefreshIcon,
  XIcon,
} from '@heroicons/react/solid';
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
    const res = processDefault(_default);
    setSelected(res);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_default]);

  useEffect(() => {
    if (clickedOutside) {
      setExpanded(false);
      (setClickedOutside as Dispatch<SetStateAction<boolean>>)(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedOutside]);

  const processDefault = (_default) => {
    let res;
    if (typeof _default === 'string') {
      const defaultOption = options.filter(({ label }) => label === _default);
      if (defaultOption.length > 0) res = [defaultOption[0]];
      else res = [options[0]];
    } else if (Array.isArray(_default)) {
      if (!multi) return;
      const defaultOptions = [];
      for (const d of _default) {
        const defaultOption = options.filter(({ label }) => label === d);
        if (defaultOption.length > 0) defaultOptions.push(defaultOption[0]);
      }
      res = defaultOptions;
    }
    return res;
  };

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
      className="relative z-50 py-1 pl-2 pr-1 text-sm transition-colors duration-100 ease-in border rounded select-none group border-slate-200 hover:border-slate-300"
      style={{ width }}
      onClick={handleExpand}
      ref={ref}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-wrap w-full gap-1">
          {multi ? (
            selected.length ? (
              selected.map((s) => (
                <span
                  className="flex items-center h-5 gap-1 px-1 duration-100 ease-in rounded-sm transition-color bg-slate-200 hover:bg-slate-300"
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
                    <XIcon className="w-3.5 h-3.5 text-slate-600" />
                  </div>
                </span>
              ))
            ) : (
              <span className="text-slate-400">Select...</span>
            )
          ) : (
            selected.length && (selected[0].content || selected[0].label)
          )}
        </div>
        <div className="flex items-center flex-none h-full gap-1 transition-colors duration-100 ease-in">
          {multi && (
            <div className="flex gap-1">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(options);
                  onChange(options);
                }}
              >
                <RefreshIcon className="w-4 h-4 cursor-pointer text-slate-500 hover:text-slate-600" />
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected([]);
                  onChange([]);
                }}
              >
                <BackspaceIcon className="w-4 h-4 cursor-pointer text-slate-500 hover:text-slate-600" />
              </div>
            </div>
          )}
          <ChevronDownIcon className="w-5 h-5 text-slate-500 group-hover:text-slate-600" />
        </div>
      </div>
      {expanded && (
        <div
          className="fixed bg-white border -translate-x-[9px] translate-y-2 border-slate-200 rounded px-2 py-[2.5px] flex flex-col gap-1"
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
