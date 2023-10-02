<template>
    <b-overlay :show="isShow" variant="white" rounded="sm">
        <div v-if="isLength > 0">
                       
            <b-row class="row-header-result">
                <b-col><BIcon icon="hdd-stack" variant="danger"></BIcon> <span style="color: #E26A6A;font-weight: bold;">RESULT</span></b-col>
                <b-col md="2">
                    <Download :json_data="rowsDownload" :json_fields="jsonFields" :file_name="fileName" :file_type="fileType" :worksheet_name="worksheetName"></Download>
                </b-col>
            </b-row>
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
                            @change="fetchHistory"
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
                    <b-table responsive striped hover show-empty :items="items" :fields="fields" :current-page="currentPage" :per-page="0" :filter="filter" label-sort-asc="" label-sort-desc="" label-sort-clear="">
                        <!-- A virtual column of No -->
                        <template #cell(index)="data">
                            {{ (perPage*(currentPage - 1)) + (data.index + 1) }}
                        </template>
                    </b-table>
                    <b-pagination size="md" :total-rows="totalItems" v-model="currentPage" :per-page="perPage" align="center"></b-pagination>
                </b-col>
            </b-row>
        </div>
    </b-overlay>
</template>
<script>
import { mbmpStore } from '../../stores/mbmp_store';
import Download from '../forms/Download.vue';

export default{
    components:{
        Download
    },
    setup(){
        const store = mbmpStore()
        return{
            store
        }
    },
    props:{
        StartDate: String,
        EndDate: String,
        __currentPage: Number
    },
    data(){
        return {
            fields: [
                {
                    key: 'index',
                    label: 'No',
                    sortable: false,
                },
                {
                    key: 'account_number',
                    label: 'No. rekening',
                    sortable: true,
                },
                {
                    key: 'fullname',
                    label: 'Nama',
                    sortable: true
                },
                {
                    key: 'phone',
                    label: 'No. HP',
                    sortable: true,
                },
                {
                    key: 'email',
                    label: 'Email',
                    sortable: true
                },
                {
                    key: 'mother_maid_name',
                    label: 'Nama Ibu Kandung',
                    sortable: true
                },
                {
                    key: 'id_type',
                    label: 'Tipe ID Card',
                    sortable: true
                },
                {
                    key: 'id_number',
                    label: 'NIK',
                    sortable: true
                },
                {
                    key: 'birth_date',
                    label: 'Tanggal Lahir',
                    sortable: true
                },
                {
                    key: 'birth_city',
                    label: 'Tempat Lahir',
                    sortable: true
                },
                {
                    key: 'gender',
                    label: 'gender',
                    sortable: true
                },
                {
                    key: 'address',
                    label: 'Alamat',
                    sortable: true
                },
                {
                    key: 'address_area',
                    label: 'Kelurahan',
                    sortable: true
                },
                {
                    key: 'nationality',
                    label: 'Kewarganegaraan',
                    sortable: true
                },
                {
                    key: 'occupation',
                    label: 'Pekerjaan',
                    sortable: true
                },
                {
                    key: 'created_date',
                    label: 'Created At',
                    sortable: true
                }
            ],
            currentPage: this.__currentPage,
            perPage: 5,
            pageOptions: [5, 10, 25, 50, 100],
            filter: null,
            jsonFields: {
                "No. rekening": "account_number",
                Nama: "fullname",
                "No. HP": "phone",
                Email: "email",
                "Nama Ibu Kandung": "mother_maid_name",
                "Tipe ID Card": "id_type",
                NIK: "id_number",
                "Tanggal Lahir": "birth_date",
                "Tempat Lahir": "birth_city",
                Gender: "gender",
                Alamat: "address",
                Kelurahan: "address_area",
                Kewarganegaraan: "nationality",
                Pekerjaan: "occupation",
                "Created At": "created_date"
            },
            fileName: "historyMBxMP",
            fileType: "xlsx",
            worksheetName: "Sheet1",
        }
    },
    computed:{
        isShow(){
            return this.store.loader
        },
        isLength(){
            return this.store.history.datas.content.length
        },
        rowsDownload(){
            return this.store.donwload.datas.rows
        },
        fetchHistory(){
            return this.store.fetchHistory(this.currentPage - 1, this.perPage, this.StartDate, this.EndDate)
        },
        items(){
            return this.store.history.datas.content
        },
        totalItems(){
            return this.store.history.datas.totalItems
        }
    },
}
</script>