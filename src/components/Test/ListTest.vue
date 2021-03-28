<!-- Como trabajo futuro se plantea una vista administrativa para genear diferentes test en la institudion
Este modulo permitirá administrar los test a los profesores de la institucion a pesar de estar en el proyecto no hace parte
de los objetivos planteados para la tesis -->

<template lang="html">
    <div class="container">
        <div class="row">
            <div class="col text-left">
                <div>
                <h2>Listado de libros</h2>
                <b-button size="sm" :to="{name: 'NewTest'}" variant="primary">
                    Nuevo Libro
                </b-button>
                </div>
                <br>
                <div class="col-md-12">
                    <b-table striped hover :items = "test" :fields = "fields">
                        <template v-slot:cell(action)="data">
                            <b-button size="sm" variant="primary" :to="{ name: 'EditTest', params: {testId: data.item.id}}">
                                Editar
                            </b-button>
                            <b-button size="sm" variant="danger" :to="{ name: 'Delete', params: {testId: data.item.id}}">
                                Eliminar
                            </b-button>
                        </template>                
                    </b-table>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return{
            fields: [
                { key: 'title', label: 'Título'},
                { key: 'description', label: 'Descripcion'},
                { key: 'action', label: ''}
            ],
            test: [],
            result: []
        }
    }, 
    methods: {
        getTest () {
            const path = 'http://127.0.0.1:8000/api/v1.0/recomendacion/'
            axios.get(path).then((response) => {
                this.test = response.data
                
            })
            .catch((error) => {
                
            })
        },

        getResultado(){
            const path = 'http://127.0.0.1:8000/Resultado'
            axios.get(path).then((response) => {
                this.result = JSON.stringify(response.data)
                console.log(this.result+"Respuesta Django")
                console.log(response.data.columns[0] +" Respuesta Django")
                
            })
            .catch((error) => {
                
            })
        }
    },

    created(){
        this.getTest()
        this.getResultado()
    }
}
</script>

<style lang="css" scoped>

</style>