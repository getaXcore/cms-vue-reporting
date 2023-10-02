<template>
     <b-container class="container-md">
        <b-form @submit.prevent="submit" @reset="onReset">
            <b-row>
                <b-col sm="2">
                    <label>Dari Tanggal <span style="color: #ff0000;">*</span></label>
                </b-col>
                <b-col sm="3">
                    <!-- <b-form-datepicker 
                        id="startdate" :value="startdateValue" @input="$emit('update:startdateValue',$event.target.value)" class="mb-3" placeholder="" locale="id"
                        today-button reset-button>
                    </b-form-datepicker> -->
                    <b-form-datepicker 
                        id="startdate" name="startdate" v-model="startdate" class="mb-3" placeholder="" locale="id"
                        today-button reset-button>
                    </b-form-datepicker>
                    <!-- <input 
                        id="startdate" name="startdate" :value="startdateValue" @input="$emit('update:startdateValue',$event.target.value)" class="mb-3" placeholder="" locale="id"
                        today-button reset-button> -->
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="2">
                    <label>Sampai <span style="color: #ff0000;">*</span></label>
                </b-col>
                <b-col sm="3">
                    <!-- <b-form-datepicker 
                        id="enddate" name="enddate" :value="enddateValue" @input="$emit('update:enddateValue',$event.target.value)" class="mb-3" placeholder="" locale="id"
                        today-button reset-button>
                    </b-form-datepicker> -->
                    <b-form-datepicker 
                        id="enddate" name="enddate" v-model="enddate" class="mb-3" placeholder="" locale="id"
                        today-button reset-button>
                    </b-form-datepicker>
                    <!-- <input
                        id="enddate" name="enddate" :value="enddateValue" @input="$emit('update:enddateValue',$event.target.value)" class="mb-3" placeholder="" locale="id"
                        today-button reset-button> -->
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="2">&nbsp;</b-col>
                <b-col sm="3">
                    <b-button type="submit" variant="primary">Search</b-button>&nbsp;
                    <b-button type="reset" variant="danger">Reset</b-button>
                </b-col>
            </b-row>
        </b-form> 
    </b-container>
</template>
<script>
export default{
    props:{
        submit: Function,
        // startdateValue: String,
        // enddateValue: String
    },
    // emits:['update:startdateValue','update:enddateValue'],
    data(){
        return{
            startdate: '',
            enddate: ''
        }
    },
    methods:{
        onReset(event){
            event.preventDefault()

            this.startdate = ''
            this.enddate = ''
        }
    }
}
</script>
<style>
@media (min-width: 1024px) {
    .container-md{
        margin-left: 25%;
    }
}
</style>