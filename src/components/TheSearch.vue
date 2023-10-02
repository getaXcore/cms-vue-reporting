<template>
    <ShowAlertToast :message="message" :keyOfComponent="componentKey" :visibility="isVisible" />
    <!-- <DateForm :submit="onSubmit" v-model:startdate-value="StartDate" v-model:enddate-value="EndDate"></DateForm> -->
    <DateForm :submit="onSubmit"></DateForm>
    <TheListOfSearch :StartDate="StartDate" :EndDate="EndDate" :__currentPage="currentPage"></TheListOfSearch>
</template>
<script>
import { mbmpStore } from '../stores/mbmp_store'
import ShowAlertToast from './alerts/ShowAlertToast.vue';
import DateForm from './forms/DateForm.vue'
import Download from './forms/Download.vue';
import TheListOfSearch from './tables/TheListOfSearch.vue';

export default {
    components:{
        ShowAlertToast,
        DateForm,
        Download,
        TheListOfSearch
    },
    setup() {
        const store = mbmpStore(); //initiate the store
        return {
            store
        };
    },
    data() {
        return {
            currentPage: 1,
            perPage: 5,
            isVisible: false,
            componentKey: 0,
            StartDate: '',
            EndDate: ''
        };
    },
    methods: {
        onSubmit(event) {
            event.preventDefault();
            
            //get form data
            const data = new FormData(event.target);
            const Obj = Object.fromEntries(data.entries())
            this.StartDate = Obj.startdate
            this.EndDate = Obj.enddate

            //destroy old element, create a new one with a new value for alert
            this.forceRerender();

            //show alert toast
            this.isVisible = true;

            //validation of startdate and enddate
            if (this.EndDate < this.StartDate || this.StartDate > this.EndDate) {
                //change the message from store
                this.setMessage('Tanggal Akhir harus lebih besar dari Tanggal Awal')
            }
            else if (this.StartDate.length < 1 || this.EndDate.length < 1) {
                //change the message from store
                this.setMessage('Tanggal Awal ataupun Tanggal akhir wajib diisi')
            }
            else {
                //fetch data from server and storing to the store
                this.fetchHistory
                this.fetchDownload
            }
        },
        onReset(event){
            event.preventDefault()

            this.StartDate = ''
            this.EndDate = ''
        },
        forceRerender() { //for alert
            //change value of the component key for triggering
            this.componentKey += 1;
        },
        setMessage(message){
            this.store.history.message = message
        }
    },
    computed:{
        fetchHistory(){
            return this.store.fetchHistory(this.currentPage - 1, this.perPage, this.StartDate, this.EndDate)
        },
        fetchDownload(){
            return this.store.fetchDownload(this.StartDate, this.EndDate)
        },
        message(){
            return this.store.history.message
        }
    },
    watch:{
        currentPage: {
            handler: function (val) {
                this.fetchHistory
                console.log(val)
            }
        }
    }
}
</script>
<style>
.row-header-result{
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
    margin-top: 20px;
    margin-top: 8%;
}
</style>