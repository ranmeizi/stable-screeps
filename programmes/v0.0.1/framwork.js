const Spawn = require('./structure.spawn')
const RolwHarvester = require('./creep.role.harvester')
const Room = require('./room')

const prepareList = []
const runList = []

/**
 * @type {Record<string,any>}
 */
const ctxs = {}

function run() {
    // memory 处理


    Object.values(Game.rooms).forEach(roomController)
    Object.values(Game.structures).forEach(structureController)
    Object.values(Game.creeps).forEach(creepController)
}

/**
 * 
 * @param {Room} room 
 */
function roomController(room) {
    const handler = Room.handler
    handler.prepare && prepareList.push(() => {
        // 收集 ctx
        const id = room.name
        ctxs[id] = handler.prepare(room)
    })

    handler.run && runList.push(() => {
        const id = room.name
        handler.run(room, ctxs[id])
    })
}

function getRoleHandler(role) {
    let handler
    switch (role) {
        case 'harvester': handler = RolwHarvester.handler; break;
    }
    return handler
}

/**
 * 
 * @param {Creep} creep 
 */
function creepController(creep) {

    let handler = getRoleHandler(creep.memory.role)

    handler.prepare && prepareList.push(() => {
        // 收集 ctx
        const id = creep.id
        ctxs[id] = handler.prepare(creep)
    })

    handler.run && runList.push(() => {
        const id = creep.id
        handler.run(creep, ctxs[id])
    })
}

/**
 * 
 * @param {Structure} structure 
 */
function structureController(structure) {
    /** @type {IHandler<Structure>} */
    let handler
    switch (structure.structureType) {
        case STRUCTURE_SPAWN:
            handler = Spawn.handler;
            break;
    }

    if (!handler) {
        return
    }

    handler.prepare && prepareList.push(() => {
        // 收集 ctx
        const id = structure.id
        ctxs[id] = handler.prepare(structure)
    })

    handler.run && runList.push(() => {
        const id = structure.id
        handler.run(structure, ctxs[id])
    })
}

/** 
 * memoryKiller
 * 逆序
 * creep -> spawn -> room
 */
function memoryKiller() {
    // 处理 creep memory
    for (const creep of Object.keys(Memory.creeps)) {
        const alive = creep in Game.creeps
        if (!alive) {
            // 删除
            const memoLastTick = Memory.creeps[creep]
            const handler = getRoleHandler(memoLastTick.role)

            handler.deathrattle && handler.deathrattle(creep, {
                getMemory: () => memoLastTick,
                deleteMemory: () => delete Memory.creeps[creep]
            })
        }
    }
    // 处理 spawn
    for (const spawn of Object.keys(Memory.spawns)) {
        const alive = spawn in Game.spawns
        if (!alive) {
            // 删除
            const memoLastTick = Memory.spawns[spawn]
            const handler = Spawn.handler

            handler.deathrattle && handler.deathrattle(spawn, {
                getMemory: () => memoLastTick,
                deleteMemory: () => delete Memory.spawns[spawn]
            })
        }
    }
    // 处理 room
    for (const room of Object.keys(Memory.rooms)) {
        const alive = room in Game.rooms
        if (!alive) {
            // 删除
            const memoLastTick = Memory.rooms[room]
            const handler = Spawn.handler

            handler.deathrattle && handler.deathrattle(room, {
                getMemory: () => memoLastTick,
                deleteMemory: () => delete Memory.rooms[room]
            })
        }
    }
}



module.exports = {
    run
}
