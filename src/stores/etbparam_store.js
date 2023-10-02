import { defineStore } from "pinia";
import { GetEtbParams, setForInsertEtbParam, setForDeleteEtbParam, setForUpdateEtbParam, InsertEtbParam, UpdateEtbParam, DeleteEtbParam } from "../repository/repository";
import { ref } from "vue";

export const etbparamStore = defineStore('params',{
    state: () => ({
        params : {
            status: 0,
            message: '',
            datas: []
        },
        loader: false
    }),
    actions: {
        $reset(){
            this.$state.params.datas = []
        },
        async fetchParams(){
            try {
                this.$state.loader = true

                const getParams =  GetEtbParams.pipe()
                getParams.subscribe({
                    next: (data) => {
                            
                        this.$state.params.status = data.status
                        this.$state.params.message = data.message
                        if(data.status === 200){
                            this.$state.params.datas = data.datas
                        }else{
                            this.$reset()
                        }
                    },
                    error: (e) => {
                        console.log(e)
                        this.$state.params.message = e
                    },
                    complete: ()=>{this.$state.loader = false}})
            } catch (error) {
                console.log(error.messages)
                this.$state.params.message = error.message
            }
            
        },
        insertParam(productCode,descriptionId,descriptionEn,maxAccount,minDeposit,statusId,userName){
            try {
                const obv = ref(false)
                setForInsertEtbParam(productCode,descriptionId,descriptionEn,maxAccount,minDeposit,statusId,userName)
                const insert = InsertEtbParam.pipe()
                insert.subscribe({
                    next: (data) =>{
                        this.$state.params.status = data.status
                        this.$state.params.message = data.message
                        if(data.status === 200){
                            this.fetchParams()
                        }
                    },
                    error: (e) => {
                        console.log(e)
                        this.$state.params.message = e
                    },
                    complete: () =>{}
                })   

            } catch (error) {
                console.log(error.messages)
                this.$state.params.message = error.message
            }
        },
        updateParam(productId,productCode,descriptionId,descriptionEn,maxAccount,minDeposit,statusId,userName){
            try {
                setForUpdateEtbParam(productId,productCode,descriptionId,descriptionEn,maxAccount,minDeposit,statusId,userName)
                const update = UpdateEtbParam.pipe()
                update.subscribe({
                    next: (data) =>{
                        this.$state.params.status = data.status
                        this.$state.params.message = data.message
                        if(data.status === 200){
                            this.fetchParams()
                        }
                    },
                    error: (e) => {
                        console.log(e)
                        this.$state.params.message = e
                    },
                    complete: () =>{}
                })
                
            } catch (error) {
                console.log(error.messages)
                this.$state.params.message = error.message
            }
        },
        deleteParam(productId){
            try {
                setForDeleteEtbParam(productId)
                const deleted = DeleteEtbParam.pipe()
                deleted.subscribe({
                    next: (data) =>{
                        this.$state.params.status = data.status
                        this.$state.params.message = data.message
                        if(data.status === 200){
                            this.fetchParams()
                        }
                    },
                    error: (e) => {
                        console.log(e)
                        this.$state.params.message = e
                    },
                    complete: () =>{}
                })
            } catch (error) {
                console.log(error.messages)
                this.$state.params.message = error.message
            }
        }
    }
})