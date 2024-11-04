import { In } from 'typeorm';
import { dataSource } from '../ConfigDB';
import { Item } from '../../entities/models/items';
import { Region } from '../../entities/models/regions';
import { Chest } from '../../entities/models/chests';
import { Location } from '../../entities/models/location';
import { Dungeon } from '../../entities/models/dungeons';
import { User } from '../../entities/models/users';
import { Achievement } from '../../entities/models/achievements';

import getTranslation from '../../utils/translations';

const seedData = async () => {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }

  // Supprime et réinitialise les tables avant le seeding
  const clearTables = async () => {
    const queryRunner = dataSource.createQueryRunner();
    console.log(getTranslation("connexion_query_runner"));

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

      console.log(getTranslation("tables_truncated_reset"));
      await queryRunner.commitTransaction();
    } catch (error) {
      console.error(getTranslation("truncate_error")); // Erreur lors de la troncature des tables
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  };

  // Seeding des items
  const seedItems = async () => {
    const items = [
      { id: 1, name: getTranslation('golden_figurine'), type: 'Artifact', rarity: 'R4', source: getTranslation('abandoned_house_cellar') },
      { id: 2, name: getTranslation('broken_thread'), type: 'Material', rarity: 'R1', source: getTranslation('training_chapel_lv3') },
      { id: 3, name: getTranslation('beast_bone'), type: 'Material', rarity: 'R2', source: getTranslation('abandoned_well_on_hiddle_road') },
      { id: 4, name: getTranslation('wolf_fur'), type: 'Material', rarity: 'R3', source: getTranslation('abandoned_well_on_hiddle_road') },
      { id: 5, name: getTranslation('animal_fur'), type: 'Material', rarity: 'R1', source: getTranslation('the_ark_lv18') },
      { id: 6, name: getTranslation('onion_fragment'), type: 'Material', rarity: 'R1', source: getTranslation('small_cave_tomb_lv10') },
      { id: 7, name: getTranslation('black_thread'), type: 'Material', rarity: 'R2', source: getTranslation('hidell_catacombe_ii_depth_lv20') },
      { id: 8, name: getTranslation('magic_crystal'), type: 'Artifact', rarity: 'R3', source: getTranslation('hidell_catacombe_ii_inner_part_depth_lv20') },
      { id: 9, name: getTranslation('fire_fragment'), type: 'Material', rarity: 'R3', source: getTranslation('the_ark_lv18') },
      { id: 10, name: getTranslation('water_stone'), type: 'Material', rarity: 'R2', source: getTranslation('the_arks_lower_level_storage_lv27') },
      { id: 11, name: getTranslation('eternal_flame'), type: 'Artifact', rarity: 'R4', source: getTranslation('hidell_catacombe_i_depth_lv20') },
      { id: 12, name: getTranslation('goddess_tear'), type: 'Artifact', rarity: 'R3', source: getTranslation('hunters_secret_passage_lv18') },
      { id: 13, name: getTranslation('iron_ore'), type: 'Material', rarity: 'R2', source: getTranslation('abandoned_house_cellar_lv14') },
      { id: 14, name: getTranslation('crystal_bone'), type: 'Material', rarity: 'R3', source: getTranslation('abandoned_house_cellar_lv14') },
      { id: 15, name: getTranslation('old_skull'), type: 'Material', rarity: 'R3', source: getTranslation('abandoned_house_cellar_lv14') },
      { id: 16, name: getTranslation('mushroom_spoor'), type: 'Material', rarity: 'R2', source: getTranslation('small_cave_tomb_lv10') },
      { id: 17, name: getTranslation('frozen_tear'), type: 'Material', rarity: 'R2', source: getTranslation('hidell_catacombe_ii_depth_lv20') },
      { id: 18, name: getTranslation('spirit_stone'), type: 'Artifact', rarity: 'R4', source: getTranslation('hidell_catacombe_ii_inner_part_depth_lv20') },
      { id: 19, name: getTranslation('wind_essence'), type: 'Material', rarity: 'R2', source: getTranslation('the_ark_lv18') },
      { id: 20, name: getTranslation('light_fragment'), type: 'Material', rarity: 'R1', source: getTranslation('the_ark_lv18') },
      { id: 21, name: getTranslation('unicorn_hair'), type: 'Material', rarity: 'R3', source: getTranslation('the_arks_lower_level_treasure_lv28') },
      { id: 22, name: getTranslation('dragon_scale'), type: 'Artifact', rarity: 'R4', source: getTranslation('hidell_catacombe_i_depth_lv24') },
      { id: 23, name: getTranslation('phoenix_feather'), type: 'Artifact', rarity: 'R4', source: getTranslation('hunters_secret_passage_lv18') },
      { id: 24, name: getTranslation('sacred_gem'), type: 'Artifact', rarity: 'R5', source: getTranslation('the_arks_lower_level_final_chest_lv30') },
      { id: 25, name: getTranslation('dark_matter'), type: 'Material', rarity: 'R3', source: getTranslation('the_arks_lower_level_dangerous_area_lv27') },
      { id: 26, name: getTranslation('ancient_bone'), type: 'Material', rarity: 'R2', source: getTranslation('hunters_secret_passage_lv18') },
      { id: 27, name: getTranslation('celestial_feather'), type: 'Artifact', rarity: 'R5', source: getTranslation('the_arks_lower_level_treasure_lv30') },
      { id: 28, name: getTranslation('luminous_core'), type: 'Artifact', rarity: 'R4', source: getTranslation('the_ark_lv18') },
      { id: 29, name: getTranslation('mystic_dust'), type: 'Material', rarity: 'R1', source: getTranslation('small_cave_tomb_lv10') },
      { id: 30, name: getTranslation('goblin_ear'), type: 'Material', rarity: 'R2', source: getTranslation('training_chapel_lv3') },
      { id: 31, name: getTranslation('silver_thread'), type: 'Material', rarity: 'R1', source: getTranslation('abandoned_house_cellar_lv2') },
      { id: 32, name: getTranslation('golden_horn'), type: 'Artifact', rarity: 'R2', source: getTranslation('hidell_catacombe_ii_depth_lv25') },
      { id: 33, name: getTranslation('rune_fragment'), type: 'Material', rarity: 'R2', source: getTranslation('small_cave_tomb_lv6') },
      { id: 34, name: getTranslation('bronze_shield_fragment'), type: 'Material', rarity: 'R1', source: getTranslation('ancient_ruins_lv3') },
      { id: 35, name: getTranslation('blue_crystal'), type: 'Artifact', rarity: 'R4', source: getTranslation('the_ark_lv20') },
      { id: 36, name: getTranslation('green_emerald'), type: 'Artifact', rarity: 'R4', source: getTranslation('hunters_secret_passage_lv22') },
      { id: 37, name: getTranslation('red_ruby'), type: 'Artifact', rarity: 'R4', source: getTranslation('the_arks_lower_level_treasure_lv28') },
      { id: 38, name: getTranslation('yellow_topaz'), type: 'Artifact', rarity: 'R4', source: getTranslation('hidell_catacombe_ii_depth_lv20') },
      { id: 39, name: getTranslation('ancient_map'), type: 'Artifact', rarity: 'R3', source: getTranslation('abandoned_well_on_hiddle_road') },
      { id: 40, name: getTranslation('jasper_ornament_pin'), type: 'Artifact', rarity: 'R4', source: getTranslation('hidell_catacombe_i_depth_lv15') },
      { id: 41, name: getTranslation('large_feather'), type: 'Material', rarity: 'R1', source: getTranslation('ancient_ruins_lv1') },
      { id: 42, name: getTranslation('bone_fragment'), type: 'Material', rarity: 'R2', source: getTranslation('small_cave_tomb_lv12') },
      { id: 43, name: getTranslation('sacred_stone'), type: 'Artifact', rarity: 'R5', source: getTranslation('hunters_secret_passage_lv18') },
      { id: 44, name: getTranslation('herb_root'), type: 'Material', rarity: 'R2', source: getTranslation('training_chapel_lv3') },
      { id: 45, name: getTranslation('animal_bone'), type: 'Material', rarity: 'R1', source: getTranslation('ancient_ruins_lv2') },
      { id: 46, name: getTranslation('ancient_ring'), type: 'Artifact', rarity: 'R3', source: getTranslation('abandoned_house_cellar_lv7') },
      { id: 47, name: getTranslation('engraved_amulet'), type: 'Artifact', rarity: 'R3', source: getTranslation('the_ark_lv18') },
      { id: 48, name: getTranslation('cursed_ring'), type: 'Artifact', rarity: 'R3', source: getTranslation('hunters_secret_passage_lv10') },
      { id: 49, name: getTranslation('dark_skull'), type: 'Artifact', rarity: 'R4', source: getTranslation('the_ark_lower_level_lv30') },
      { id: 50, name: getTranslation('ancient_artifact'), type: 'Artifact', rarity: 'R5', source: getTranslation('the_arks_lower_level_final_chest_lv30') },
      { id: 51, name: getTranslation('crystallized_tear'), type: 'Material', rarity: 'R1', source: getTranslation('hidell_catacombe_ii_depth_lv16') },
      { id: 52, name: getTranslation('demonic_essence'), type: 'Material', rarity: 'R2', source: getTranslation('ancient_ruins_lv3') },
      { id: 53, name: getTranslation('shadow_bone'), type: 'Material', rarity: 'R2', source: getTranslation('small_cave_tomb_lv5') },
      { id: 54, name: getTranslation('phantom_fragment'), type: 'Artifact', rarity: 'R4', source: getTranslation('hidell_catacombe_i_depth_lv12') },
      { id: 55, name: getTranslation('fire_shard'), type: 'Material', rarity: 'R3', source: getTranslation('training_chapel_lv5') },
      { id: 56, name: getTranslation('ice_crystal'), type: 'Material', rarity: 'R3', source: getTranslation('ancient_ruins_lv2') },
      { id: 57, name: getTranslation('thunder_gem'), type: 'Artifact', rarity: 'R4', source: getTranslation('hidell_catacombe_ii_depth_lv18') },
      { id: 58, name: getTranslation('wind_shard'), type: 'Material', rarity: 'R1', source: getTranslation('ancient_ruins_lv1') },
      { id: 59, name: getTranslation('earth_fragment'), type: 'Material', rarity: 'R2', source: getTranslation('abandoned_well_on_hiddle_road') },
      { id: 60, name: getTranslation('golden_feather'), type: 'Material', rarity: 'R3', source: getTranslation('ancient_ruins_lv5') },
      { id: 61, name: getTranslation('moonlight_dust'), type: 'Artifact', rarity: 'R5', source: getTranslation('the_ark_lower_level_lv27') },
      { id: 62, name: getTranslation('sun_stone'), type: 'Artifact', rarity: 'R4', source: getTranslation('hidell_catacombe_i_depth_lv24') },
      { id: 63, name: getTranslation('mystic_cloak'), type: 'Artifact', rarity: 'R3', source: getTranslation('the_ark_lv18') },
      { id: 64, name: getTranslation('enchanted_scroll'), type: 'Artifact', rarity: 'R2', source: getTranslation('training_chapel_lv2') },
      { id: 65, name: getTranslation('guardian_armor_fragment'), type: 'Artifact', rarity: 'R5', source: getTranslation('hidell_catacombe_i_depth_lv30') }
    ];
    
    const itemRepository = dataSource.getRepository(Item);
    for (const item of items) {
      await itemRepository.save(item);
    }
    console.log(getTranslation("items_added")); // "Items ajoutés."
  };

  // Seeding des régions
  const seedRegions = async () => {
    const regions = [
      { id: 1, name: getTranslation('northern_mountains'), description: getTranslation('northern_mountains_desc') },
      { id: 2, name: getTranslation('abandoned_house_cellar'), description: getTranslation('abandoned_house_cellar_desc') },
      { id: 3, name: getTranslation('hidell_catacombe_i_depth'), description: getTranslation('hidell_catacombe_i_depth_desc') },
      { id: 4, name: getTranslation('hidell_catacombe_ii_depth'), description: getTranslation('hidell_catacombe_ii_depth_desc') },
      { id: 5, name: getTranslation('hunters_secret_passage'), description: getTranslation('hunters_secret_passage_desc') },
      { id: 6, name: getTranslation('arks_lower_level_treasure'), description: getTranslation('arks_lower_level_treasure_desc') },
      { id: 7, name: getTranslation('arks_lower_level_storage'), description: getTranslation('arks_lower_level_storage_desc') },
      { id: 8, name: getTranslation('small_cave_tomb'), description: getTranslation('small_cave_tomb_desc') },
      { id: 9, name: getTranslation('training_chapel'), description: getTranslation('training_chapel_desc') },
    ]; 

    const regionRepository = dataSource.getRepository(Region);
    for (const region of regions) {
      const existingRegion = await regionRepository.findOneBy({ id: region.id });
      if (!existingRegion) await regionRepository.save(region);
    }
    console.log(getTranslation("regions_added")); // "Régions ajoutées."
  };

  // Seeding des coffres
  const seedChests = async () => {
    const chests = [
      { id: 1, name: getTranslation('gold_chest'), location: getTranslation('abandoned_house_cellar_lv4') },
      { id: 2, name: getTranslation('silver_chest'), location: getTranslation('hidell_catacombe_i_depth_lv10') },
      { id: 3, name: getTranslation('mysterious_chest'), location: getTranslation('arks_lower_level_treasure_lv28') },
      { id: 4, name: getTranslation('locked_chest'), location: getTranslation('hunters_secret_passage_lv15') },
      { id: 5, name: getTranslation('common_chest'), location: getTranslation('training_chapel_lv3') },
      { id: 6, name: getTranslation('locked_chest_4'), location: getTranslation('hidell_catacombe_ii_inner_part_depth_lv20') },
      { id: 7, name: getTranslation('crystal_chest'), location: getTranslation('hidell_catacombe_ii_depth_lv16') },
      { id: 8, name: getTranslation('final_chest'), location: getTranslation('arks_lower_level_final_chest_lv30') },
      { id: 9, name: getTranslation('locked_chest_7'), location: getTranslation('small_cave_tomb_lv10') },
      { id: 10, name: getTranslation('locked_chest_8'), location: getTranslation('abandoned_house_cellar_lv14') },
      { id: 11, name: getTranslation('locked_chest_9'), location: getTranslation('the_ark_lv18') },
      { id: 12, name: getTranslation('mysteries_thiefs_mask'), location: getTranslation('final_chests') },
      { id: 13, name: getTranslation('unregistered_mysterious_metal'), location: getTranslation('final_chests') },
      { id: 14, name: getTranslation('ornament_ammo'), location: getTranslation('final_chests') }
    ];    

    const chestRepository = dataSource.getRepository(Chest);
    for (const chest of chests) {
      await chestRepository.save(chest);
    }
    console.log(getTranslation("chests_added")); // "Coffres ajoutés."
  };

  // Seeding des localisations
  const seedLocations = async () => {
    const regionRepository = dataSource.getRepository(Region);
    const locationRepository = dataSource.getRepository(Location);

    const locations = [
      { id: 1, name: getTranslation('ancient_ruins'), regionId: 1 },
      { id: 2, name: getTranslation('small_cave_tomb'), regionId: 2 },
      { id: 3, name: getTranslation('abandoned_house_cellar'), regionId: 3 },
      { id: 4, name: getTranslation('training_chapel'), regionId: 4 },
      { id: 5, name: getTranslation('hidell_catacombe_i_depth'), regionId: 5 },
      { id: 6, name: getTranslation('hidell_catacombe_ii_depth'), regionId: 6 },
      { id: 7, name: getTranslation('hunters_secret_passage'), regionId: 7 },
      { id: 8, name: getTranslation('arks_lower_level_storage'), regionId: 8 },
      { id: 9, name: getTranslation('arks_lower_level_treasure'), regionId: 9 },
      { id: 10, name: getTranslation('one_way_passage'), regionId: 10 },
    ];   

    for (const loc of locations) {
      const region = await regionRepository.findOneBy({ id: loc.regionId });
      if (region) {
        const newLocation = locationRepository.create({ id: loc.id, name: loc.name, region });
        await locationRepository.save(newLocation);
      }
    }
    console.log(getTranslation("locations_added")); // "Localisations ajoutées."
  };

  // Seeding des donjons
  const seedDungeons = async () => {
    const locationRepository = dataSource.getRepository(Location);
    const regionRepository = dataSource.getRepository(Region);
    const dungeonRepository = dataSource.getRepository(Dungeon);

    const dungeons = [
      { id: 1, name: getTranslation('cavern_of_mystery'), entrance: getTranslation('hidden_path_behind_waterfall'), level: 3, locationId: 1, regionId: 1 },
      { id: 2, name: getTranslation('ancient_catacombs'), entrance: getTranslation('beneath_old_ruins'), level: 5, locationId: 2, regionId: 1 },
      { id: 3, name: getTranslation('lost_crypt'), entrance: getTranslation('behind_sacred_temple'), level: 7, locationId: 3, regionId: 2 },
      { id: 4, name: getTranslation('forgotten_mines'), entrance: getTranslation('abandoned_mine_shaft'), level: 10, locationId: 4, regionId: 3 },
      { id: 5, name: getTranslation('sunken_temple'), entrance: getTranslation('hidden_swamp_trail'), level: 12, locationId: 5, regionId: 4 },
      { id: 6, name: getTranslation('ruined_sanctuary'), entrance: getTranslation('hidden_door_under_cliff'), level: 15, locationId: 6, regionId: 5 },
      { id: 7, name: getTranslation('haunted_library'), entrance: getTranslation('broken_archway_in_woods'), level: 18, locationId: 7, regionId: 6 },
      { id: 8, name: getTranslation('necromancers_lair'), entrance: getTranslation('secret_staircase_in_old_chapel'), level: 20, locationId: 8, regionId: 7 },
      { id: 9, name: getTranslation('infernal_pit'), entrance: getTranslation('cave_behind_volcano'), level: 22, locationId: 9, regionId: 8 },
      { id: 10, name: getTranslation('dragons_den'), entrance: getTranslation('pathway_through_thorny_bushes'), level: 25, locationId: 10, regionId: 9 },
    ];  

    for (const dung of dungeons) {
      const location = await locationRepository.findOneBy({ id: dung.locationId });
      const region = await regionRepository.findOneBy({ id: dung.regionId });
      if (location && region) {
        const newDungeon = dungeonRepository.create({ id: dung.id, name: dung.name, entrance: dung.entrance, level: dung.level, location, region });
        await dungeonRepository.save(newDungeon);
      }
    }
    console.log(getTranslation("dungeons_added")); // "Donjons ajoutés."
  };

  // Seeding des utilisateurs
  const seedUsers = async () => {
    const userRepository = dataSource.getRepository(User);
    const itemRepository = dataSource.getRepository(Item);
    const achievementRepository = dataSource.getRepository(Achievement);
    const dungeonRepository = dataSource.getRepository(Dungeon);
    const locationRepository = dataSource.getRepository(Location);
  
    // Charger et trier les donjons par niveau de difficulté
    const dungeons = await dungeonRepository.find();
    const sortedDungeons = dungeons.sort((a, b) => a.level - b.level);
  
    const users = [
      { id: 1, username: 'AliceWanderer', email: 'alice@explorers.com', password: 'Wonderland@123', rank: 12, gold: 350, inventory: [1, 7, 12], achievements: ['Explorer', 'PuzzleSolver'], currentLocationId: 4, lastDungeonId: 2, health: 95, energy: 80, skills: ['Stealth', 'Agility'], friends: [2, 5, 10], role: 'scout' },
      { id: 2, username: 'BobBuilder', email: 'bob@builders.net', password: 'Construct!456', rank: 9, gold: 250, inventory: [3, 8, 15], achievements: ['Craftsman', 'Fortifier'], currentLocationId: 3, lastDungeonId: 4, health: 100, energy: 60, skills: ['Strength', 'Engineering'], friends: [1, 3, 6], role: 'engineer' },
      { id: 3, username: 'CharlieCipher', email: 'charlie@codecrypt.com', password: 'Encrypt!789', rank: 15, gold: 500, inventory: [5, 11, 19], achievements: ['Codebreaker', 'Strategist'], currentLocationId: 2, lastDungeonId: 3, health: 85, energy: 70, skills: ['Hacking', 'Logic'], friends: [2, 4, 7], role: 'hacker' },
      { id: 4, username: 'DianaDynamo', email: 'diana@energy.co', password: 'PowerUp@2021', rank: 10, gold: 300, inventory: [6, 13, 18], achievements: ['PowerSurge', 'EnergyMaster'], currentLocationId: 1, lastDungeonId: 5, health: 90, energy: 95, skills: ['Electromagnetics', 'Energy Control'], friends: [3, 5, 8], role: 'technician' },
      { id: 5, username: 'EveEcho', email: 'eve@echoverse.org', password: 'Reflect@Echo99', rank: 8, gold: 200, inventory: [2, 9, 14], achievements: ['Sonic Explorer', 'Echo Master'], currentLocationId: 6, lastDungeonId: 1, health: 88, energy: 75, skills: ['Acoustics', 'Stealth'], friends: [1, 4, 6], role: 'scout' },
      { id: 6, username: 'FrankForge', email: 'frank@metalworks.io', password: 'Iron@Craft44', rank: 11, gold: 400, inventory: [10, 16, 20], achievements: ['IronWorker', 'Smithing Pro'], currentLocationId: 7, lastDungeonId: 4, health: 100, energy: 50, skills: ['Smithing', 'Strength'], friends: [2, 5, 9], role: 'warrior' },
      { id: 7, username: 'GraceGravity', email: 'grace@spacemail.com', password: 'Astro@PhysX9', rank: 14, gold: 550, inventory: [12, 18, 21], achievements: ['StarGazer', 'PhysicsMaster'], currentLocationId: 8, lastDungeonId: 3, health: 92, energy: 90, skills: ['Astrophysics', 'Gravity Control'], friends: [3, 6, 10], role: 'scientist' },
      { id: 8, username: 'HankHacker', email: 'hank@cybermail.dev', password: 'HackMe!2020', rank: 13, gold: 480, inventory: [1, 11, 17], achievements: ['DataMiner', 'Infiltrator'], currentLocationId: 2, lastDungeonId: 6, health: 80, energy: 85, skills: ['Coding', 'Hacking'], friends: [1, 4, 7], role: 'hacker' },
      { id: 9, username: 'IvyIllusion', email: 'ivy@illusions.org', password: 'Magic&Mirrors55', rank: 12, gold: 300, inventory: [14, 20, 23], achievements: ['Illusionist', 'MirrorMaster'], currentLocationId: 5, lastDungeonId: 2, health: 87, energy: 78, skills: ['Illusion', 'Charm'], friends: [2, 6, 10], role: 'mage' },
      { id: 10, username: 'JackJungle', email: 'jack@wildsafari.com', password: 'LionHeart!30', rank: 9, gold: 260, inventory: [3, 8, 22], achievements: ['BeastMaster', 'Survivor'], currentLocationId: 9, lastDungeonId: 5, health: 93, energy: 60, skills: ['Animal Taming', 'Survival'], friends: [5, 7, 9], role: 'ranger' },
      { id: 11, username: 'LunaLight', email: 'luna@moonbase.io', password: 'Stars*Shine88', rank: 16, gold: 700, inventory: [7, 13, 25], achievements: ['AstralWalker', 'LightWeaver'], currentLocationId: 10, lastDungeonId: 7, health: 96, energy: 100, skills: ['Light Magic', 'Astrology'], friends: [8, 10, 12], role: 'mage' },
      { id: 12, username: 'MaxMatrix', email: 'max@codingmatrix.com', password: 'CodeMaster@2022', rank: 14, gold: 500, inventory: [9, 18, 24], achievements: ['MatrixMaster', 'PuzzleSolver'], currentLocationId: 4, lastDungeonId: 8, health: 85, energy: 90, skills: ['Coding', 'Puzzle Solving'], friends: [7, 11, 13], role: 'programmer' },
      { id: 13, username: 'NinaNimbus', email: 'nina@skywatchers.com', password: 'Cloud9#Sky', rank: 11, gold: 320, inventory: [2, 15, 19], achievements: ['CloudShaper', 'StormChaser'], currentLocationId: 6, lastDungeonId: 2, health: 82, energy: 76, skills: ['Weather Control', 'Flight'], friends: [5, 12, 14], role: 'elementalist' },
      { id: 14, username: 'OscarOrbit', email: 'oscar@spacescapes.org', password: 'Galaxy@Spin', rank: 10, gold: 300, inventory: [6, 17, 21], achievements: ['GalaxyWatcher', 'OrbitMaster'], currentLocationId: 3, lastDungeonId: 3, health: 88, energy: 80, skills: ['Astrology', 'Celestial Mapping'], friends: [1, 11, 15], role: 'astronomer' },
      { id: 15, username: 'PamPixel', email: 'pam@digitalarts.com', password: 'Art4Ever!07', rank: 8, gold: 250, inventory: [4, 16, 22], achievements: ['PixelMaster', 'CreativeSoul'], currentLocationId: 7, lastDungeonId: 5, health: 90, energy: 85, skills: ['Art', 'Illusion'], friends: [6, 10, 13], role: 'artist' },
    ];  
  
    for (const user of users) {
      const existingUser = await userRepository.findOneBy({ email: user.email });
      if (!existingUser) {
        // Charger les objets d'inventaire et les amis
        const inventory = await itemRepository.findByIds(user.inventory);
        const friends = await userRepository.findByIds(user.friends);
  
        // Charger les achievements
        const achievements = await achievementRepository.find({
          where: { title: In(user.achievements) },
        });
  
        // Assigner une localisation par défaut si la localisation spécifiée est absente
        let currentLocation: Location | undefined = undefined;
        if (user.currentLocationId) {
          currentLocation = await locationRepository.findOneBy({ id: user.currentLocationId }) || undefined;
        }
        if (!currentLocation) {
          currentLocation = await locationRepository.findOne({
            where: {},  // Utilise une condition vide pour indiquer que vous voulez obtenir le premier élément
            order: { id: 'ASC' }
          }) || undefined;          
        }        

        // Assigner un donjon en fonction du rank
        const assignedDungeon = sortedDungeons.reverse().find(dungeon => dungeon.level <= user.rank) || sortedDungeons[0];
  
        // Créer le nouvel utilisateur avec la localisation et le donjon assignés
        const newUser = userRepository.create({
          ...user,
          inventory: inventory as any, // Évite le conflit de types avec `inventory`
          friends,
          achievements,
          currentLocation,
          lastDungeon: assignedDungeon,  // Attribue le donjon en fonction du rank
        });
  
        await userRepository.save(newUser);
      }
    }  
    console.log(getTranslation("users_added")); // "Utilisateurs ajoutés avec des donjons et localisations adaptés au rank."
  };
  
  await clearTables();
  console.log(getTranslation("seeding_start")); // Début du seeding...
    
  await seedItems();
  await seedRegions();
  await seedChests();
  await seedLocations();
  await seedDungeons();
  await seedUsers();

  console.log(getTranslation("seeding_complete")); // Data seeding terminé.
};

export const runSeed = async () => {
  if (process.env.SEED_DATA === 'true') {
    seedData().catch(error => console.error("Erreur lors du seeding de la base de données :", error));
  }
};