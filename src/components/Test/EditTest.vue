<!-- Como trabajo futuro se plantea una vista administrativa para genear diferentes test en la institudion
Este modulo permitirá editar test a los profesores de la institucion a pesar de estar en el proyecto no hace parte
de los objetivos planteados para la tesis -->
<template lang="html">
    <div class="container">
        <div class="row">
            <div class="col text-left">
                <h2>Editar Test</h2>
            </div>
        </div>
        
        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <form @submit="onSubmit">
                            <div class="form-group row">
                                <label for="title" class="col-sm-2 col-form-label">Titulos</label>
                                <div class="col-sm-6">
                                    <input type="text" placeholder="Titulo" name="title" class="form-control" v-model.trim="form.title">
                                </div>    
                            </div>
                            <div class="form-group row">
                                <label for="description" class="col-sm-2 col-form-label">Descripcion</label>
                                <div class="col-sm-6">
                                    <textarea name="description" class="form-control" placeholder="Descripcion" rows="3" v-model.trim="form.description"></textarea>
                                </div>    
                            </div>
                            <div class="rows">
                                <div class="col text-left">
                                    <b-button type="submit" variant="primary">Editar</b-button>
                                    <b-button type="submit" class="btn-large-space" :to="{ name: 'ListTest'}">Cancelar</b-button>
                                </div>                                 
                            </div>
                        </form>
                    </div>
                </div>
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
            form: {
                title: '',
                description: ''

            }
        }
    },
    methods: {
        onSubmit(evt){
            evt.preventDefault()
            const path = 'http://127.0.0.1:8000/api/v1.0/recomendacion/'+this.testId+'/'
        
            axios.put(path, this.form).then((response)=>{
                this.form.title = response.data.title
                this.form.description = response.data.description
                swal("Libro Actualizado!", "", "success")
            })

            .catch((error) => {
                console.log(error)
            })
        },

        getTest(){
            const path = 'http://127.0.0.1:8000/api/v1.0/recomendacion/'+this.testId+'/'
        
            axios.get(path).then((response)=>{
                this.form.title = response.data.title
                this.form.description = response.data.description
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