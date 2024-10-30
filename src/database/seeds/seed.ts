import { dataSource } from '../ConfigDB';
import { Item } from '../../entities/models/items';

const seedItems = async () => {
  const items = [
    { id: 1, name: 'Golden Figurine', type: 'Artifact', rarity: 'R4', source: 'Abandoned House Cellar' },
    { id: 2, name: 'Broken Thread', type: 'Material', rarity: 'R1', source: 'Training Chapel Lv.3' },
    { id: 3, name: 'Beast Bone', type: 'Material', rarity: 'R2', source: 'Abandoned Well on Hiddle Road' },
    { id: 4, name: 'Wolf Fur', type: 'Material', rarity: 'R3', source: 'Abandoned Well on Hiddle Road' },
    { id: 5, name: 'Onion Fragment', type: 'Material', rarity: 'R1', source: 'Small Cave Tomb Lv.10' },
    { id: 6, name: 'Black Thread', type: 'Material', rarity: 'R2', source: 'Hidell Catacombe II Depth Lv.20' },
    { id: 7, name: 'Magic Crystal', type: 'Artifact', rarity: 'R3', source: 'Hidell Catacombe II Inner Part Depth Lv.20' },
    { id: 8, name: 'Fire Fragment', type: 'Material', rarity: 'R3', source: 'The Ark Lv.18' },
    { id: 9, name: 'Animal Fur', type: 'Material', rarity: 'R1', source: 'The Ark Lv.18' },
    { id: 10, name: 'Water Stone', type: 'Material', rarity: 'R2', source: 'The Ark\'s Lower Level - Storage Lv.27' },
    { id: 11, name: 'Eternal Flame', type: 'Artifact', rarity: 'R4', source: 'Hidell Catacombe I Depth Lv.20' },
    { id: 12, name: 'Goddess Tear', type: 'Artifact', rarity: 'R3', source: 'Hunter\'s Secret Passage Lv.18' },
    { id: 13, name: 'Iron Ore', type: 'Material', rarity: 'R2', source: 'Abandoned House Cellar Lv.14' },
    { id: 14, name: 'Crystal Bone', type: 'Material', rarity: 'R3', source: 'Abandoned House Cellar Lv.14' },
    { id: 15, name: 'Old Skull', type: 'Material', rarity: 'R3', source: 'Abandoned House Cellar Lv.14' },
    { id: 16, name: 'Mushroom Spoor', type: 'Material', rarity: 'R2', source: 'Small Cave Tomb Lv.10' },
    { id: 17, name: 'Frozen Tear', type: 'Material', rarity: 'R2', source: 'Hidell Catacombe II Depth Lv.20' },
    { id: 18, name: 'Spirit Stone', type: 'Artifact', rarity: 'R4', source: 'Hidell Catacombe II Inner Part Depth Lv.20' },
    { id: 19, name: 'Wind Essence', type: 'Material', rarity: 'R2', source: 'The Ark Lv.18' },
    { id: 20, name: 'Light Fragment', type: 'Material', rarity: 'R1', source: 'The Ark Lv.18' },
    { id: 21, name: 'Unicorn Hair', type: 'Material', rarity: 'R3', source: 'The Ark\'s Lower Level - Treasure Lv.28' },
    { id: 22, name: 'Dragon Scale', type: 'Artifact', rarity: 'R4', source: 'Hidell Catacombe I Depth Lv.24' },
    { id: 23, name: 'Phoenix Feather', type: 'Artifact', rarity: 'R4', source: 'Hunter\'s Secret Passage Lv.18' },
    { id: 24, name: 'Sacred Gem', type: 'Artifact', rarity: 'R5', source: 'The Ark\'s Lower Level - Final Chest Lv.30' },
    { id: 25, name: 'Dark Matter', type: 'Material', rarity: 'R3', source: 'The Ark\'s Lower Level - Dangerous Area Lv.27' },
    { id: 26, name: 'Ancient Bone', type: 'Material', rarity: 'R2', source: 'Hunter\'s Secret Passage Lv.18' },
    { id: 27, name: 'Celestial Feather', type: 'Artifact', rarity: 'R5', source: 'The Ark\'s Lower Level - Treasure Lv.30' },
    { id: 28, name: 'Luminous Core', type: 'Artifact', rarity: 'R4', source: 'The Ark Lv.18' },
    { id: 29, name: 'Mystic Dust', type: 'Material', rarity: 'R1', source: 'Small Cave Tomb Lv.10' },
    { id: 30, name: 'Goblin Ear', type: 'Material', rarity: 'R2', source: 'Training Chapel Lv.3' }
  ];  

  await dataSource.initialize();
  const itemRepository = dataSource.getRepository(Item);

  for (const item of items) {
    const existingItem = await itemRepository.findOneBy({ id: item.id });
    if (!existingItem) {
      await itemRepository.save(item);
    }
  }

  console.log("Data seeding completed.");
};

export const runSeed = async () => {
  if (process.env.SEED_DATA === 'true') {
    await seedItems();
  }
};