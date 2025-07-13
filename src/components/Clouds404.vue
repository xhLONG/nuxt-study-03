<template>
    <div class="clouds-404">
        <div class="clouds">
            <div class="cloud x1"></div>
            <div class="cloud x1_5"></div>
            <div class="cloud x2"></div>
            <div class="cloud x3"></div>
            <div class="cloud x4"></div>
            <div class="cloud x5"></div>
        </div>
        <div class='content'>
            <h1 class='_404'>{{ error.statusCode }}</h1>
            <hr>
            <!-- <div class='_1'>THE PAGE</div> -->
            <div class='_2'>{{ message }}</div>
            <NuxtLink to="/" class='btn'>BACK TO HOME</NuxtLink>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    error: { type: Object },
    title: { type: String },
})

const message = computed(() => {
    const code = props.error.statusCode
    if (code === 404) return '页面未找到'
    if (code === 500) return '服务器错误'
    return `${code || '错误'} - 出错啦`
})
</script>

<style lang="scss" scoped>
.clouds-404 {
    background: #33cc99;
    color: #fff;
    font-family: 'Open Sans', sans-serif;
    height: calc(100vh - 86px);
    position: relative;
    overflow: hidden;
}

.content {
    text-align: center;
    display: block;
    position: relative;
    width: 80%;
    margin: 0 auto;
    padding-top: 100px;

    ._404 {
        font-size: 220px;
        display: inline-block;
        z-index: 2;
        height: 250px;
        letter-spacing: 15px;
    }

    ._1 {
        letter-spacing: 12px;
        font-size: 4em;
        line-height: 80%;
    }

    ._2 {
        font-size: 20px;
    }

    .text {
        font-size: 70px;
        display: inline-block;
        margin: 19px 0px 0px 0px;
        z-index: 3;
        width: 100%;
        line-height: 1.2em;
    }

    .btn {
        background-color: rgb(255, 255, 255);
        display: inline-block;
        width: 358px;
        padding: 5px;
        z-index: 5;
        font-size: 25px;
        margin: 0 auto;
        color: $primary-color;
        text-decoration: none;
        margin-top: 20px;
    }

    hr {
        border-top: 5px solid #fff;
        margin: 0px auto;
        width: 420px;
        height: 10px;
        z-index: -10;
    }

    hr:after {
        content: "\2022";
        display: inline-block;
        position: relative;
        top: -0.75em;
        font-size: 2em;
        padding: 0 0.2em;
        background: #33cc99;
    }
}


.clouds {
    .cloud {
        width: 350px;
        height: 120px;
        background: #FFF;
        background: linear-gradient(to top, #FFF);
        border-radius: 100px;
        position: absolute;
        margin: 120px auto 20px;
        transition: ease 1s;
    }

    .cloud:after,
    .cloud:before {
        content: '';
        position: absolute;
        background: #FFF;
        z-index: -1
    }

    .cloud:after {
        width: 100px;
        height: 100px;
        top: -50px;
        left: 50px;
        border-radius: 100px;
        -webkit-border-radius: 100px;
        -moz-border-radius: 100px;
    }

    .cloud:before {
        width: 180px;
        height: 180px;
        top: -90px;
        right: 50px;
        border-radius: 200px;
        -webkit-border-radius: 200px;
        -moz-border-radius: 200px;
    }


    .x1 {
        top: -50px;
        left: 100px;
        transform: scale(0.3);
        opacity: 0.9;
        animation: moveclouds 15s linear infinite;
    }

    .x1_5 {
        top: -80px;
        left: 250px;
        transform: scale(0.3);
        animation: moveclouds 17s linear infinite;
    }

    .x2 {
        left: 250px;
        top: 30px;
        transform: scale(0.6);
        opacity: 0.6;
        animation: moveclouds 25s linear infinite;
    }

    .x3 {
        left: 250px;
        bottom: -70px;
        transform: scale(0.6);
        opacity: 0.8;
        animation: moveclouds 25s linear infinite;
    }

    .x4 {
        left: 470px;
        bottom: 20px;
        transform: scale(0.75);
        opacity: 0.75;
        animation: moveclouds 18s linear infinite;
    }

    .x5 {
        left: 200px;
        top: 300px;
        transform: scale(0.5);
        opacity: 0.8;
        animation: moveclouds 20s linear infinite;
    }
}


@keyframes moveclouds {
    0% {
        margin-left: 1000px;
    }

    100% {
        margin-left: -1000px;
    }
}


@media (max-width: 768px) {
    .clouds-404 {
        height: calc(100vh - 68px);
    }
    .content{
        ._404{
            font-size: 4rem;
            height: auto;
        }
        hr,.btn{
            width: 70%;
        }
    }
}
</style>
