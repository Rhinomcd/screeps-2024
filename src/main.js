import mine from "./roles/mine";

const debugLog = (/** @type {string} */ msg) => {
  console.log(`DEBUG: ${msg}`);
};

const getSpawn = () => {
  return Game.spawns.Spawn1;
};

const getCreepName = () => {
  const randomId = Math.random().toString(36).slice(-6);
  return `creep-${randomId}`;
};

const spawnCreep = (/** @type {StructureSpawn} */ spawn) => {
  const spawnStatus = spawn.spawnCreep([WORK, MOVE, CARRY], getCreepName());
  console.log(`spawnStatus: ${spawnStatus}`);
};

// @ts-ignore
module.exports.loop = () => {
  const CREEP_LIMIT = 3;
  const primarySpawn = getSpawn();
  if (Object.keys(Game.creeps).length < CREEP_LIMIT) {
    debugLog("should spawn creep");
    spawnCreep(primarySpawn);
  }
  if (primarySpawn.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
    debugLog("should mine");
    mine();
  } else {
    debugLog("should debug");
  }
};
