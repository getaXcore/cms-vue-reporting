<template>
    <b-overlay :show="isShow" variant="white" rounded="sm">
        <div>
            <b-row>
                <b-col class="my-2" style="float: left;">
                    <b-form-group
                        label="Per page"
                        label-for="per-page-select"
                        label-cols-sm="6"
                        label-cols-md="4"
                        label-cols-lg="3"
                        label-align-sm="right"
                        label-size="sm"
                        class="mb-0"
                    >
                        <b-form-select
                            id="per-page-select"
                            v-model="perPage"
                            :options="pageOptions"
                            size="sm"
                        />
                    </b-form-group>
                </b-col>
                <b-col sm="3" class="my-2" style="float: right;">
                    <b-form-group
                        label="Filter"
                        label-for="filter-input"
                        label-cols-sm="3"
                        label-align-sm="right"
                        label-size="sm"
                        class="mb-0"
                    >
                        <b-input-group size="sm">
                            <b-form-input
                                id="filter-input"
                                v-model="filter"
                                type="search"
                                placeholder="Type to Search"
                            ></b-form-input>

                            <b-input-group-append>
                                <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                </b-col>
            </b-row> 
            <b-row>
                <b-col>
                    <b-table responsive striped hover show-empty :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter" label-sort-asc="" label-sort-desc="" label-sort-clear="">
                        <!-- A virtual column of No -->
                        <template #cell(index)="data">
                            {{ (perPage*(currentPage-1)) + (data.index + 1) }}
                        </template>
                        <!-- A virtual column of Action -->
                        <template #cell(id)="data">
                            <b-button v-b-modal.modal-1 size="sm" variant="primary" @click="editAction(data.item)">
                            Edit
                            </b-button>
                            <b-button v-b-modal.modal-2 size="sm" variant="danger" @click="deleteAction(data.item.id)">
                            Delete
                            </b-button>
                        </template>
                    </b-table>
                    <b-pagination size="md" :total-rows="rows" v-model="currentPage" :per-page="perPage" align="center"></b-pagination>
                </b-col>
            </b-row>
        </div>
    </b-overlay>
</template>
<script>
import { etbparamStore } from '../../stores/etbparam_store'

export default{
    setup(){
        const store = etbparamStore()
        return{
            store
        }
    },
    props:{
        editAction: Function,
        deleteAction: Function
    },
    data() {
        return {
            fields: [
                {
                    key: 'index',
                    label: 'No',
                    sortable: false,
                },
                {
                    key: 'product_code',
                    label: 'Product Code',
                    sortable: false,
                },
                {
                    key: 'product_desc_id',
                    label: 'Description ID',
                    sortable: false
                },
                {
                    key: 'product_desc_en',
                    label: 'Description EN',
                    sortable: false,
                },
                {
                    key: 'max_account',
                    label: 'Maksimal Pembukaan Rekening',
                    sortable: false
                },
                {
                    key: 'initial_deposit',
                    label: 'Setoran Awal',
                    sortable: false
                },
                {
                    key: 'id',
                    label: 'Action',
                    sortable: false
                },
            ],
            currentPage: 1,
            perPage: 5,
            pageOptions: [5, 10, 25, 50, 100],
            filter: null,
        };
    },
    computed:{
        rows(){
            return this.items.length
        },
        fetchParams(){
            return this.store.fetchParams()
        },
        isShow(){
            return this.store.loader
        },
        items(){
            return this.store.params.datas
        }
    },
    methods: {
        fetcData(){
            this.fetchParams
        },
    },
    created(){
       return this.fetcData()
    }
}
</script>