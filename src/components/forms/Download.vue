<template>
    <JsonExcel
    class="btn btn-outline-secondary btn-sm"
    :data="json_data"
    :fields="json_fields"
    :worksheet="worksheet_name"
    :name="file_name"
    :type="file_type"
    ><BIcon icon="download"></BIcon>&nbsp;&nbsp;&nbsp;DOWNLOAD</JsonExcel>
</template>
<script>
import JsonExcel from 'vue-json-excel3'
export default{
    props:{
        json_data: Object,
        json_fields: Object,
        file_name: String,
        file_type: String,
        worksheet_name: String
    },
    components:{
        JsonExcel,
    }
    
}
</script>