// 导入自定义方法
import { getBlog } from './data'
// 导入 CSS 样式
import './assets/css/style.css'
// 导入图片
import bgImg from './assets/img/bg.jpg'

// 获取博客数据
const blogs = getBlog()

console.log(blogs)

// 生成博客列表
let ul = '<ul>'
blogs.forEach((item) => {
  ul += `<li>${item}</li>`
})
let blogsDom = document.querySelector('.blogs')
blogsDom.innerHTML = ul + '</ul>'

// 创建图片标签
const imgDom = new Image()
imgDom.src = bgImg
// 添加到 body 开头
document.body.prepend(imgDom)
