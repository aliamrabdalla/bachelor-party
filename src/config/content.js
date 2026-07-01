// Single source of truth for visitor-facing content and the countdown date.

export const PARTY_START = "2026-07-31T15:00:00-04:00";

export const SITE = {
  title: "Youssef's Bachelor Weekend",
  subtitle: "Scroll to wander the weekend",
};

export const SECTIONS = [
  {
    key: "couple",
    label: "The Groom & His Bride",
    accent: "#c2453f",
    shell: {
      floor: "#8b3d32",
    },
    panel: {
      heading: "Youssef & Gabi",
      body: "The weekend starts with the reason everyone is gathering: celebrating Youssef, Gabi, and the next chapter. The wall calendar marks the August 7 wedding date with the July 31-August 2 bachelor weekend highlighted right before it.",
      facts: [
        "Groom: Youssef",
        "Bride: Gabi",
        "Wedding date: August 7, 2026",
        "Bachelor weekend: July 31-August 2, 2026",
        "Memory cards: how they met, favorite stories, and advice for married life",
      ],
    },
  },
  {
    key: "airbnb",
    label: "The Airbnb",
    accent: "#3f7cc2",
    shell: {
      floor: "#587a42",
    },
    panel: {
      heading: "Home Base in Davison",
      body: "Check in July 31 at 3:00 PM and settle into the Davison home base through August 2 at 10:00 AM. The house is the anchor for the weekend: a place to land, fish, reset, and get everyone moving together.",
      facts: [
        "Address: 4353 North Irish Road, Davison, MI 48423",
        "Check-in: July 31, 2026 at 3:00 PM",
        "Checkout: August 2, 2026 at 10:00 AM",
        "Drive: about one hour from Birmingham / Southfield",
        "Quiet hours: 11:00 PM-7:00 AM",
        "Pond: catch-and-release fishing; poles provided; swim at your own risk",
        "Before checkout: towels to laundry, trash to the garage bin",
      ],
      actions: [
        {
          label: "Add Yourself to the Airbnb",
          href: "https://www.airbnb.com/l/TSnV4z6P?s=67&unique_share_id=38b2c422-b911-47e9-a68d-60705937b4db",
        },
      ],
    },
  },
  {
    key: "activities",
    label: "The Weekend",
    accent: "#e0a43b",
    shell: {
      floor: "#6c7f3e",
    },
    panel: {
      heading: "Boat, Brisket, Games, Fire",
      body: "Saturday is built around an outdoors-heavy bachelor-party day: Holloway Reservoir in the morning, a three-place brisket tasting, lawn-game field day, and a relaxed fireplace hangout at night.",
      facts: [
        "Boat morning: Holloway Reservoir",
        "Food: three-place brisket tasting",
        "Competition: seven-person ranking and judging",
        "Field day: Spikeball, cones, volleyball, and open grass",
        "Night: fireplace hangout with chairs and string lights",
      ],
    },
  },
  {
    key: "packing",
    label: "Get Ready",
    accent: "#4c9e5a",
    shell: {
      floor: "#4b6f41",
    },
    panel: {
      heading: "Pack by Moment",
      body: "Use this as the practical packing list: Friday arrival basics first, Saturday boat gear next, field-day clothes after that, then night-fire and entertainment items so nothing gets duplicated or forgotten.",
      facts: [
        "Friday basics: duffel, casual clothes, sleepwear, toiletries, phone charger, wallet, medications",
        "Boat morning: swimsuit or wet clothes, towel, sunscreen, sunglasses, hat, water bottle, sandals or water shoes",
        "Field day: athletic shirt and shorts, sneakers, socks, bug spray, small day bag",
        "Night and fire: hoodie, light jacket, comfortable pants, blanket, optional camp chair",
        "Entertainment: one Xbox setup and one Nintendo Switch for downtime at the house",
      ],
    },
  },
];
