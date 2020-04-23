import Mock from "mockjs"
var Random = Mock.Random
const id:number = Random.integer(20,100)   //随机返回20到100的数字
Random.float(60, 100, 3, 5) //随机返回60到100的带有3到5位小数的数字
Random.string() //随机返回一个字符串
Random.string(5) //随机返回一个长度为5的字符串
Random.string(7, 10)//随机返回一个长度为5到7位的字符串
Random.date()//随机返回一个日期
Random.date('yyyy-MM-dd')//随机返回一个格式化日期
Random.image()//随机返回一张图片
Random.image('200x100')//随机返回一张带尺寸的图片
Random.image('200x100', '#FF6600')//随机返回一张带尺寸和颜色的图片
Random.paragraph()//随机返回一段文字
Random.cparagraph()//随机返回一段中文文字
Random.cparagraph(1, 3)//随机返回1到3段中文文字
Random.csentence()//随机返回一句中文
Random.ctitle()//随机返回一个中文标题

Mock.mock('/mock/menu', {
  list:[
    {
      id:Random.integer(20,100),
    label:"首页",
    path:"/content/home",
    },
    {
      id,
      label:"图表",
      path:"",
      list:[
        {
          id:Random.integer(20,100),
    label:"饼图",
    path:"/content/chart",
        },
      ]
    }
    
  ]
})