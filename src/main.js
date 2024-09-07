export function loop() {
	console.log("hello screeps");
  console.log(getSpawn().isActive());
}

const getSpawn = () => {
	return Game.spawns.Spawn1;
};
