import { dataSource } from '../ConfigDB';
import { Item } from '../../entities/models/items';
import { Region } from '../../entities/models/regions';
import { Chest } from '../../entities/models/chests';
import { Location } from '../../entities/models/location';
import { Dungeon } from '../../entities/models/dungeons';
import { User } from '../../entities/models/users';

const seedData = async () => {
  await dataSource.initialize();

  // Fonction pour vider les tables
  const clearTables = async () => {
    const queryRunner = dataSource.createQueryRunner();
  
    console.log("Connexion au QueryRunner pour commencer la troncature des tables...");
  
    await queryRunner.connect();
    await queryRunner.startTransaction();
  
    try {
      console.log("Tronçage de la table 'dungeon_chests_chest'...");
      await queryRunner.query('TRUNCATE TABLE "dungeon_chests_chest" CASCADE');
      
      console.log("Tronçage de la table 'dungeon_items_item'...");
      await queryRunner.query('TRUNCATE TABLE "dungeon_items_item" CASCADE');
      
      console.log("Tronçage de la table 'dungeon'...");
      await queryRunner.query('TRUNCATE TABLE "dungeon" CASCADE');
      
      console.log("Tronçage de la table 'chest'...");
      await queryRunner.query('TRUNCATE TABLE "chest" CASCADE');
      
      console.log("Tronçage de la table 'item'...");
      await queryRunner.query('TRUNCATE TABLE "item" CASCADE');
      
      console.log("Tronçage de la table 'location'...");
      await queryRunner.query('TRUNCATE TABLE "location" CASCADE');
      
      console.log("Tronçage de la table 'region'...");
      await queryRunner.query('TRUNCATE TABLE "region" CASCADE');
      
      console.log("Tronçage de la table 'user'...");
      await queryRunner.query('TRUNCATE TABLE "user" CASCADE');
  
      // Réinitialisation des séquences d'auto-incrémentation
      console.log("Réinitialisation des séquences d'auto-incrémentation...");
      await queryRunner.query('ALTER SEQUENCE region_id_seq RESTART WITH 1');
      await queryRunner.query('ALTER SEQUENCE location_id_seq RESTART WITH 1');
      await queryRunner.query('ALTER SEQUENCE dungeon_id_seq RESTART WITH 1');
      await queryRunner.query('ALTER SEQUENCE chest_id_seq RESTART WITH 1');
      await queryRunner.query('ALTER SEQUENCE item_id_seq RESTART WITH 1');
      await queryRunner.query('ALTER SEQUENCE user_id_seq RESTART WITH 1');
  
      console.log("Toutes les tables ont été tronquées et les séquences réinitialisées avec succès. Validation de la transaction...");
      await queryRunner.commitTransaction();
      
      console.log("Transaction de troncature terminée avec succès.");
    } catch (error) {
      console.error("Erreur lors de la troncature des tables. Annulation de la transaction...");
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
      console.log("QueryRunner libéré.");
    }
  };
  
  
  // Fonction pour insérer les items dans la base de données
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
  
    const itemRepository = dataSource.getRepository(Item);
    for (const item of items) {
      await itemRepository.save(item);
    }
    console.log("Items seeding completed.");
  };

  // Fonction pour insérer les régions dans la base de données
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
      { id: 9, name: 'Training Chapel', description: 'A chapel used for training, containing basic resources.' }
    ];
  
    const regionRepository = dataSource.getRepository(Region);

    for (const region of regions) {
      const existingRegion = await regionRepository.findOneBy({ id: region.id });
      if (!existingRegion) {
        await regionRepository.save(region);
        console.log(`Région ajoutée : ${region.name}`);
      } else {
        console.log(`Région déjà existante : ${region.name}`);
      }
    }
  
    // Afficher toutes les régions après insertion
    const allRegions = await regionRepository.find();
    console.log("Régions actuelles en base de données :");
    allRegions.forEach((region) => {
      console.log(`- ID: ${region.id}, Nom: ${region.name}`);
    });
  
    console.log("Regions seeding completed.");
  }

  // Fonction pour insérer les coffres dans la base de données
  const seedChests = async () => {
    const chests = [
      { id: 1, name: 'Gold Chest', location: 'Abandoned House Cellar Lv.4' },
      { id: 2, name: 'Silver Chest', location: 'Hidell Catacombe I Depth Lv.10' },
      { id: 3, name: 'Mysterious Chest', location: 'The Ark\'s Lower Level - Treasure Lv.28' },
      { id: 4, name: 'Locked Chest', location: 'Hunter\'s Secret Passage Lv.15' },
      { id: 5, name: 'Common Chest', location: 'Training Chapel Lv.3' },
      { id: 6, name: 'Locked Chest (4)', location: 'Hidell Catacombe II Inner Part Depth Lv.20' },
      { id: 7, name: 'Crystal Chest', location: 'Hidell Catacombe II Depth Lv.16' },
      { id: 8, name: 'Final Chest', location: 'The Ark\'s Lower Level - Final Chest Lv.30' }
      // Ajoute d'autres coffres selon la liste de la photo
    ];
  
    const chestRepository = dataSource.getRepository(Chest);
    for (const chest of chests) {
      await chestRepository.save(chest);
    }
    console.log("Chests seeding completed.");
  };

  // Fonction pour insérer les localisations dans la base de données
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
      { id: 10, name: 'One Way Passage', regionId: 10 }
    ];
  
    for (const loc of locations) {
      // Vérification si la région existe pour chaque location
      const region = await regionRepository.findOneBy({ id: loc.regionId });
      if (region) {
        console.log(`Région trouvée pour location ${loc.name} : Région ID ${loc.regionId} - ${region.name}`);
        
        // Création et sauvegarde de la localisation avec la région associée
        const newLocation = locationRepository.create({ id: loc.id, name: loc.name, region });
        await locationRepository.save(newLocation);
        console.log(`Location ajoutée : ${loc.name} avec région ${region.name}`);
      } else {
        console.error(`Erreur : Région ID ${loc.regionId} introuvable pour la location ${loc.name}`);
      }
    }
    console.log("Locations seeding completed.");
  };

  // Fonction pour insérer les donjons dans la base de données
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
      // Ajoute d'autres donjons selon les données de l'image
    ];
  
    for (const dung of dungeons) {
      const location = await locationRepository.findOneBy({ id: dung.locationId });
      const region = await regionRepository.findOneBy({ id: dung.regionId });
      if (location && region) {
        const newDungeon = dungeonRepository.create({
          id: dung.id,
          name: dung.name,
          entrance: dung.entrance,
          level: dung.level,
          location,
          region
        });
        await dungeonRepository.save(newDungeon);
        console.log(`Dungeon ajouté : ${dung.name} avec location ID ${dung.locationId} et région ID ${dung.regionId}`);
      } else {
        console.error(`Échec de l'ajout de dungeon : ${dung.name}. Location ID ${dung.locationId} ou Région ID ${dung.regionId} non trouvée.`);
      }
    }
    console.log("Dungeons seeding completed.");
  };

  // Fonction pour insérer des utilisateurs dans la base de données
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
      if (!existingUser) {
        await userRepository.save(user);
        console.log(`Utilisateur ajouté : ${user.username}`);
      } else {
        console.log(`Utilisateur existant : ${user.username}`);
      }
    }
  
    console.log("Users seeding completed.");
  };


  // Exécution de toutes les fonctions de seeding avec suppression préalable
  await clearTables();
  console.log("Tables tronquées, début du seeding...");
  
  await seedItems();   // Insère les items
  await seedRegions(); // Insère les régions
  await seedChests();  // Insère les coffres
  await seedLocations(); // Insère les localisations (dépend des régions)
  await seedDungeons();  // Insère les donjons (dépend des localisations et des régions)
  await seedUsers();

  console.log("Data seeding completed.");
};

// Exécution principale contrôlée par la variable d'environnement SEED_DATA
export const runSeed = async () => {
  if (process.env.SEED_DATA === 'true') {
    seedData().catch(error => console.error("Error seeding database:", error));
  }
};