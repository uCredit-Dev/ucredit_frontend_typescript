export interface requirement {
  title: string,
  progress: number,
  total: number,
  fulfilled: boolean,
  description: string,
  text: string,
}

export const emptyRequirement: requirement =
{
  title: "",
  progress: 0,
  total: 0,
  fulfilled: false,
  description: "",
  text: ""
}

export const testRequirements: requirement[] = [
  {
    title: "All",
    progress: 5,
    total: 6,
    fulfilled: true,
    description: "Should show all",
    text: ""
  },
  {
    title: "My Requirement 1",
    progress: 5,
    total: 6,
    fulfilled: true,
    description: "This is a demo requirement",
    text: "f"
  },
  {
    title: "My Requirement 2",
    progress: 2,
    total: 6,
    fulfilled: true,
    description: "This is a demo requirement",
    text: "t"
  },
  {
    title: "My Requirement 3",
    progress: 1,
    total: 4,
    fulfilled: true,
    description: "This is a demo requirement",
    text: "l"
  },
]