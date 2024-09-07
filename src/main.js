const debugLog = (msg) => {
  console.log(`DEBUG: ${msg}`);
};
const getSpawn = () => {
  return Game.spawns.Spawn1;
};

const mine = () => {
  const HARVEST_SUCCESS = 0;
  for (const key of Object.keys(Game.creeps)) {
    const creep = Game.creeps[key];

    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
      const primarySpawn = getSpawn();
      if (creep.transfer(primarySpawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(primarySpawn.pos);
      }
      break;
    }

    if (creep.memory.assignedSource === undefined) {
      creep.memory.assignedSource =
        creep.pos.findClosestByRange(FIND_SOURCES).id;
    }

    const energySource = Game.getObjectById(creep.memory.assignedSource);
    const harvestPosition = energySource.pos;
    const harvestStatus = creep.harvest(energySource);

    if (harvestStatus !== HARVEST_SUCCESS) {
      console.log(`harvestStatus: ${harvestStatus} creepName ${creep.name}`);
      creep.moveTo(harvestPosition);
    }
  }
};

const getCreepName = () => {
  const randomId = Math.random().toString(36).slice(-6);
  return `creep-${randomId}`;
};

const spawnCreep = (/** @type {StructureSpawn} */ spawn) => {
  const spawnStatus = spawn.spawnCreep([WORK, MOVE, CARRY], getCreepName());
  console.log(`spawnStatus: ${spawnStatus}`);
};

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
