<template lang="html">
    <div class="container">
        <div class="row">
            <div class="col ">
                
                <h3>Estas seguro de eliminar esta pregunta?</h3>
                <p>Titulo: {{ this.element.title}}</p>
                <p>Descripcion: {{ this.element.description}}</p>
            </div>
        </div>

        <div class="row">
        <div class="col">
            <b-button v-on:click="deleteTest" variant="danger">Eliminar</b-button>
        </div>

    </div>

    </div>
    

</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';

export default {
    data(){
        
        return{
            testId: this.$route.params.testId,
            element: {
                title: '',
                description: ''

            }
        }
    },
     methods: {
        deleteTest(evt){
            evt.preventDefault()
            const path = 'http://127.0.0.1:8000/api/v1.0/recomendacion/'+this.testId+'/'
        
            axios.delete(path).then((response)=>{
                location.href = '/Test'
                swal("Libro Borrado!", "", "success")
            })

            .catch((error) => {
                swal("No se puede eliminar esta pregunta", "", "error")
                console.log(error)
            })
        },

        getTest(){
            const path = 'http://127.0.0.1:8000/api/v1.0/recomendacion/'+this.testId+'/'
        
            axios.get(path).then((response)=>{
                this.element.title = response.data.title
                this.element.description = response.data.description
            })

            .catch((error) => {
                console.log(error)
            })
        }
    },
    created() {
        this.getTest()
    }
    
}
</script>

<style lang="css" scoped>

</style>