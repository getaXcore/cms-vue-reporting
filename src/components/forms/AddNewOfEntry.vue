<template>
    <ShowAlertToast :message="message" :keyOfComponent="componentKey" :visibility="isVisible" />
    <div>
        <b-button v-b-modal.modal-1 variant="primary">New <b-icon icon="plus-square-fill"></b-icon></b-button>
        <b-modal size="md" id="modal-1" hide-backdrop :title="titleModal" hide-header-close  @hidden="resetModal" @ok="handleOk">
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                label="Product Code"
                label-for="productCode-input"
                invalid-feedback="Product Code is required"
                :state="productCodeState"
                >
                <b-form-input
                    id="productCode-input"
                    v-model="productCode"
                    :plaintext="readonly"
                    :state="productCodeState"
                    @input="productCodeFilter"
                    required
                ></b-form-input>
                </b-form-group>
                <b-form-group
                label="Description ID"
                label-for="descriptionId-input"
                invalid-feedback="Description ID is required"
                :state="descriptionIdState"
                >
                <b-form-input
                    id="descriptionId-input"
                    v-model="descriptionId"
                    :state="descriptionIdState"
                    required
                ></b-form-input>
                </b-form-group>
                <b-form-group
                label="Description EN"
                label-for="descriptionEn-input"
                invalid-feedback="Description EN is required"
                :state="descriptionEnState"
                >
                <b-form-input
                    id="descriptionId-input"
                    v-model="descriptionEn"
                    :state="descriptionEnState"
                    required
                ></b-form-input>
                </b-form-group>
                <b-form-group
                label="Maksimal Pembukaan Rekening"
                label-for="maxAccount-input"
                invalid-feedback="Maksimal Pembukaan Rekening is required"
                :state="maxAccountState"
                >
                <b-form-input
                    id="maxAccount-input"
                    @input="maxAccountFilter"
                    v-model="maxAccount"
                    :state="maxAccountState"
                    required
                ></b-form-input>
                <!-- {{ maxAccount }} -->
                </b-form-group>
                <b-form-group
                label="Setoran Awal"
                label-for="minDeposit-input"
                invalid-feedback="Setoran Awal is required"
                :state="minDepositState"
                >
                <b-form-input
                    id="minDeposit-input"
                    @input="minDepositFilter"
                    v-model="minDeposit"
                    :state="minDepositState"
                    required
                ></b-form-input>
                <!-- {{ minDeposit }} -->
                </b-form-group>
            </form>
            <template #modal-footer="{ ok, cancel, hide }">
                <!-- Emulate built in modal footer ok and cancel button actions -->
                <b-button size="md" variant="light" @click="cancel()">
                    Kembali
                </b-button>
                <b-button size="md" variant="primary" @click="ok()">
                    Submit
                </b-button>
            </template>
        </b-modal>
        <b-modal size="sm" title="Delete Confirmation" id="modal-2" hide-backdrop hide-header-close @hidden="resetDeleteModal" @ok="doDelete">
          <template #modal-header="{ close }">
            <b-row>
              <b-col>
                <b-icon icon="exclamation-circle" variant="warning" scale="2"></b-icon>
              </b-col>
              <b-col><h5>Warning</h5></b-col>
            </b-row>
          </template>
          <p>You want to delete this?</p>
          <template #modal-footer="{ ok, cancel, hide }">
                <!-- Emulate built in modal footer ok and cancel button actions -->
                <b-button size="md" variant="primary" @click="ok()">
                    Yes!
                </b-button>
                <b-button size="md" variant="danger" @click="cancel()">
                    Cancel
                </b-button>
            </template>
        </b-modal>
    </div>
    <TheListOfEntry :edit-action="doEdit" :delete-action="doDelete"></TheListOfEntry>
</template>
<script>
import ShowAlertToast from '../alerts/ShowAlertToast.vue'
import TheListOfEntry from '../tables/TheListOfEntry.vue'
import { etbparamStore } from '../../stores/etbparam_store'

export default{
    setup(){
      const store = etbparamStore()
      return{
        store
      }
    },
    components:{
      ShowAlertToast,
      TheListOfEntry
    },
    data() {
      return {
        productId: '',
        productCode: '',
        productCodeState: null,
        descriptionId: '',
        descriptionIdState: null,
        descriptionEn: '',
        descriptionEnState: null,
        maxAccount: '',
        maxAccountState: null,
        minDeposit: '',
        minDepositState: null,
        statusId: 0,
        userName: this.$route.query.user?this.$route.query.user:'cms',
        componentKey: 0,
        isVisible: false,
        readonly: false,
        titleModal: 'Add New Open Account'
      }
    },
    methods: {
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.productCodeState = valid
        this.descriptionIdState = valid
        this.descriptionEnState = valid
        this.maxAccountState = valid
        this.minDepositState = valid
        return valid
      },
      resetModal() {
        this.productId = ''
        this.productCode = ''
        this.productCodeState = null
        this.descriptionId = ''
        this.descriptionIdState = null
        this.descriptionEn = ''
        this.descriptionEnState = null
        this.maxAccount = ''
        this.maxAccountState = null
        this.minDeposit = ''
        this.minDepositState = null
        this.readonly = false
        this.titleModal = 'Add New Open Account'
      },
      resetDeleteModal(){
        this.productId = ''
      },
      handleOk(bvModalEvent) {
        // Prevent modal from closing
        bvModalEvent.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }

        if(this.productId){ //product id not null    
          this.doUpdate()
        }else{     
          this.doInsert()
        }

        //destroy old element, create a new one with a new value for alert
        this.forceRerender();

        //show alert toast
        this.isVisible = true

        // Hide the modal manually
        // this.$nextTick(() => {
        //   this.$bvModal.hide('modal-prevent-closing')
        // })
      },
      doInsert(){
        this.insertParam
      },
      doEdit(data){
        this.productId = (data.id).toString()
        this.productCode = data.product_code
        this.descriptionId = data.product_desc_id
        this.descriptionEn = data.product_desc_en
        this.maxAccount = data.max_account
        this.minDeposit = data.initial_deposit
        this.readonly = true
        this.titleModal = 'Edit Open Account'
      },
      doDelete(value){
        if(typeof value === 'number'){
          this.productId = value.toString()
        }

        if(value.trigger === 'ok'){
          this.deleteParam
          //destroy old element, create a new one with a new value for alert
          this.forceRerender();
              
          //show alert toast
          this.isVisible = true
        }
      },
      doUpdate(){
        this.updateParam
      },
      maxAccountFilter(value){
        this.maxAccount = this.numberOnly(value)
      },
      minDepositFilter(value){
        this.minDeposit = this.numberOnly(value)
      },
      numberOnly(value){
        //remove char, space or whitespace
        return value.replace(/[^0-9]/g, '')
      },
      productCodeFilter(value){
        if(!this.readonly){
          //remove space
          this.productCode = value.replace(/\s/g, '')
        }
      },
      forceRerender() { //for alert
          //change value of the component key for triggering
          this.componentKey += 1;
      },
    },
    computed:{
      message(){
        return this.store.params.message
      },
      insertParam(){
        return this.store.insertParam(this.productCode,this.descriptionId,this.descriptionEn,this.maxAccount,this.minDeposit,this.statusId,this.userName)
      },
      updateParam(){
        return this.store.updateParam(this.productId,this.productCode,this.descriptionId,this.descriptionEn,this.maxAccount,this.minDeposit,this.statusId,this.userName)
      },
      deleteParam(){
        return this.store.deleteParam(this.productId)
      }
    }   
}
</script>