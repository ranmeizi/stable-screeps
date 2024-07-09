const fs = require('fs')
const path = require('path')

console.log(__dirname)

/**
 * 加载代码文件
 * @param {PROGRAMME_VERSSIONS} programme_name programmes文件夹里的名称
 * @returns {Record<string,string>} 读出一个object key 为 js文件名，value 为代码文本
 */
function loadModule(programme_name) {

    const programmeDir = path.join(__dirname, `../programmes/${programme_name}`)

    /** @type Record<string,string> */
    const modules={}

    fs.readdirSync(programmeDir).forEach(entry => {
        const value = fs.readFileSync(path.join(programmeDir, entry), 'utf8')

        modules[path.parse(entry).name] = value
    })

    return modules
}

module.exports = loadModule