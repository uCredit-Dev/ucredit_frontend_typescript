import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

import axios from 'axios';
import { getAPI } from './../../resources/assets';
import { Plan } from './../../resources/commonTypes';

const Preview: React.FC = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [allowComment, setAllowComment] = useState(true);
  const [planName, setPlanName] = useState('Default Name');
  const [openTags, setOpenTags] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  const [description, setDescription] = useState('');

  const [currentPlan, setCurrentPlan] = useState<Plan[]>([]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const someTags = [
    'English',
    'Pre-law',
    'Pre-med',
    'CS',
    'AMS',
    'Undecided',
    'IS',
    'some tag',
    'another tag',
    'something',
  ];

  const handleAddTag = (event: SelectChangeEvent<typeof tags>) => {
    const {
      target: { value },
    } = event;
    setTags(typeof value === 'string' ? value.split(' ') : value);
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };
  const toggleAllowComment = () => {
    setAllowComment(!allowComment);
  };

  const namePlan = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlanName(event.target.value);
  };

  // hardcoded for now
  const planID = '61ccac7bfd08a30004b0417c';

  // plan details saved to 'currentPlan'
  useEffect(() => {
    axios
      .get(getAPI(window) + `/plans/${planID}`)
      .then((response) => {
        const plan = response.data.data;
        setCurrentPlan(plan);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [planID]);

  // const onPlanSubmit = () => {
  //   console.log(currentPlan);
  //   console.log(currentPlan.majors[0]);
  //   const old_id = '61ccac7bfd08a30004b0417c';
  //   const tags = ['CS', 'CE'];
  //   console.log(description);
  //   // post
  //   axios
  //     .post(getAPI(window) + '/roadmapPlans/createFromPlan', {
  //       old_id,
  //       description,
  //       tags,
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <>
      <button
        className="absolute z-49 bottom-[100px] right-[10px] w-[20px] h-auto text-lg rounded-lg sm:w-auto px-3 py-1 text-blue-header bg-blue-footer sm:rounded-[13px]"
        onClick={togglePreview}
      >
        Post Plan
      </button>
      <div
        className={clsx(
          "fixed top-0 z-49 w-[100%] h-[100%] font-['Futura'] bg-slate-100 transition-all duration-500 ease-in-out",
          {
            'translate-y-full': !showPreview,
          },
        )}
        onClick={togglePreview}
      ></div>
      <div
        className={clsx(
          "fixed bottom-0 z-51 w-[100%] h-[70%] font-['Futura'] bg-white rounded-[20px] transition-all duration-500 ease-in-out",
          {
            'translate-y-full': !showPreview,
          },
        )}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={togglePreview}
          className="absolute top-5 right-5"
        >
          <path
            d="M9.4 8L15.7 1.7C16.1 1.3 16.1 0.7 15.7 0.3C15.3 -0.1 14.7 -0.1 14.3 0.3L8 6.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.0999998 0.7 -0.0999998 1.3 0.3 1.7L6.6 8L0.3 14.3C0.1 14.5 0 14.7 0 15C0 15.6 0.4 16 1 16C1.3 16 1.5 15.9 1.7 15.7L8 9.4L14.3 15.7C14.5 15.9 14.7 16 15 16C15.3 16 15.5 15.9 15.7 15.7C16.1 15.3 16.1 14.7 15.7 14.3L9.4 8Z"
            fill="#797877"
          />
        </svg>
        <div className="flex items-end sm:space-x-5 pl-[7%] pt-[3%]">
          <TextField
            required
            label="Required"
            defaultValue={planName}
            onChange={namePlan}
            variant="standard"
            inputProps={{
              style: {
                fontFamily: 'Futura',
                fontSize: 24,
              },
            }}
          />
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block"
          >
            <path
              d="M5.33301 27H12.3997C12.619 27.0013 12.8365 26.9592 13.0395 26.8763C13.2426 26.7933 13.4273 26.6711 13.583 26.5167L25.1163 14.9667L29.8497 10.3333C30.0059 10.1784 30.1299 9.99406 30.2145 9.79096C30.2991 9.58786 30.3427 9.37002 30.3427 9.15C30.3427 8.92998 30.2991 8.71214 30.2145 8.50904C30.1299 8.30594 30.0059 8.12161 29.8497 7.96667L22.783 0.816667C22.6281 0.660453 22.4437 0.536462 22.2406 0.451848C22.0375 0.367233 21.8197 0.323669 21.5997 0.323669C21.3797 0.323669 21.1618 0.367233 20.9587 0.451848C20.7556 0.536462 20.5713 0.660453 20.4163 0.816667L15.7163 5.53333L4.14967 17.0833C3.99521 17.2391 3.873 17.4238 3.79006 17.6268C3.70711 17.8299 3.66507 18.0473 3.66634 18.2667V25.3333C3.66634 25.7754 3.84194 26.1993 4.1545 26.5118C4.46706 26.8244 4.89098 27 5.33301 27ZM21.5997 4.35L26.3163 9.06667L23.9497 11.4333L19.233 6.71667L21.5997 4.35ZM6.99967 18.95L16.883 9.06667L21.5997 13.7833L11.7163 23.6667H6.99967V18.95ZM31.9997 30.3333H1.99967C1.55765 30.3333 1.13372 30.5089 0.821163 30.8215C0.508602 31.1341 0.333008 31.558 0.333008 32C0.333008 32.442 0.508602 32.866 0.821163 33.1785C1.13372 33.4911 1.55765 33.6667 1.99967 33.6667H31.9997C32.4417 33.6667 32.8656 33.4911 33.1782 33.1785C33.4907 32.866 33.6663 32.442 33.6663 32C33.6663 31.558 33.4907 31.1341 33.1782 30.8215C32.8656 30.5089 32.4417 30.3333 31.9997 30.3333Z"
              fill="#65869B"
            />
          </svg>
        </div>

        <div className="flex my-2 items-center pl-[7%]">
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block mr-3"
            onClick={() => setOpenTags(!openTags)}
          >
            <path
              d="M3.89919 3.89948C0.0101055 7.78857 0.0101055 14.1525 3.89919 18.0416C7.78828 21.9307 14.1522 21.9307 18.0413 18.0416C21.9304 14.1525 21.9304 7.78857 18.0413 3.89948C14.1522 0.0103956 7.78828 0.0103956 3.89919 3.89948ZM15.2129 9.9806C15.7786 9.9806 16.2029 10.4049 16.2029 10.9706C16.2029 11.5362 15.7786 11.9605 15.2129 11.9605H11.9602V15.2132C11.9602 15.7789 11.5359 16.2031 10.9703 16.2031C10.4046 16.2031 9.98031 15.7789 9.98031 15.2132V11.9605H6.72762C6.16193 11.9605 5.73767 11.5362 5.73767 10.9706C5.73767 10.4049 6.16193 9.9806 6.72762 9.9806H9.98031V6.72791C9.98031 6.16222 10.4046 5.73796 10.9703 5.73796C11.5359 5.73796 11.9602 6.16222 11.9602 6.72791V9.9806H15.2129Z"
              fill="black"
            />
          </svg>
          <div className="inline-block text-[20px]">Add tag</div>
        </div>
        <div className="my-2 pl-[7%]">
          <Collapse in={openTags} timeout="auto">
            <Box
              sx={{
                width: '100%',
                maxHeight: 200,
                maxWidth: 150,
                bgcolor: 'background.paper',
              }}
            >
              <div>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <Select
                    multiple
                    value={tags}
                    onChange={handleAddTag}
                    input={<OutlinedInput />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {someTags.map((oneTag) => (
                      <MenuItem key={oneTag} value={oneTag}>
                        {oneTag}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </Box>
          </Collapse>
        </div>

        <textarea
          className="mt-2 mx-[7%] w-[86%] border-2 text-[20px] p-3 rounded-[20px] h-36"
          placeholder="enter despcription..."
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="mt-2 ml-[7%] flex items-center">
          <input
            type="radio"
            className="w-[21px] h-[21px] mr-3 bg-gray-100 border-gray-300 focus:ring-blue-footer"
            checked={!allowComment}
            onClick={toggleAllowComment}
          />
          Don't allow comment
        </div>

        <div className="flex items-center pl-[7%] pt-[3%]">
          <div className="font-['Futura'] text-[30px]">Preview</div>
        </div>
        {/* <button
          onClick={() => {
            onPlanSubmit();
          }}
          className="absolute mt-[-75px] ml-[15px] w-[75px] h-[32px] rounded-[100px] bg-[#0C3A76] text-white"
        >
          {' '}
          submit
        </button> */}
      </div>
    </>
  );
};

export default Preview;
