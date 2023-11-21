<template>
  <div style="text-align: center; padding-bottom: 5em;">
    <div style="width: 100%; background-color: #f5f5f5;">
      <img class="heading-image" src="../assets/logo.png" />
      <div class="heading">
        Your Badminton Swing
        <br />
        is Bad.
      </div>
    </div>
    <div style="width: 100%; background-color: #f5f5f5; display: flex; padding-bottom: 5em;">
      <div style="width: 100%; color: #919396; font-size: 1.3em; font-weight: 600;">
        카메라 앞에서 스윙해보세요! 스윙의 문제점을 찾아 드릴게요<br />
        자세뿐만 아니라 셔틀콕과 라켓까지 인식해서 분석해 드려요<br />
        이제 자세 때문에 다치지 말고 건강하게 좋은 실력으로 경기할 수 있어요<br />
        <label for="file">
          <div class="btn-upload">사용해보기</div>
        </label>
      </div>
    </div>
    <input hidden id="file" type="file" accept="video/*" />
    <div style="width: 100%;">
      <div class="feature">
        <img style="width: 45%; box-shadow: 0 0 4px 0;" src="../assets/advantage1.jpg" />
        <div style="width: 10%;" />
        <div style="width: 30%; text-align: left;">
          <div style="color: #9d9ea0; font-family: 'Poppins'; margin-bottom: 1em;">
            Pose Estimation
          </div>
          <div style="font-weight: 600; color: #3f4144; font-size: 2em; margin-bottom: 1em;">
            자세 유사도 기반 분석
          </div>
          <div style="color: #9d9ea0;">
            국가대표 스윙과의 자세 유사도를 기반으로 자세가 올바른 지 평가할 수 있습니다
          </div>
        </div>
      </div>

      <div class="feature">
        <div style="width: 15%" />
        <div style="width: 30%; text-align: left;">
          <div style="color: #9d9ea0; font-family: 'Poppins'; margin-bottom: 1em;">
            Object Detection
          </div>
          <div style="font-weight: 600; color: #3f4144; font-size: 2em; margin-bottom: 1em;">
            셔틀콕과 라켓을 인식
          </div>
          <div style="color: #9d9ea0;">
            셔틀콕과 라켓을 직접 인식하여 사용자의 타점을 기준으로 백스윙 자세, 타구 자세, 타구 전후 팔꿈치와 손목 등 다양한 문제를 진단합니다
          </div>
        </div>
        <div style="width: 10%;" />
        <img style="width: 45%; box-shadow: 0 0 4px 0;" src="../assets/advantage2.png" />
      </div>
    </div>

    <div id="loading" v-show="loading" />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from '@/axios';

export default {
    setup() {
      onMounted(() => {
        const inputFile = document.getElementById("file");

        inputFile.addEventListener("change", function() {
          inputFile.files[0];
          upload();
          // testUpload();
        })
      })

      const router = useRouter();
      const loading = ref(false);
      const result = ref(false);


      const testUpload = async () => {
        const similarity_right = 95;
        const is_left_up = true;
        const similarity_hit = 95;
        const is_elbow_ok = true;
        const is_elbow_ok_after = true;
        const is_wrist_used = -1;

        router.push({
          name: "Result",
          query: {
            similarity_right: similarity_right,
            is_left_up: is_left_up,
            similarity_hit: similarity_hit,
            is_elbow_ok: is_elbow_ok,
            is_elbow_ok_after: is_elbow_ok_after,
            is_wrist_used: is_wrist_used,
          }
        })
      }

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
              const similarity_right = Math.round(res.data.similarity_right * 100);
              const max2 = Math.round(res.data.max2 * 100);
              const is_left_up = res.data.is_left_up;
              const last_cock_frames = res.data.last_cock_frames;
              const is_hit_timing = res.data.is_hit_timing;
              const is_elbow_ok = res.data.is_elbow_ok;
              const is_elbow_ok_after = res.data.is_elbow_ok_after;
              const is_wrist_used = res.data.is_wrist_used;

              router.push({
                name: "Result",
                query: {
                  similarity_right: similarity_right,
                  max2: max2,
                  is_left_up: is_left_up,
                  last_cock_frames: last_cock_frames,
                  is_hit_timing: is_hit_timing,
                  is_elbow_ok: is_elbow_ok,
                  is_elbow_ok_after: is_elbow_ok_after,
                  is_wrist_used: is_wrist_used,
                }
              })
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
        testUpload,
      }
    }
}
</script>

<style scoped>
.result {
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
  border: 1px solid #3f4144;
  border-radius: 15px;
  color: #3f4144;
  font-size: 0.8em;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1em auto 0 auto;
}

.btn-upload:hover {
  width: 150px;
  height: 30px;
  border: 1px solid #3f4144;
  border-radius: 15px;
  font-size: 0.8em;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #3f4144;
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

.feature {
  width: 70%;
  display: flex;
  margin: auto;
  background-color: white;
  padding: 4em 0 0 0;
}

.heading {
  font-family: 'Poppins';
  width: 100%;
  background-color: #f5f5f5;
  font-size: 5em;
  color: #3f4144;
}

.heading-image {
  margin-top: 3em;
  background-color: #f5f5f5;
  width: 90px;
  height: auto;
  object-fit: scale-down;
}
</style>