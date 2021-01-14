interface DistributionColors {
  total: string[];
  naturalSciences: string[];
  humanities: string[];
  computerScience: string[];
  mathematics: string[];
  general: string[];
}

const DistributionColorsArray: DistributionColors = {
  total: ['blue', 'lightblue'],
  naturalSciences: ['green', 'lightgreen'],
  humanities: ['#FBAED2', 'pink'],
  computerScience: ['red', '#EB6C6B'],
  mathematics: ['gold', 'yellow'],
  general: ['lightblue', 'azure'],
};

export const getColors = function (distribution: string): string[] | undefined {
  if (distribution === 'Total Credits') {
    return DistributionColorsArray.total;
  } else if (distribution === 'Natural Sciences') {
    return DistributionColorsArray.naturalSciences;
  } else if (distribution === 'Computer Science') {
    return DistributionColorsArray.computerScience;
  } else if (distribution === 'Humanities') {
    return DistributionColorsArray.humanities;
  } else if (distribution === 'Mathematics') {
    return DistributionColorsArray.mathematics;
  } else if (distribution === 'General Electives') {
    return DistributionColorsArray.general;
  }

  return undefined;
};
