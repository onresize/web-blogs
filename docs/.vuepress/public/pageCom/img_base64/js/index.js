new Vue({
  el: '.json_tools_outer',
  data: {
    base64Str: '',
    imgUrl: '',
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let that = this
      let myupload = this.$refs['myupload']
      let mybtn = this.$refs['mybtn']
      myupload.addEventListener('input', function (event) {
        const file = event.target.files[0]
        event.preventDefault()

        if (!file) return

        // 创建FileReader对象
        const reader = new FileReader()

        // 读取文件，完成后将调用回调函数
        reader.addEventListener('load', function () {
          const base64StrAll = reader.result
          that.imgUrl = base64StrAll
          let suffix = 'jpg'
          let base64Str
          if (base64StrAll.indexOf(';base64,') > -1) {
            let str = base64StrAll.split(',') //base64Str为base64完整的字符串，先处理一下得到我们所需要的字符串
            base64Str = str[1]
            //取图片的后缀格式
            suffix = str[0].split(';')[0].split('/')[1]
          } else {
            base64Str = base64StrAll
          }

          that.base64Str = base64Str
        })

        // 将文件读取为DataURL（base64编码）
        reader.readAsDataURL(file)
      })

      mybtn.addEventListener('click', function (event) {
        that.base64Str = ''
        that.imgUrl = ''
      })
    },
  },
})
