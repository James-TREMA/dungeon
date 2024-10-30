import { dataSource } from '../ConfigDB';
import { Item } from '../../entities/models/items';
import { Region } from '../../entities/models/regions';
import { Chest } from '../../entities/models/chests';
import { Location } from '../../entities/models/location';
import { Dungeon } from '../../entities/models/dungeons';
import { User } from '../../entities/models/users';

const seedData = async () => {
  await dataSource.initialize();

  // Supprime et réinitialise les tables avant le seeding
  const clearTables = async () => {
    const queryRunner = dataSource.createQueryRunner();
    console.log("Connexion au QueryRunner pour commencer la troncature des tables...");

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.query('TRUNCATE TABLE "dungeon_chests_chest" CASCADE');
      await queryRunner.query('TRUNCATE TABLE "dungeon_items_item" CASCADE');
      await queryRunner.query('TRUNCATE TABLE "dungeon" CASCADE');
      await queryRunner.query('TRUNCATE TABLE "chest" CASCADE');
      await queryRunner.query('TRUNCATE TABLE "item" CASCADE');
      await queryRunner.query('TRUNCATE TABLE "location" CASCADE');
      await queryRunner.query('TRUNCATE TABLE "region" CASCADE');
      await queryRunner.query('TRUNCATE TABLE "user" CASCADE');
      await queryRunner.query('ALTER SEQUENCE region_id_seq RESTART WITH 1');
      await queryRunner.query('ALTER SEQUENCE location_id_seq RESTART WITH 1');
      await queryRunner.query('ALTER SEQUENCE dungeon_id_seq RESTART WITH 1');
      await queryRunner.query('ALTER SEQUENCE chest_id_seq RESTART WITH 1');
      await queryRunner.query('ALTER SEQUENCE item_id_seq RESTART WITH 1');
      await queryRunner.query('ALTER SEQUENCE user_id_seq RESTART WITH 1');

      console.log("Tables tronquées et séquences réinitialisées.");
      await queryRunner.commitTransaction();
    } catch (error) {
      console.error("Erreur lors de la troncature des tables.");
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  };

  // Seeding des items
  const seedItems = async () => {
    const items = [
      { id: 1, name: 'Golden Figurine', type: 'Artifact', rarity: 'R4', source: 'Abandoned House Cellar' },
      { id: 2, name: 'Broken Thread', type: 'Material', rarity: 'R1', source: 'Training Chapel Lv.3' },
      { id: 3, name: 'Beast Bone', type: 'Material', rarity: 'R2', source: 'Abandoned Well on Hiddle Road' },
      { id: 4, name: 'Wolf Fur', type: 'Material', rarity: 'R3', source: 'Abandoned Well on Hiddle Road' },
      { id: 5, name: 'Animal Fur', type: 'Material', rarity: 'R1', source: 'The Ark Lv.18' },
      { id: 6, name: 'Onion Fragment', type: 'Material', rarity: 'R1', source: 'Small Cave Tomb Lv.10' },
      { id: 7, name: 'Black Thread', type: 'Material', rarity: 'R2', source: 'Hidell Catacombe II Depth Lv.20' },
      { id: 8, name: 'Magic Crystal', type: 'Artifact', rarity: 'R3', source: 'Hidell Catacombe II Inner Part Depth Lv.20' },
      { id: 9, name: 'Fire Fragment', type: 'Material', rarity: 'R3', source: 'The Ark Lv.18' },
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
      { id: 30, name: 'Goblin Ear', type: 'Material', rarity: 'R2', source: 'Training Chapel Lv.3' },
      { id: 31, name: 'Silver Thread', type: 'Material', rarity: 'R1', source: 'Abandoned House Cellar Lv.2' },
      { id: 32, name: 'Golden Horn', type: 'Artifact', rarity: 'R2', source: 'Hidell Catacombe II Depth Lv.25' },
      { id: 33, name: 'Rune Fragment', type: 'Material', rarity: 'R2', source: 'Small Cave Tomb Lv.6' },
      { id: 34, name: 'Bronze Shield Fragment', type: 'Material', rarity: 'R1', source: 'Ancient Ruins Lv.3' },
      { id: 35, name: 'Blue Crystal', type: 'Artifact', rarity: 'R4', source: 'The Ark Lv.20' },
      { id: 36, name: 'Green Emerald', type: 'Artifact', rarity: 'R4', source: 'Hunter\'s Secret Passage Lv.22' },
      { id: 37, name: 'Red Ruby', type: 'Artifact', rarity: 'R4', source: 'The Ark\'s Lower Level - Treasure Lv.28' },
      { id: 38, name: 'Yellow Topaz', type: 'Artifact', rarity: 'R4', source: 'Hidell Catacombe II Depth Lv.20' },
      { id: 39, name: 'Ancient Map', type: 'Artifact', rarity: 'R3', source: 'Abandoned Well on Hiddle Road' },
      { id: 40, name: 'Jasper Ornament Pin', type: 'Artifact', rarity: 'R4', source: 'Hidell Catacombe I Depth Lv.15' },
      { id: 41, name: 'Large Feather', type: 'Material', rarity: 'R1', source: 'Ancient Ruins Lv.1' },
      { id: 42, name: 'Bone Fragment', type: 'Material', rarity: 'R2', source: 'Small Cave Tomb Lv.12' },
      { id: 43, name: 'Sacred Stone', type: 'Artifact', rarity: 'R5', source: 'Hunter\'s Secret Passage Lv.18' },
      { id: 44, name: 'Herb Root', type: 'Material', rarity: 'R2', source: 'Training Chapel Lv.3' },
      { id: 45, name: 'Animal Bone', type: 'Material', rarity: 'R1', source: 'Ancient Ruins Lv.2' },
      { id: 46, name: 'Ancient Ring', type: 'Artifact', rarity: 'R3', source: 'Abandoned House Cellar Lv.7' },
      { id: 47, name: 'Engraved Amulet', type: 'Artifact', rarity: 'R3', source: 'The Ark Lv.18' },
      { id: 48, name: 'Cursed Ring', type: 'Artifact', rarity: 'R3', source: 'Hunter\'s Secret Passage Lv.10' },
      { id: 49, name: 'Dark Skull', type: 'Artifact', rarity: 'R4', source: 'The Ark Lower Level Lv.30' },
      { id: 50, name: 'Ancient Artifact', type: 'Artifact', rarity: 'R5', source: 'The Ark\'s Lower Level - Final Chest Lv.30' },
      { id: 51, name: 'Crystalized Tear', type: 'Material', rarity: 'R1', source: 'Hidell Catacombe II Depth Lv.16' },
      { id: 52, name: 'Demonic Essence', type: 'Material', rarity: 'R2', source: 'Ancient Ruins Lv.3' },
      { id: 53, name: 'Shadow Bone', type: 'Material', rarity: 'R2', source: 'Small Cave Tomb Lv.5' },
      { id: 54, name: 'Phantom Fragment', type: 'Artifact', rarity: 'R4', source: 'Hidell Catacombe I Depth Lv.12' },
      { id: 55, name: 'Fire Shard', type: 'Material', rarity: 'R3', source: 'Training Chapel Lv.5' },
      { id: 56, name: 'Ice Crystal', type: 'Material', rarity: 'R3', source: 'Ancient Ruins Lv.2' },
      { id: 57, name: 'Thunder Gem', type: 'Artifact', rarity: 'R4', source: 'Hidell Catacombe II Depth Lv.18' },
      { id: 58, name: 'Wind Shard', type: 'Material', rarity: 'R1', source: 'Ancient Ruins Lv.1' },
      { id: 59, name: 'Earth Fragment', type: 'Material', rarity: 'R2', source: 'Abandoned Well on Hiddle Road' },
      { id: 60, name: 'Golden Feather', type: 'Material', rarity: 'R3', source: 'Ancient Ruins Lv.5' },
      { id: 61, name: 'Moonlight Dust', type: 'Artifact', rarity: 'R5', source: 'The Ark Lower Level Lv.27' },
      { id: 62, name: 'Sun Stone', type: 'Artifact', rarity: 'R4', source: 'Hidell Catacombe I Depth Lv.24' },
      { id: 63, name: 'Mystic Cloak', type: 'Artifact', rarity: 'R3', source: 'The Ark Lv.18' },
      { id: 64, name: 'Enchanted Scroll', type: 'Artifact', rarity: 'R2', source: 'Training Chapel Lv.2' },
      { id: 65, name: 'Guardian Armor Fragment', type: 'Artifact', rarity: 'R5', source: 'Hidell Catacombe I Depth Lv.30' }
  ];
  

    const itemRepository = dataSource.getRepository(Item);
    for (const item of items) {
      await itemRepository.save(item);
    }
    console.log("Items ajoutés.");
  };

  // Seeding des régions
  const seedRegions = async () => {
    const regions = [
      { id: 1, name: 'Northern Mountains', description: 'A cold and harsh region with towering mountains.' },
      { id: 2, name: 'Abandoned House Cellar', description: 'A mysterious place filled with hidden dangers.' },
      { id: 3, name: 'Hidell Catacombe I Depth', description: 'The depths of Hidell Catacombs, echoing with whispers.' },
      { id: 4, name: 'Hidell Catacombe II Depth', description: 'A deeper part of the Hidell Catacombs.' },
      { id: 5, name: 'Hunter\'s Secret Passage', description: 'An old passage used by hunters, rich in rare finds.' },
      { id: 6, name: 'The Ark\'s Lower Level - Treasure', description: 'A treasure-filled level of the Ark, guarded by ancient magic.' },
      { id: 7, name: 'The Ark\'s Lower Level - Storage', description: 'Storage level in The Ark with ancient artifacts.' },
      { id: 8, name: 'Small Cave Tomb', description: 'A small tomb cave, often overlooked but rich in history.' },
      { id: 9, name: 'Training Chapel', description: 'A chapel used for training, containing basic resources.' },
    ];   

    const regionRepository = dataSource.getRepository(Region);
    for (const region of regions) {
      const existingRegion = await regionRepository.findOneBy({ id: region.id });
      if (!existingRegion) await regionRepository.save(region);
    }
    console.log("Régions ajoutées.");
  };

  // Seeding des coffres
  const seedChests = async () => {
    const chests = [
      { id: 1, name: 'Gold Chest', location: 'Abandoned House Cellar Lv.4' },
      { id: 2, name: 'Silver Chest', location: 'Hidell Catacombe I Depth Lv.10' },
      { id: 3, name: 'Mysterious Chest', location: 'The Ark\'s Lower Level - Treasure Lv.28' },
      { id: 4, name: 'Locked Chest', location: 'Hunter\'s Secret Passage Lv.15' },
      { id: 5, name: 'Common Chest', location: 'Training Chapel Lv.3' },
      { id: 6, name: 'Locked Chest (4)', location: 'Hidell Catacombe II Inner Part Depth Lv.20' },
      { id: 7, name: 'Crystal Chest', location: 'Hidell Catacombe II Depth Lv.16' },
      { id: 8, name: 'Final Chest', location: 'The Ark\'s Lower Level - Final Chest Lv.30' },
      { id: 9, name: 'Locked Chest (7)', location: 'Small Cave Tomb Lv.10' },
      { id: 10, name: 'Locked Chest (8)', location: 'Abandoned House Cellar Lv.14' },
      { id: 11, name: 'Locked Chest (9)', location: 'The Ark Lv.18' },
      { id: 12, name: 'Mysteries Thief\'s Mask', location: 'Final Chests' },
      { id: 13, name: 'Unregistered Mysterious Metal', location: 'Final Chests' },
      { id: 14, name: 'Ornament Ammo', location: 'Final Chests' }
    ];    

    const chestRepository = dataSource.getRepository(Chest);
    for (const chest of chests) {
      await chestRepository.save(chest);
    }
    console.log("Coffres ajoutés.");
  };

  // Seeding des localisations
  const seedLocations = async () => {
    const regionRepository = dataSource.getRepository(Region);
    const locationRepository = dataSource.getRepository(Location);

    const locations = [
      { id: 1, name: 'Ancient Ruins', regionId: 1 },
      { id: 2, name: 'Small Cave Tomb', regionId: 2 },
      { id: 3, name: 'Abandoned House Cellar', regionId: 3 },
      { id: 4, name: 'Training Chapel', regionId: 4 },
      { id: 5, name: 'Hidell Catacombe I Depth', regionId: 5 },
      { id: 6, name: 'Hidell Catacombe II Depth', regionId: 6 },
      { id: 7, name: 'Hunter\'s Secret Passage', regionId: 7 },
      { id: 8, name: 'The Ark Lower Level - Storage', regionId: 8 },
      { id: 9, name: 'The Ark Lower Level - Treasure', regionId: 9 },
      { id: 10, name: 'One Way Passage', regionId: 10 },
    ];    

    for (const loc of locations) {
      const region = await regionRepository.findOneBy({ id: loc.regionId });
      if (region) {
        const newLocation = locationRepository.create({ id: loc.id, name: loc.name, region });
        await locationRepository.save(newLocation);
      }
    }
    console.log("Localisations ajoutées.");
  };

  // Seeding des donjons
  const seedDungeons = async () => {
    const locationRepository = dataSource.getRepository(Location);
    const regionRepository = dataSource.getRepository(Region);
    const dungeonRepository = dataSource.getRepository(Dungeon);

    const dungeons = [
      { id: 1, name: 'Cavern of Mystery', entrance: 'Hidden path behind the waterfall', level: 3, locationId: 1, regionId: 1 },
      { id: 2, name: 'Ancient Catacombs', entrance: 'Beneath the old ruins', level: 5, locationId: 2, regionId: 1 },
      { id: 3, name: 'Lost Crypt', entrance: 'Behind the sacred temple', level: 7, locationId: 3, regionId: 2 },
      { id: 4, name: 'Forgotten Mines', entrance: 'Entrance through an abandoned mine shaft', level: 10, locationId: 4, regionId: 3 },
      { id: 5, name: 'Sunken Temple', entrance: 'Through the hidden swamp trail', level: 12, locationId: 5, regionId: 4 },
      { id: 6, name: 'Ruined Sanctuary', entrance: 'Hidden door under the cliff', level: 15, locationId: 6, regionId: 5 },
      { id: 7, name: 'Haunted Library', entrance: 'Broken archway in the woods', level: 18, locationId: 7, regionId: 6 },
      { id: 8, name: 'Necromancer\'s Lair', entrance: 'Secret staircase in old chapel', level: 20, locationId: 8, regionId: 7 },
      { id: 9, name: 'Infernal Pit', entrance: 'Cave behind the volcano', level: 22, locationId: 9, regionId: 8 },
      { id: 10, name: 'Dragon\'s Den', entrance: 'Pathway through thorny bushes', level: 25, locationId: 10, regionId: 9 },
    ];    

    for (const dung of dungeons) {
      const location = await locationRepository.findOneBy({ id: dung.locationId });
      const region = await regionRepository.findOneBy({ id: dung.regionId });
      if (location && region) {
        const newDungeon = dungeonRepository.create({ id: dung.id, name: dung.name, entrance: dung.entrance, level: dung.level, location, region });
        await dungeonRepository.save(newDungeon);
      }
    }
    console.log("Donjons ajoutés.");
  };

  // Seeding des utilisateurs
  const seedUsers = async () => {
    const userRepository = dataSource.getRepository(User);
    const users = [
      { username: 'AliceWanderer', email: 'alice@explorers.com', password: 'Wonderland@123' },
      { username: 'BobBuilder', email: 'bob@builders.net', password: 'Construct!456' },
      { username: 'CharlieCipher', email: 'charlie@codecrypt.com', password: 'Encrypt!789' },
      { username: 'DianaDynamo', email: 'diana@energy.co', password: 'PowerUp@2021' },
      { username: 'EveEcho', email: 'eve@echoverse.org', password: 'Reflect@Echo99' },
      { username: 'FrankForge', email: 'frank@metalworks.io', password: 'Iron@Craft44' },
      { username: 'GraceGravity', email: 'grace@spacemail.com', password: 'Astro@PhysX9' },
      { username: 'HankHacker', email: 'hank@cybermail.dev', password: 'HackMe!2020' },
      { username: 'IvyIllusion', email: 'ivy@illusions.org', password: 'Magic&Mirrors55' },
      { username: 'JackJungle', email: 'jack@wildsafari.com', password: 'LionHeart!30' },
      { username: 'LunaLight', email: 'luna@moonbase.io', password: 'Stars*Shine88' },
      { username: 'MaxMatrix', email: 'max@codingmatrix.com', password: 'CodeMaster@2022' },
      { username: 'NinaNimbus', email: 'nina@skywatchers.com', password: 'Cloud9#Sky' },
      { username: 'OscarOrbit', email: 'oscar@spacescapes.org', password: 'Galaxy@Spin' },
      { username: 'PamPixel', email: 'pam@digitalarts.com', password: 'Art4Ever!07' },
    ];

    for (const user of users) {
      const existingUser = await userRepository.findOneBy({ email: user.email });
      if (!existingUser) await userRepository.save(user);
    }
    console.log("Utilisateurs ajoutés.");
  };

  await clearTables();
  console.log("Tables tronquées, début du seeding...");
  
  await seedItems();
  await seedRegions();
  await seedChests();
  await seedLocations();
  await seedDungeons();
  await seedUsers();

  console.log("Data seeding terminé.");
};

export const runSeed = async () => {
  if (process.env.SEED_DATA === 'true') {
    seedData().catch(error => console.error("Erreur lors du seeding de la base de données :", error));
  }
};