<template>
    <div style="width: 100%; padding-bottom: 10em; background-color: #f5f5f5;">
        <div style="width: 50%; margin: auto; color: #3f4144;">
            <div style="padding-top: 2em; font-size: 1.4em; font-weight: bold;">
                <span>대표 진단 결과</span>
            </div>
            <img src="../../../badswing-server/result1.jpg" style="width: 100%; margin-top: 2em; box-shadow: 0 0 10px 0;" />

            <div class="result">
                <div class="title">
                    스윙 어깨와 팔의 삼각형 유지
                    <span class="ok" v-if="similarity_right > 70">
                        괜찮아요
                    </span>
                    <span class="notbad" v-else-if="similarity_right > 40">
                        아쉬워요
                    </span>
                    <span class="bad" v-else>
                        나빠요
                    </span>
                </div>
                <span class="explanation" v-if="similarity_right > 70">
                    지금처럼 하세요. 잘하고 있습니다!
                </span>
                <span class="explanation" v-else>
                    공을 치기 전 라켓을 들어올릴 때, 스윙하는 쪽의 어깨와 팔을 삼각형으로 만들어보세요.
                </span>
            </div>
            
            <div class="result">
                <div class="title">
                    보조 팔 동작
                    <span class="ok" v-if="is_left_up">
                        괜찮아요
                    </span>
                    <span class="bad" v-else>
                        나빠요
                    </span>
                </div>
                <span class="explanation" v-if="is_left_up">
                    지금처럼 하세요. 잘하고 있습니다!
                </span>
                <span class="explanation" v-else>
                    보조 팔을 올려 셔틀콕을 가리켜 보세요!
                </span>
            </div>

            <img src="../../../badswing-server/backswing_frame.jpg" style="width: 100%; margin-top: 2em; box-shadow: 0 0 10px 0;" />

            <div class="result">
                    <div class="title">
                        백스윙 자세
                        <span class="ok" v-if="max2 > 65">
                            괜찮아요
                        </span>
                        <span class="bad" v-else>
                            나빠요
                        </span>
                    </div>
                    <span class="explanation" v-if="max2 > 65">
                        지금처럼 하세요. 잘하고 있습니다!
                    </span>
                    <span class="explanation" v-else>
                        스윙 어깨와 팔의 삼각형을 유지한 후, 라켓을 머리 뒤로 쓰다듬듯이 내리면서 백스윙을 해보세요!
                    </span>
                </div>

            <div v-if="last_cock_frames != 0">
                <img src="../../../badswing-server/hit_frame.jpg" style="width: 100%; margin-top: 2em; box-shadow: 0 0 10px 0;" />

                <div class="result">
                    <div class="title">
                        타점
                        <span class="ok" v-if="is_hit_timing">
                            괜찮아요
                        </span>
                        <span class="bad" v-else>
                            나빠요
                        </span>
                    </div>
                    <span class="explanation" v-if="is_hit_timing">
                        지금처럼 하세요. 잘하고 있습니다!
                    </span>
                    <span class="explanation" v-else>
                        타점에서는 몸통과 팔의 각도가 120도 ~ 170도로 유지되는 것이 가장 바람직합니다!
                    </span>
                </div>

                <div class="result">
                    <div class="title">
                        타구 시 팔꿈치 펴짐 여부
                        <span class="ok" v-if="is_elbow_ok">
                            괜찮아요
                        </span>
                        <span class="bad" v-else>
                            나빠요
                        </span>
                    </div>
                    <span class="explanation" v-if="is_left_up">
                        지금처럼 하세요. 잘하고 있습니다!
                    </span>
                    <span class="explanation" v-else>
                        타구 시 팔꿈치가 더 펴져야 합니다! 그렇지 않으면 부상의 위험이 있어요.
                    </span>
                </div>

                <img src="../../../badswing-server/hit_frame_after.jpg" style="width: 100%; margin-top: 2em; box-shadow: 0 0 10px 0;" />

                <div class="result">
                    <div class="title">
                        타구 후 팔꿈치 펴짐 여부
                        <span class="ok" v-if="is_elbow_ok_after">
                            괜찮아요
                        </span>
                        <span class="bad" v-else>
                            나빠요
                        </span>
                    </div>
                    <span class="explanation" v-if="is_elbow_ok_after">
                        지금처럼 하세요. 잘하고 있습니다!
                    </span>
                    <span class="explanation" v-else>
                        타구 후에 팔꿈치가 더 펴져야 합니다! 그렇지 않으면 부상의 위험이 있어요.
                    </span>
                </div>


                <div class="result">
                    <div class="title">
                        타구 시 손목 사용 여부
                        <span class="ok" v-if="is_wrist_used < 0">
                            괜찮아요
                        </span>
                        <span class="bad" v-else>
                            나빠요
                        </span>
                    </div>
                    <span class="explanation" v-if="is_wrist_used < 0">
                        지금처럼 하세요. 잘하고 있습니다!
                    </span>
                    <span class="explanation" v-else>
                        타구 시에 손목을 꺾어 스윙해주세요! 더 좋은 타격을 할 수 있습니다!
                    </span>
                </div>
            </div>
            <div style="margin-top: 5em; color: red;" v-else>
                셔틀콕이 인식되지 않았습니다.
            </div>
            
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
export default {
    setup() {

        const route = useRoute();

        const similarity_right = ref(0);
        const max2 = ref(0);
        const is_left_up = ref(false);
        const last_cock_frames = ref(0);
        const is_hit_timing = ref(false);
        const is_elbow_ok = ref(false);
        const is_elbow_ok_after = ref(false);
        const is_wrist_used = ref(0);

        similarity_right.value = route.query.similarity_right;
        max2.value = route.query.max2;
        is_left_up.value = route.query.is_left_up;
        last_cock_frames.value = route.query.last_cock_frames;
        is_hit_timing.value = route.query.is_hit_timing;
        is_elbow_ok.value = route.query.is_elbow_ok;
        is_elbow_ok_after.value = route.query.is_elbow_ok_after;
        is_wrist_used.value = route.query.is_wrist_used;

        return {
            similarity_right,
            max2,
            is_left_up,
            last_cock_frames,
            is_hit_timing,
            is_elbow_ok,
            is_elbow_ok_after,
            is_wrist_used,
        }
    }
}
</script>

<style scoped>
.title {
    font-weight: 600;
    margin-bottom: 0.5em;
}
.ok {
    display: inline-block;
    background-color: rgb(190, 237, 255);
    color: rgb(119, 119, 255);
    border-radius: 1em;
    padding: 0.3em;
    font-weight: bolder;
}

.notbad {
    display: inline-block;
    background-color: rgb(255, 230, 0);
    color: orange;
    border-radius: 1em;
    padding: 0.3em;
    font-weight: bolder;
}

.bad {
    display: inline-block;
    background-color: rgb(255, 161, 192);
    color: rgb(255, 29, 119);
    border-radius: 1em;
    padding: 0.3em;
    font-weight: bolder;
}

.explanation {
    font-weight: 300;
}

.result {
    margin-top: 1.5em;
}
</style>