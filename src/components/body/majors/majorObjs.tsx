// https://www.notion.so/512794b6cb3a42fa83d563adcef9b47c?v=5e54936e964b4af894e6bbe5c2894b1d
const objs: any[] = [
  {
    name: "B.S. in Computer Science (new)",
    generalDistributions: [
      { name: "Total Credits", required: 120 },
      { name: "Basic Sciences (N)", required: 8 },
      { name: "General Electives", required: 120 - 8 - 18 - 16 - 40 },
      { name: "Humanities/Social Sciences (H)(S)", required: 18 },
      { name: "Mathematics (Q)", required: 16 },
      { name: "Writing Intensive (WI)", required: 2 },
      { name: "Computer Science", required: 40 },
    ],
    fineRequirements: [
      {
        name: "fine1",
        description: "description",
        reqs:
          '"AS.110.202^AND^(^EN.550.310^OR^EN.553.211^OR^EN.553.310^OR^EN.553.311^OR^(^(^EN.550.420^OR^EN.553.420^)^AND^(^EN.550.430^OR^EN.553.430^OR^EN.553.431^)^)^OR^EN.560.348^)^AND^(^AS.110.201^OR^AS.110.212^OR^EN.553.291^)',
      },
    ],
    restrictions: [{ count: true, name: "Requirement Name", courses: [] }],
  },
];
export default objs;
