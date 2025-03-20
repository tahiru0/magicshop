import { Product } from "@/context/CartContext";

export const products: Product[] = [
  // Grimoires Category
  {
    id: "grimoire-1",
    name: "Necronomicon Replica",
    price: "666 souls",
    numericPrice: 666,
    image: "/products/necronomicon.jpg",
    category: "grimoires",
    description: "Bound in human-like leather (synthetic, we assure you), this grimoire contains forbidden knowledge from beyond the veil. Each page is carefully aged and inscribed with ancient symbols said to be capable of awakening the Old Ones. \n\nWARNING: Do not read aloud past page 37 without proper containment circles. Not responsible for dimensional tears or spontaneous madness."
  },
  {
    id: "grimoire-2",
    name: "Codex of Forbidden Whispers",
    price: "482 souls",
    numericPrice: 482,
    image: "/products/codex.jpg",
    category: "grimoires",
    description: "Compiled by the mad sage Verelian during his 40-year isolation in the Obsidian Tower, this book contains whispers and secrets collected from entities beyond the stars. The pages seem to shift and move when not observed directly. \n\nIncludes 7 chapters on communing with beings from the Far Realm and summoning techniques considered unsafe by the Council of Arcane Safety."
  },
  {
    id: "grimoire-3",
    name: "The Midnight Pages",
    price: "333 souls",
    numericPrice: 333,
    image: "/products/midnight-pages.jpg",
    category: "grimoires",
    description: "Visible only between midnight and 3:33 AM, these enchanted pages reveal secrets of shadow manipulation and darkness binding. Perfect for those seeking to command the powers of the night or hide from prying ethereal eyes. \n\nThe book's contents vanish completely during daylight hours, making it extremely secure against unauthorized viewing. Includes a special binding that warms when nightfall approaches."
  },
  {
    id: "grimoire-4",
    name: "Elemental Chaos Compendium",
    price: "529 souls",
    numericPrice: 529,
    image: "/products/elemental-compendium.jpg",
    category: "grimoires",
    description: "Master all forms of elemental magic with this comprehensive guide to chaos magic. Written by the infamous Archmage Zephyrian, known for creating storms that lasted centuries and seas of flame that burn eternally. \n\nThe pages of this book constantly shift between different elemental states - some pages are perpetually damp, others warm to the touch, some flutter as if in constant wind, while others crumble and reform like earth."
  },

  // Artifacts Category
  {
    id: "artifact-1",
    name: "Eye of the Abyss",
    price: "1,789 souls",
    numericPrice: 1789,
    image: "/products/eye-abyss.jpg",
    category: "artifacts",
    description: "This crystalline orb pulses with dark energy harvested from the depths of the Abyssal Plane. Gaze too long and it will gaze back into you, revealing your deepest fears and desires. \n\nUseful for divination, scrying distant realms, or as an exceptionally macabre paperweight. Each Eye is unique, containing shadows and whispers particular to its creation process. \n\nSide effects may include: vivid nightmares, prophetic visions, feeling of being watched, and mild existential dread."
  },
  {
    id: "artifact-2",
    name: "Void-Touched Dagger",
    price: "1,250 souls",
    numericPrice: 1250,
    image: "/products/void-dagger.jpg",
    category: "artifacts",
    description: "Forged in the heart of a dying star, this blade cuts through more than mere flesh - it can sever magical bonds, cut through dimensional barriers, and slice into the ethereal plane. \n\nThe dagger never needs sharpening and seems to drink in light around its edges. The handle is wrapped in leather from an unknown creature and inscribed with runes that subtly change position when not observed. \n\nWARNING: Keep sheathed when not in use. May attract attention from entities beyond the veil."
  },
  {
    id: "artifact-3",
    name: "Chronos Pocket Watch",
    price: "2,450 souls",
    numericPrice: 2450,
    image: "/products/chronos-watch.jpg",
    category: "artifacts",
    description: "This ancient timepiece doesn't merely measure time - it can manipulate it within a localized field. Capable of slowing, accelerating, or briefly halting the flow of time for its bearer. \n\nThe face of the watch displays not only conventional time but also tracks lunar phases, planetary alignments, and ley line fluctuations. The gears inside appear to move in impossible ways, sometimes reversing or moving perpendicularly. \n\nNOTE: Excessive use may cause temporal disassociation and premature aging or de-aging. Not a toy."
  },
  {
    id: "artifact-4",
    name: "Mindreaver Crown",
    price: "3,333 souls",
    numericPrice: 3333,
    image: "/products/mindreaver-crown.jpg",
    category: "artifacts",
    description: "Once worn by the Thought Tyrant of the Seventh Realm, this obsidian crown enhances psychic abilities and allows for limited mind reading and mental domination. \n\nThe crown adjusts to fit any wearer and seems almost alive, with tendrils that occasionally shift and move against the skin. The central gem changes color based on the mental state of nearby beings. \n\nLimited to three uses per lunar cycle to prevent cerebral degradation. Extended use may cause personality blending with previous wearers."
  },
  
  // Potions Category
  {
    id: "potion-1",
    name: "Essence of Midnight",
    price: "87 souls",
    numericPrice: 87,
    image: "/products/midnight-essence.jpg",
    category: "potions",
    description: "This swirling black liquid seems to contain captured starlight within its depths. When consumed, it grants the ability to meld with shadows and move unseen for up to one hour. \n\nThe potion is cold to the touch no matter the ambient temperature and makes no sound when swirled in its bottle. Users report a sensation of weightlessness and euphoria, followed by an affinity with darkened spaces. \n\nWARNING: Avoid using during full moons, as effects become unpredictable and may result in temporary shadow transformation."
  },
  {
    id: "potion-2",
    name: "Phoenix Tears",
    price: "212 souls",
    numericPrice: 212,
    image: "/products/phoenix-tears.jpg",
    category: "potions",
    description: "Collected during the rebirth cycle of an actual phoenix, these luminescent tears have powerful healing properties. Can cure most physical ailments, regrow minor limbs, and provide fire resistance for 24 hours. \n\nThe liquid glows with an inner light and is warm to the touch. When exposed to open air, small flame-like wisps rise from the surface. \n\nSide effects include elevated body temperature, reddened skin tone, and occasional spontaneous light emission from the eyes for several days after consumption."
  },
  {
    id: "potion-3",
    name: "Memory Serum",
    price: "166 souls",
    numericPrice: 166,
    image: "/products/memory-serum.jpg",
    category: "potions",
    description: "This iridescent blue liquid allows the user to perfectly recall any memory from their past for a 12-hour period. Higher doses can access genetic memory from ancestors or, in rare cases, glimpse collective memories from the Akashic Records. \n\nThe potion smells different to each user, always evoking their most powerful childhood memory. The glass vial feels strangely familiar in the hand, as if you've held it countless times before. \n\nCAUTION: Some memories are buried for good reason. Not recommended for those with past trauma or who have undergone memory modification spells."
  },
  {
    id: "potion-4",
    name: "Liquid Nightmare",
    price: "97 souls",
    numericPrice: 97,
    image: "/products/liquid-nightmare.jpg",
    category: "potions",
    description: "When thrown, this viscous black potion creates a cloud of fear-inducing vapor that causes all who inhale it to experience their worst fears. Perfect for defense or clearing unwanted guests from your lair. \n\nThe liquid moves on its own within the bottle, sometimes forming shapes or faces that resemble those you know. Faint whispering can sometimes be heard emanating from the sealed container. \n\nEffect lasts 3-5 minutes for most beings. Not effective against constructs or the insane. Counter with Draught of Peace or Reality Anchor Charm (sold separately)."
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.slice(0, 3);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getAllCategories = (): string[] => {
  return [...new Set(products.map(product => product.category))];
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
