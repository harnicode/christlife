export interface ServiceTime {
  day: string;
  time: string;
  name: string;
  description: string;
}

export interface MonthlyProgram {
  name: string;
  schedule: string;
  time: string;
  description: string;
}

export interface ChurchInfo {
  name: string;
  tagline: string;
  services: {
    weekly: ServiceTime[];
  };
  programs: {
    monthly: MonthlyProgram[];
  };
  contact: {
    phones: string[];
    email: string;
  };
  location: {
    address: string;
    city: string;
    country: string;
    digitalCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  social: {
    facebook: string;
    instagram: string;
    youtube: string;
  };
}

export const churchInfo: ChurchInfo = {
  name: "ChristLife City Cathedral",
  tagline:
    "A place where faith comes alive, community thrives, and lives are transformed",

  services: {
    weekly: [
      {
        day: "Sunday",
        time: "8:00 AM - 10:30 AM",
        name: "Kingdom Family Chapel",
        description: "Main worship service with powerful praise and worship",
      },
      {
        day: "Wednesday",
        time: "6:00 PM - 8:00 PM",
        name: "Christology Family Chapel",
        description: "Midweek service focused on biblical teaching",
      },
      {
        day: "Friday",
        time: "6:00 PM - 8:00 PM",
        name: "LifeCity School of Ministry",
        description: "Training and equipping believers for ministry",
      },
    ],
  },

  programs: {
    monthly: [
      {
        name: "Half Night",
        schedule: "Last Friday of every month",
        time: "6:00 PM - 12:00 AM",
        description: "Extended worship, prayer, and spiritual breakthrough",
      },
      {
        name: "Emerge",
        schedule: "First Saturday of every month",
        time: "7:00 AM - 11:00 AM",
        description: "Morning gathering for fellowship and spiritual growth",
      },
    ],
  },

  contact: {
    phones: ["+233543737535", "+233244125872"],
    email: "info@christlifecathedral.org",
  },

  location: {
    address: "Teshie Paris villa opposite umbrella park",
    city: "Accra",
    country: "Ghana",
    digitalCode: "GZ 130 1286",
    coordinates: {
      lat: 5.6037,
      lng: -0.187,
    },
  },

  social: {
    facebook: "https://facebook.com/christlifecathedral",
    instagram: "https://instagram.com/christlifecathedral",
    youtube: "https://youtube.com/@christlifecathedral",
  },
};
