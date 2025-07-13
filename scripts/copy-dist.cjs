const { copySync } = require('fs-extra')
const path = require('path')

const from = path.resolve('dist')
const to = path.resolve('dist-ssg')

try {
  copySync(from, to, {
    overwrite: true,
    dereference: true // ✅ 关键：复制真实文件而不是 symlink
  })
  console.log('✅ Copied dist to dist-ssg')
} catch (e) {
  console.error('❌ Failed to copy dist to dist-ssg')
  console.error(e)
}
