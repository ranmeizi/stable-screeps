import fs from 'fs'
import path from 'path'

/**
 * 代码版本生成
 */

export default function gen(config) {
    /** @type {string | undefined} */
    const ver = config.ver

    if (!ver) {
        throw 'missing ver!'
    }

    // 创建文件夹
    fs.mkdirSync(path.join(process.cwd(), `programmes/${ver}`))

    // 创建入口
    fs.writeFileSync(path.join(process.cwd(), `programmes/${ver}/main.js`),
        'module.exports.loop = function () {\n' +
        "    console.log('I am a loop function')\n" +
        '}'
    )

    // 追加 typing

    // 创建文件夹
    fs.mkdirSync(path.join(process.cwd(), `typing/${ver}`))

    const namespace = ver.toLocaleUpperCase().replace(/\./g, '_')

    // 创建文件
    fs.writeFileSync(path.join(process.cwd(), `typing/${ver}/index.d.ts`),
        `declare namespace ${namespace}{\n` +
        "\n" +
        '}'
    )

    const text = fs.readFileSync(path.join(process.cwd(), `typing/type_gen_by_code.d.ts`), 'utf8')

    const newText = text.split('\n').map(line => {
        if (line.startsWith('declare type PROGRAMME_VERSSIONS =')) {
            return line + ` | '${ver}'`
        }
    }).join('\n')

    fs.writeFileSync(path.join(process.cwd(), `typing/type_gen_by_code.d.ts`), newText)
}

