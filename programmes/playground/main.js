
module.exports.loop = function () {

    // 生产一个creep
    for (let spawn of Object.values(Game.spawns)) {
        if (!spawn.spawning && Object.values(Game.creeps).length === 0) {
            spawn.spawnCreep([TOUGH], 'guigui')
        }
    }

    const test_creep = Game.creeps['guigui']

    if (test_creep) {
        if (test_creep.ticksToLive === 1) {
            const res = test_creep.suicide()
            console.log('suicide res =', res)
        }
    }
}