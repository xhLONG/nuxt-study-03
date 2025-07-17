const { copySync } = require('fs-extra')
const path = require('path')

const from = path.resolve('.output')
const to = path.resolve('.output-ssr')

try {
  copySync(from, to, {
    overwrite: true,
    dereference: true // ✅ 关键：复制真实文件而不是 symlink
  })
  console.log('✅ Copied .output to .output-ssr')
} catch (e) {
  console.error('❌ Failed to copy .output to .output-ssr')
  console.error(e)
}
