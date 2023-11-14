<template>
  <div style="text-align: center;">
    <div style="width: 40%; min-width: 400px; margin-left: auto; margin-right: auto;">
      <label for="file">
        <div class="btn-upload">파일 업로드하기</div>
      </label>
      <input id="file" type="file" accept="video/*" />
      <video id="video"></video>

      <button @click="upload">분석하기</button>

      <div class="result" v-if="result">
        <div style="font-size: 1.5em; text-align: left; margin-bottom: 1em;">
          결과
        </div>

        <div style="font-size: 1.2em; text-align: left; margin-bottom: 1em;">
          오른팔의 삼각형 유지와 보조 팔 동작 진단
        </div>

        <img src="../../../server/result1.jpg" />

        <div class="explanation">
          오른쪽 어깨, 팔의 삼각형 유사도 : {{ feature1.similarity_right  }}%
        </div>
        <div class="explanation">
          보조 팔 동작 유사도 : {{ feature1.similarity_left  }}%
        </div>
        <div class="explanation" v-if="!feature1.is_left_up">
          타구할 때 보조 팔을 더 올려서 공을 가리켜 보세요
        </div>
      </div>

      <div id="loading" v-show="loading" />
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
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

      const loading = ref(false);
      const result = ref(false);
      const feature1 = ref({});

      const upload = async () => {
        loading.value = true;
        const formData = new FormData();

        formData.append("file", document.getElementById("file").files[0]);
        await axios.post("http://127.0.0.1:5000/file", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          }
        )
          .then((res) => {
            if(res.data.result === "ok") {
              feature1.value = res.data;
              feature1.value.similarity_right = Math.round(feature1.value.similarity_right * 100);
              feature1.value.similarity_left = Math.round(feature1.value.similarity_left * 100);
            } else {
              console.log(res.data);
              return;
            }
          })
        loading.value = false;
        result.value = true;
      }

      return {
        upload,
        loading,
        result,
        feature1,
      }
    }
}
</script>

<style scoped>
video {
  width: 100%;
  height: auto;
  min-width: 400px;
  aspect-ratio: 16/9;
  box-shadow: 0 0 10px 0 gray;
}

img {
  width: 100%;
  height: auto;
  min-width: 400px;
  aspect-ratio: 16/9;
  box-shadow: 0 0 10px 0 gray;
  margin-bottom: 1em;
}

input {
  width: 50%;
  margin: 5%;
  background-color: #041461;
  border: none;
  color: white;
  padding: 1em;
  border-radius: 1em;
  cursor: pointer;
}

button {
  width: 50%;
  margin: 5%;
  background-color: gray;
  border: none;
  color: white;
  padding: 1em;
  border-radius: 1em;
  cursor: pointer;

}

.btn-upload {
  width: 150px;
  height: 30px;
  background: #fff;
  border: 1px solid rgb(77,77,77);
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2em auto 2em auto;
}

.btn-upload:hover {
  width: 150px;
  height: 30px;
  background: #fff;
  border: 1px solid rgb(77,77,77);
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(77,77,77);
  color: #fff;
}

#file {
  display: none;
}

#loading {
  position: fixed;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255,255,255,.3);
  border-radius: 50%;
  border-top-color: black;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  z-index: 1000;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
}

@keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
@-webkit-keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}

.explanation {
  margin-bottom: 2em;
}
</style>