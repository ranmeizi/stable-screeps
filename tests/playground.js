(async function () {
    const _ = require('lodash');
    const { ScreepsServer, TerrainMatrix } = require('screeps-server-mockup');
    const loadModule = require('../utils/load_modules')

    const server = new ScreepsServer();

    try {
        // Initialize server
        await server.world.reset(); // reset world but add invaders and source keepers bots

        // Prepare the terrain for a new room
        const terrain = new TerrainMatrix();
        const walls = [[10, 10], [10, 40], [40, 10], [40, 40]];
        _.each(walls, ([x, y]) => terrain.set(x, y, 'wall'));

        // Create a new room with terrain and basic objects
        await server.world.addRoom('W0N1');
        await server.world.setTerrain('W0N1', terrain);
        await server.world.addRoomObject('W0N1', 'controller', 10, 10, { level: 0 });
        await server.world.addRoomObject('W0N1', 'source', 10, 40, { energy: 1000, energyCapacity: 1000, ticksToRegeneration: 300 });
        await server.world.addRoomObject('W0N1', 'mineral', 40, 40, { mineralType: 'H', density: 3, mineralAmount: 3000 });

        // Add a bot in W0N1
        const modules = loadModule('playground')
        const bot = await server.world.addBot({ username: 'bot', room: 'W0N1', spawnName: '快乐老家', x: 25, y: 25, modules });

        // 创建一个自己的 creep

        // Print console logs every tick
        bot.on('console', (logs, results, userid, username) => {
            _.each(logs, (line) => console.log(`[console|${username}]`, line));
        });

        // Start server and run several ticks
        await server.start();
        for (let i = 0; i < 1502; i += 1) {
            console.log('[tick]', await server.world.gameTime);
            await server.tick();
            _.each(await bot.newNotifications, ({ message }) => console.log('[notification]', message));
            console.log('[memory]', await bot.memory, '\n');
        }
    } catch (err) {
        console.error(err);
    } finally {
        // Stop server and disconnect storage
        server.stop();
        process.exit(); // required as there is no way to properly shutdown storage :(
    }
}());
