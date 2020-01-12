export const randomFacts = [
  "In college, I wrote a MATLAB script that can solve any Sudoku puzzle",
  "In college, I wrote a Visual Basic program that simulates battles for the game Axis and Allies and calculates the odds of victory with expected losses",
  "In high school, I programmed PONG in Basic on my TI-86 graphing calculator",
  "I once programmed robots to build houses using Lua in Minecraft",
  "I once emulated TCP/IP protocol and encryption using Lua in Minecraft",
  "I once emulated Duck Hunt for NES on MIT’s Scratch.org as an example for my 5th and 7th grade technology students",
  "I make react-native apps in my spare time for my own convenience and practice",
];

export const languages = [
  {
    name: "HTML/CSS",
    proficiency: 5,
  },
  {
    name: "JavaScript",
    proficiency: 5,
  },
  {
    name: "React",
    proficiency: 5,
  },
  {
    name: "React-Native",
    proficiency: 5,
  },
  {
    name: "Java/Android",
    proficiency: 5,
  },
  {
    name: "PHP/SQL",
    proficiency: 4,
  },
  {
    name: "Python",
    proficiency: 3,
  },
  {
    name: "Ruby",
    proficiency: 2,
  },
];

export const experiences = [
  {
    dates: "2018-2020",
    title: "Software Engineer",
    company: "Turnitin LLC",
    id: "turnitin",
    url: "https://www.turnitin.com/",
    location: "Oakland, CA",
    points: [
      "Integrated Code Similarity into Gradescope",
      "Developed plagiarism detection front-end",
      "Implemented SMACSS architecture",
      "Implemented testing using rspec/capybara",
    ],
  },
  {
    dates: "2016-2018",
    title: "Software Engineer",
    company: "VeriCite LLC",
    id: "vericite",
    url: "https://www.vericite.com/",
    location: "Fishers, IN",
    points: [
      "Built entire front end, twice",
      "Some back-end development (Java, AWS Lambda)",
      "Taught myself React",
      "Worked with Blink UX to refine the UI",
      "Acquired by Turnitin in 2018",
    ],
  },
  {
    dates: "2015-2016",
    title: "Apprentice Coder",
    company: "Eleven Fifty Consulting",
    id: "efc",
    url: "https://www.linkedin.com/company/eleven-fifty-consulting/",
    location: "Carmel, IN",
    points: [
      "Developed sites in PHP/SQL (self-taught)",
      "Developed Android apps",
    ],
  },
  {
    dates: "2014-2015",
    title: "Middle School Teacher",
    company: "The Orchard School",
    id: "orchard",
    url: "https://www.orchard.org/",
    location: "Indianapolis, IN",
    points: [
      "Technology 5th and 7th",
      "Math 6th and 8th",
      "Lead Math and Science Clubs",
      "Coached LEGO robotics team",
    ],
  },
];

export const educations = [
  {
    title: "Eleven Fifty Coding Academy",
    url: "https://elevenfifty.org/",
    location: "Carmel, IN",
    points: [
      "Android and Java Immersion Classes",
    ],
  },
  {
    title: "Indiana University",
    url: "https://indiana.edu/index.html",
    location: "Indianapolis, IN",
    points: [
      "BS in Physics",
      "Dean’s list - Straight A's in Physics Classes",
      "Math minor",
    ],
  },
  {
    title: "Purdue University",
    url: "https://www.purdue.edu/",
    location: "West Lafayette, IN",
    points: [
      "Aerospace Engineering",
    ],
  },
];

export const projectList = {
  turnitin: [
    {
      name: "Gradescope",
      images: [
        {
          source: require("../screenshots/turnitin/gradescope/code_similarity.png"),
          alt: "Code Similarity",
        },
        {
          source: require("../screenshots/turnitin/gradescope/code_similarity_index.png"),
          alt: "Code Similarity Index",
        },
      ],
    },
  ],
  vericite: [
    {
      name: "VeriCite",
      images: [
        {
          source: require("../screenshots/vericite/vericite/vericite-assignments.png"),
          alt: "Assignment Page",
        },
        {
          source: require("../screenshots/vericite/vericite/vericite-reportloading.png"),
          alt: "Report Loading",
        },
        {
          source: require("../screenshots/vericite/vericite/vericite-report.png"),
          alt: "Report Page",
        },
        {
          source: require("../screenshots/vericite/vericite/vericite-settings.png"),
          alt: "Settings Page",
        },
        {
          source: require("../screenshots/vericite/vericite/vericite-spanish.png"),
          alt: "Users Page (en Español)",
        },
      ],
    },
  ],
  efc: [
    {
      name: "Do",
      images: [
        {
          source: require("../screenshots/efc/do/do1.png"),
          alt: "",
        },
        {
          source: require("../screenshots/efc/do/do2.png"),
          alt: "",
        },
        {
          source: require("../screenshots/efc/do/do3.png"),
          alt: "",
        },
        {
          source: require("../screenshots/efc/do/do4.png"),
          alt: "",
        },
        {
          source: require("../screenshots/efc/do/do5.png"),
          alt: "",
        },
        {
          source: require("../screenshots/efc/do/do6.png"),
          alt: "",
        },
      ],
    },
    {
      name: "HighPoint",
      images: [
        {
          source: require("../screenshots/efc/highpoint/highpoint1.png"),
          alt: "",
        },
        {
          source: require("../screenshots/efc/highpoint/highpoint2.png"),
          alt: "",
        },
        {
          source: require("../screenshots/efc/highpoint/highpoint3.png"),
          alt: "",
        },
        {
          source: require("../screenshots/efc/highpoint/highpoint4.png"),
          alt: "",
        },
      ],
    },
    {
      name: "Real Estate Vendor Fair",
      images: [
        {
          source: require("../screenshots/efc/revf/revf1.png"),
          alt: "",
        },
        {
          source: require("../screenshots/efc/revf/revf2.png"),
          alt: "",
        },
      ],
    },
    {
      name: "Brewery Map",
      images: [
        {
          source: require("../screenshots/efc/brewerymap/brewerymap1.png"),
          alt: "Brewery Map",
        },
        {
          source: require("../screenshots/efc/brewerymap/brewerymap2.png"),
          alt: "Brewery Map",
        },
        {
          source: require("../screenshots/efc/brewerymap/brewerymap3.png"),
          alt: "Brewery Map",
        },
        {
          source: require("../screenshots/efc/brewerymap/brewerymap4.png"),
          alt: "Brewery Map",
        },
      ],
    },
  ],
  orchard: [
    {
      name: "",
      images: [
      ],
    },
  ],
};
