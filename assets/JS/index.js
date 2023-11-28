
const Home = {
    template:`
    <div class="box_right">
        <div class="box_border">
            <div class="col-8">
                <!-- 格言 -->
                <!-- 更新日志 -->
            </div>
            <div class="col-4">
                <!-- 超链接 -->
            </div>
        </div>
    </div>
    `
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
            <div class="col-8">1
                <!-- 格言 -->
                <!-- 更新日志 -->
            </div>
            <div class="col-4">2
                <!-- 超链接 -->
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
