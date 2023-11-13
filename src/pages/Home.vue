<template>
  <div>
    <h2>
        배드민턴 자세 진단
    </h2>
    <input id="file" type="file" accept="video/*" />
    <video id="video"></video>

    <button @click="upload">분석하기</button>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import axios from '@/axios';

export default {
    setup() {
      onMounted(() => {
        const inputFile = document.getElementById("file");
        const video = document.getElementById("video");

        inputFile.addEventListener("change", function() {
          const file = inputFile.files[0];
          const videoUrl = URL.createObjectURL(file);
          console.log(videoUrl);
          video.setAttribute("src", videoUrl);
          video.play();
        })
      })

      const upload = async () => {
        const formData = new FormData();

        formData.append("file", document.getElementById("file").files[0]);
        await axios.post("http://127.0.0.1:5000/file", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          }
        )
          .then((res) => {
            console.log(res.data);
          })
      }

      return {
        upload,
      }
    }
}
</script>

<style scoped>
video {
  width: 400px;
}
</style>