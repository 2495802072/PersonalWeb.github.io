
const Home = {
    template:`
    <div class="box_right">
        <div class="box_border">
            <div class="home_block">
                <!-- 格言 -->
                <p class="Awords"><b>叫醒你的是闹钟,还是梦想？</b></p>
                <p style="text-align: right;color: #fff">——每日赠言</p>
                <hr style="color:#fff;margin-bottom: 0;">
                <!-- 更新日志 -->
                <div class="updatas col-12 col-md-8">
                <p style="background-color: #161616;color: #fff;margin: 0;line-height: 40px;font-size: 22px;"><b>更新日志</b></p>
                <ul>
                    <li v-for="item in logs">
                    <table style="width: 100%;">
                        <thead style="background-color: #666">
                            <tr><th>{{item.data}}</th></tr>
                        </thead>
                        <tbody>
                            <tr v-for="logs in item.imformation"><th style="color:#ebebeb;padding-left: 20px;">·&nbsp;{{logs}}</th></tr>
                            
                        </tbody>
                    </table>
                    </li>
                </ul>
                </div>
                <!-- 页面反馈 -->
                <div class="feedback-operator col-md-4">
                    <div class="questions"><p style="text-align: center;">我的个人网页可还美观？</p></div>
                    <div class="answers">
                        <button class="yes">尚可入眼<br>（num）</button>
                        <button class="no">完全不行<br>（num）</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            logs: [{
                data: "2023.11.30",
                imformation: ["编写“首页”结构","添加“每日赠言”,每天随机一条，JS方法待完善","添加“日志内容”记录历程","添加反馈窗,记录访客情况，长期保存数据方法待查，JS方法待完善"]
                },{
                data: "2023.11.29",
                imformation: ["更新“音乐”界面呈现方式","按钮排布在下方时手机端呈现级差，且浏览器比例较扁时按不到","改成和唱碟登高且取消Play按钮，将方法安排在唱碟上","添加唱碟在音乐播放时的动画效果"]
                },{
                data: "2023.11.28",
                imformation: ["“音乐”界面按钮功能实现：上一首、下一首、Play/Pause","给遥控窗添加按钮效果：关闭背景和声音的功能","设置遥控窗手机端隐藏，实在太挡屏幕、占镜头"]
                },{
                data: "2023.11.27",
                imformation: ["版权声明孤零零太单调，添加godot游戏项目选项","调整颜色强调","游戏项目采用超链接页面跳转","项目页有点多余，但暂不做考虑"]
                },{
                data: "2023.11.26",
                imformation: ["编辑背景","使用vedio视频背景","设置手机端和电脑端两个背景，手机端考虑到性能不加视频","调整css样式让视频铺满背景","添加左侧遥控窗并初定尺寸和颜色","遥控窗分区并缩小上半区，使用绝对定位把头像突出去","按钮部分分为两块，页面设置和版权声明"]
                },{
                data: "2023.11.25",
                imformation: ["梦开始的地方，创建工程文件","架构top-nav(顶部导航)","采用bootstrap实现手机端收起到按钮","采用Vue的组件替换实现三个(暂时先三个)页面的跳转","导入化名的LOGO","调整配色"]
                }
            ]
        }
    }
}

const Music = {
    props: ["musicList","musicCurrentIndex"],
    template:`
    <div class="box_right">
        <div class="box_border">
            <div class="div_show">
                <!-- 按钮 -->
                <div class="music_button">
                    <div class="button_outside">
                        <img @click="musicLast" src="./assets/Art/image/音乐播放器/上一曲.png" alt="" width="120px" height="120px">
                    </div>
                    <div class="button_outside" style="flex:1">
                        <div class="image_border" id="musicAlbum">
                            <img id="albumImage" @click="musicPlay" :src="musicList[0].album" width="300px" height="300px">
                        </div>
                    </div>
                    <div class="button_outside">
                        <img @click="musicNext" src="./assets/Art/image/音乐播放器/下一曲.png" alt="" width="120px" height="120px">
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    methods: {
        musicPlay() {
            var record_div = document.getElementById("musicAlbum");
            var record = record_div.querySelector('#albumImage');
            var BGaudio = document.getElementById("BGaudio");
            if (record_div.style.animationPlayState == "paused") {
                record_div.style.animationPlayState = "running";
                record.style.animationPlayState = "running";
                BGaudio.play();
             }
            else{
                record_div.style.animationPlayState = "paused";
                record.style.animationPlayState = "paused";
                BGaudio.pause();
            }
        },
        musicNext() {
            var record_div = document.getElementById("musicAlbum");
            record_div.classList.add('slide');
            this.musicCurrentIndex = (this.musicCurrentIndex + 1) % this.musicList.length;//改变子组件的musicCurrentIndex
            this.setAlbumImage(); //设置图标
            this.$emit('musicindex',this.musicCurrentIndex);//触发数据更新
            setTimeout(() => {
            record_div.classList.remove('slide');
            }, 200);
        },
        musicLast() {
            var record_div = document.getElementById("musicAlbum");
            record_div.classList.add('slide');
            this.musicCurrentIndex = (this.musicCurrentIndex + this.musicList.length-1) % this.musicList.length;//改变子组件的musicCurrentIndex
            this.setAlbumImage();//设置图标
            this.$emit('musicindex',this.musicCurrentIndex);//触发数据更新
            setTimeout(() => {
            record_div.classList.remove('slide');
            }, 200);
        },
        setAlbumImage() {
            var currentMusic = this.musicList[this.musicCurrentIndex];
            var albumImage = document.getElementById("albumImage");
            if (currentMusic.album) {
                albumImage.src = currentMusic.album;
            } else {
                albumImage.src = "./assets/Art/image/图标3.png"; // 如果没有专辑图像，则切换默认图标
            }
        }
    }
}

const Resume = {
    template:`
    <div class="box_right">
        <div class="box_border">
            <div class="col-12" style="color:#fff;font-weight:bold;display:flex;">
                <p style="margin:auto;font-size:30px">此页暂不做更新</p>
            </div>
        </div>
    </div>
    `
}

var MyView = new Vue({
    el:"#app",
    data:{
        background: true,
        background_music: false,
        background_button_span_style:{
            "color": "#b9b900"
        },
        background_music_button_span_style:{
            "color": "#a5a5a5"
        },
        pageArray: [
            {
                name: "首页"
            },
            {
                name: "音乐"
            },
            {
                name: "项目册"
            },
        ],
        musicList:[{
            name: "碎镜",
            link: "./assets/Art/audio/碎镜.mp3",
            album: "./assets/Art/image/歌曲专辑图像/碎镜.jpg"
        },{
            name: "Stuttering",
            link: "./assets/Art/audio/Stuttering.mp3"
        },{
            name: "原点",
            link: "./assets/Art/audio/原点.mp3"
            }],
        musicCurrentIndex: 0,
        displayPage: 'myPage1'
    },
    components: {
        'myPage1': Home,
        'myPage2': Music,
        'myPage3': Resume
    },
    methods:{
        background_click:function(flag) {
            if (flag){ //按钮“背景”
                this.background = !this.background;
                if (this.background) {
                    this.background_button_span_style = { "color": "#b9b900" };
                    console.log(this.background)
                    document.getElementById("video_background").style.visibility = "visible";
                }
                else {
                    this.background_button_span_style = { "color": "#a5a5a5" };
                    console.log(this.background);
                    document.getElementById("video_background").style.visibility = "hidden";
                }
            }
            else { //按钮“BGM”
                var BGaudio = document.getElementById("BGaudio");
                this.background_music = !this.background_music;
                if (this.background_music) {
                    this.background_music_button_span_style = { "color": "#b9b900" };
                    //打开声音
                    BGaudio.muted = false;
                    console.log("打开声音");
                }
                else {
                    this.background_music_button_span_style = { "color": "#a5a5a5" };
                    //关闭声音
                    BGaudio.muted = true;
                    console.log("关闭声音");
                }
            }
        },
        pagesChanged(tabPage) {
            switch (tabPage) {
                case 0:
                {
                    this.displayPage = 'myPage1';
                    break;
                }
                case 1:
                {
                    this.displayPage = 'myPage2';
                    break;
                }
                default:
                {
                    this.displayPage = 'myPage3';
                    break;
                }
            }
        },
        ichange(item) {
            this.musicCurrentIndex = item;
        }
    }
})
