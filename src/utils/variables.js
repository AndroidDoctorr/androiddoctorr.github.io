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
    id: "html",
    proficiency: 5,
  },
  {
    name: "JavaScript",
    id: "js",
    proficiency: 5,
  },
  {
    name: "React",
    id: "react",
    proficiency: 5,
  },
  {
    name: "React-Native",
    id: "rn",
    proficiency: 5,
  },
  {
    name: "Java/Android",
    id: "java",
    proficiency: 5,
  },
  {
    name: "PHP/SQL",
    id: "php",
    proficiency: 4,
  },
  {
    name: "Python",
    id: "py",
    proficiency: 3,
  },
  {
    name: "Ruby",
    id: "ruby",
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
    id: "efa",
    url: "https://elevenfifty.org/",
    location: "Carmel, IN",
    points: [
      "Android and Java Immersion Classes",
    ],
  },
  {
    title: "Indiana University",
    id: "iu",
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
    id: "pu",
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
          id: "gs1",
          alt: "Code Similarity",
        },
        {
          source: require("../screenshots/turnitin/gradescope/code_similarity_index.png"),
          id: "gs2",
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
          id: "vc1",
          alt: "Assignment Page",
        },
        {
          source: require("../screenshots/vericite/vericite/vericite-reportloading.png"),
          id: "vc2",
          alt: "Report Loading",
        },
        {
          source: require("../screenshots/vericite/vericite/vericite-report.png"),
          id: "vc3",
          alt: "Report Page",
        },
        {
          source: require("../screenshots/vericite/vericite/vericite-settings.png"),
          id: "vc4",
          alt: "Settings Page",
        },
        {
          source: require("../screenshots/vericite/vericite/vericite-spanish.png"),
          id: "vc5",
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
          id: "do1",
          alt: "",
        },
        {
          source: require("../screenshots/efc/do/do2.png"),
          id: "do2",
          alt: "",
        },
        {
          source: require("../screenshots/efc/do/do3.png"),
          id: "do3",
          alt: "",
        },
        {
          source: require("../screenshots/efc/do/do4.png"),
          id: "do4",
          alt: "",
        },
        {
          source: require("../screenshots/efc/do/do5.png"),
          id: "do5",
          alt: "",
        },
        {
          source: require("../screenshots/efc/do/do6.png"),
          id: "do6",
          alt: "",
        },
      ],
    },
    {
      name: "HighPoint",
      images: [
        {
          source: require("../screenshots/efc/highpoint/highpoint1.png"),
          id: "hp1",
          alt: "",
        },
        {
          source: require("../screenshots/efc/highpoint/highpoint2.png"),
          id: "hp2",
          alt: "",
        },
        {
          source: require("../screenshots/efc/highpoint/highpoint3.png"),
          id: "hp3",
          alt: "",
        },
        {
          source: require("../screenshots/efc/highpoint/highpoint4.png"),
          id: "hp4",
          alt: "",
        },
      ],
    },
    {
      name: "Real Estate Vendor Fair",
      images: [
        {
          source: require("../screenshots/efc/revf/revf1.png"),
          id: "revf1",
          alt: "",
        },
        {
          source: require("../screenshots/efc/revf/revf2.png"),
          id: "revf2",
          alt: "",
        },
      ],
    },
    {
      name: "Brewery Map",
      images: [
        {
          source: require("../screenshots/efc/brewerymap/brewerymap1.png"),
          id: "bm1",
          alt: "Brewery Map",
        },
        {
          source: require("../screenshots/efc/brewerymap/brewerymap2.png"),
          id: "bm2",
          alt: "Brewery Map",
        },
        {
          source: require("../screenshots/efc/brewerymap/brewerymap3.png"),
          id: "bm3",
          alt: "Brewery Map",
        },
        {
          source: require("../screenshots/efc/brewerymap/brewerymap4.png"),
          id: "bm4",
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

export const colorThemes = {
  blue: {
    primary: "#1C4587",
    primaryDark: "#0A3154",
  },
  red: {
    primary: "#771111",
    primaryDark: "#551111",
  },
  green: {
    primary: "#114011",
    primaryDark: "#113311",
  },
}
