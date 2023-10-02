<template>
     <div class="toast-md">
        <CToast :autohide="true" class="align-items-center" v-bind:visible="visibility" :key="keyOfComponent">
        <div class="d-flex">
            <CToastBody>
                {{ message }}
            </CToastBody>
            <CToastClose class="me-2 m-auto"/>
        </div>
        </CToast>
    </div>
</template>

<script>
import { CToast, CToastBody, CToastClose } from '@coreui/vue'
export default{
    components:{
        CToast,
        CToastBody,
        CToastClose
    },
    props:{
        message: String,
        keyOfComponent: Number,
        visibility: Boolean
    }
}
</script>
<style>
.toast-md{
    float: right;
    position: absolute;
    z-index: 1;
    right: 2%;
    top: 1%
}
</style>