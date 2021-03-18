<template lang="html">
    <div class="container">
        <div class="row">
            <div class="col-12 text-left">
                <h1 style="margin-top:40px">ICONOS</h1>
                <div class="row">
                    <div class="col-12">
                    <h2 style="margin-top:40px">ÚNICA RESPUESTA</h2>
                    <p style="font-size:30px margin-top:40px">Toda pregunta que tenga el icono <img  src="../../assets/iconos/UR.png" height=30px width=40px />, 
                    es una pregunta con única respuesta y por esto se debe elegir una sola opción</p>
                    <h2 style="margin-top:40px">Como se puede observar en este ejemplo</h2><br>
                    <div style="width:400">
                    <img  src="../../assets/iconos/captura-UR.png" width=100% />
                    </div>
                    <h2 style="margin-top:40px">MULTIPLE RESPUESTA</h2>
                    <p style="margin-top:10px; font-size:30px">Toda pregunta que tenga el icono <img  src="../../assets/iconos/MR.png" height=30px width=40px />, 
                    es una pregunta con múltiple respuesta y por esto se debe elegir todas las opciones mostradas,
                    en el caso de este test solo existe una pregunta de este tipo la cual exige que todas sus opciones sean
                    señaladas</p>
                    <h2 style="margin-top:40px">Como se puede observar en este ejemplo</h2><br>
                    <div style="width:400">
                    <img  src="../../assets/iconos/captura-MR.png" width=100% />
                    <p style="margin-top:10px; font-size:30px">La pregunta exige que se señalen todas las opciones para poder obtener la calificación</p>
                    <h2 style="margin-top:40px">PASO FINAL!</h2><br>
                    <img  src="../../assets/iconos/captura-MR2.png" width=100% />
                    <p style="margin-top:10px; font-size:30px">Después de seleccionar todas las posibles respuestas, el sistema permite enviar los datos 
                        para proceder a recomendar los talleres
                    </p>

                    <h1 style="margin-top:40px">Resultados</h1><br>
                     <p style="margin-top:10px; font-size:30px">
                         AquÍ se te mostrará el orden de los talleres que te recomendó el sistema de acuerdo a tu perfil
                    </p>
                    <img  src="../../assets/iconos/Calificacion.png" width=100% />

                    <h1 style="margin-top:40px">Realiza la encuesta</h1><br>
                    <p style="margin-top:10px; font-size:30px">
                         Tu opinión es muy importante para mejorar, realiza la encuesta del suiguiente link:
                         <a href="https://forms.gle/ubKhZam7tFVF2w3H9" target="_blank"> LIK DE ENCUESTA</a>

                    </p>
                    <h1 style="margin-top:40px">calificación la aplicación</h1><br>
                    <p style="margin-top:10px; font-size:30px">
                         Según tu nivel de conformidad, califica la aplicación oprimiendo uno de los dos botones
                    </p>
                    <img style="margin-bottom: 50px" src="../../assets/iconos/Likes-encuesta.png" width=100% />
                    </div>
                    </div>
                    
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