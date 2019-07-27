<template>
  <div id="culturehome">
    <!-- 博物馆 -->
    <div>
      <div class="culturehome-link">
        <i class="myicons iconbowuguan icons-big"></i>
        <span>博物馆</span>
        <p @click="$router.push({name: 'museum'})">
          更多
          <i class="myicons icondouble-up"></i>
        </p>
      </div>
      <div class="culturehome-box">
        <img alt src="http://120.79.254.54:3004/public/images/museum.jpg" />
        <div>
          <p class="title">博物馆</p>
          <p
            class="content"
          >普陀山佛教博物馆是迄今为止我国宗教界自办的首个宗教博物馆，前身是设在普济寺的文物陈列室。是一所以收藏、保护、展示和研究普陀山佛教文物为主要内容的专题性博物馆。佛教博物馆位于普陀山香华街36-6号原昙花庵遗址，与国家的文保单位元代多宝塔、省级文保单位普济禅寺、市级文保单位百子堂相毗邻，外观为仿宋风格，建筑面积3643平方米，占地面积3400平方米，总高度19.68米；分上下两层，7个展厅，馆内珍藏佛教文物1700余件，主要为佛教圣物、圣旨、钦赐袈裟、字画、瓷器、铜器佛像和玉器杂件等，其中国家一级文物5件、二级文物22件、三级文物349件。</p>
        </div>
      </div>
    </div>

    <!-- 观音法界 -->
    <div>
      <div class="culturehome-link">
        <i class="myicons iconlianhuachan icons-big"></i>
        <span>观音法界</span>
        <p @click="$router.push({name: 'guanyin'})">
          更多
          <i class="myicons icondouble-up"></i>
        </p>
      </div>
      <div class="culturehome-box">
        <img alt src="http://120.79.254.54:3004/public/images/观音法界.jpg" />
        <div>
          <p class="title">观音法界</p>
          <p class="content" v-html>
            法界为佛教术语，法泛指宇宙万有一切事物，包括世出世间法，即一切不同的万事万物都能保持各自的特性，并按自身的轨则。界，即为分门别类的不同事物各守其不同的界限。观音法界就是关于观音菩萨和观音文化的集合。
            观音法界的总体构想是要打造以观音文化为主题，集朝圣、观光、体验、教化功能于一体，集观音菩萨和观音文化之大成的观音博览园。“观音法界”相应的功能定位为：呈现观音信仰的平台，培养佛教人才的摇篮，度化四众弟子的心灵家园。既要打造佛教建筑的传世之作，又要成为普陀山观音文化的博览园、弘法中心。观音法界要以中国汉传佛教传承千载的观音信仰为内核，以观音圣地普陀山僧团为主体，在硬件形态上凸显能够代表当代佛教建筑最高典范的“建筑地标”，在软件功能上成就现代佛教弘化理念的“精神地标”，包括通过观音的文字搜集、观音在民间流传的故事编纂、不同时代各种形态观音宝像的征集、观音语录和观音经书的整理出版等等，确保艺术品位、人文价值与纯正信仰的高度统一，打造成当代佛教建筑的传世之作和观音信众的心灵家园，呈现一派人间佛教景象。
          </p>
        </div>
      </div>
    </div>

    <!-- 观音法界 -->
    <div>
      <div class="culturehome-link">
        <i class="myicons iconyichanjicheng icons-big"></i>
        <span>非物质文化遗产</span>
        <p @click="$router.push({name: 'culture'})">
          更多
          <i class="myicons icondouble-up"></i>
        </p>
      </div>
      <div class="culturehome-box">
        <img alt src="http://120.79.254.54:3004/public/images/观音法界.jpg" />
        <div>
          <p class="title">非物质文化遗产</p>
          <p class="content">
            一是国家级非遗“观音传说”，不仅包含了丰富感人的观音民间故事，还有观音造像艺术、自然景观造型传说以及观音文化节庆活动；二是省级非遗“观音香会”。每逢二月十九观音圣诞日、六月十九观音得道日、九月十九观音出家日，来自全国各地及海外许多地方的游客与信士云集到普陀山朝山进香，参观访问，参加各种法事活动和寺庙盛典；三是省级非遗“普陀山佛茶茶道”。它是普陀山僧人在斋戒沐浴、虔心颂佛后，经过一整套严谨而神圣的茶道仪式来泡制茶的全过程，是佛教禅文化和传统茶文化的有机结合。经普查，普陀山还有包括方言、制造技艺、民间故事等很多其他非物质文化遗产，成为浙江省非物文化遗产生态保护区和省级文化旅游景区。 
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">
#culturehome
  .culturehome-link
    display flex
    display -webkit-flex
    justify-content space-between
    align-items center
    margin 5px 0 5px 10px
    font-family '华文行楷'

    p
      margin 0
      width calc(100% - 150px)
      line-height 32px
      text-align right
      border-bottom 2px solid black

  .icons-big
    font-size 32px

  .title
    text-align center
    font-family '微软雅黑'

  .content
    text-indent 2rem
    -webkit-line-clamp 12
    display -webkit-box
    overflow hidden
    -webkit-box-orient vertical

  .culturehome-box
    margin-bottom 20px

@media screen and (min-width: 960px)
  #culturehome
    padding 20px 15%

    .title
      font-size 1.5rem
      margin 10px

    .content
      font-size 0.9rem

    .culturehome-box
      display flex
      display -webkit-flex
      justify-content space-between
      margin-bottom 20px
      height 300px

      div
        box-sizing border-box
        width 45%
        padding 10px

      img
        width 50%

@media screen and (max-width: 960px)
  #culturehome
    padding 10px

    .culturehome-box
      margin-bottom 10px

      div
        padding 10px

        p:nth-child(1)
          font-size 1.5rem
          margin 0

      img
        width 100%
        height @width * 0.8
</style>
