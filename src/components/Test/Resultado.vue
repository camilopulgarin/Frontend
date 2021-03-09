

<template lang="html">
    <div class="container">
        <div class="row">
            <div class="col text-left">
                <div>
                <h2>Puntuacion Caso de prueba</h2>
                </div>
                <br>
                <div class="col-md-12">
                    <b-table striped hover :items = "Puntos" :fields = "fields">
                                       
                    </b-table>
                </div>
            </div>

        </div>
        <div class="row">
            <b-form-group label="Using options array:" v-slot="{ ariaDescribedby }">
      <b-form-checkbox-group
        id="checkbox-group-1"
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        name="flavour-1"
      ></b-form-checkbox-group>
    </b-form-group>

    <b-form-group label="Using sub-components:" v-slot="{ ariaDescribedby }">
      <b-form-checkbox-group
        id="checkbox-group-2"
        v-model="selected"
        :aria-describedby="ariaDescribedby"
        name="flavour-2"
      >
        <b-form-checkbox value="orange">Orange</b-form-checkbox>
        <b-form-checkbox value="apple">Apple</b-form-checkbox>
        <b-form-checkbox value="pineapple">Pineapple</b-form-checkbox>
        <b-form-checkbox value="grape">Grape</b-form-checkbox>
      </b-form-checkbox-group>
    </b-form-group>

    <div>Selected: <strong>{{ selected }}</strong></div>
        </div>

    </div>
    
</template>

<script>
import axios from 'axios';
import  cookies  from  'js-cookie'

export default {
    data() {
        return{
            fields: [
                { key: 'Mecanica', label: 'Mecanica'},
                { key: 'Telecomunicaciones', label: 'Telecomunicaciones'},
                { key: 'Electronica', label: 'Electronica'},
                { key: 'Fundicion', label: 'Fundicion'},
                { key: 'Electricidad', label: 'Electricidad'},
                { key: 'Dibujo', label: 'Dibujo'},
                { key: 'Diseño', label: 'Diseño'},
                { key: 'action', label: ''}
            ],
            selected: [],
            test: [],
            result: [],
            Puntos: [],
            options: [
          { text: 'Orange', value: 'orange' },
          { text: 'Apple', value: 'apple' },
          { text: 'Pineapple', value: 'pineapple' },
          { text: 'Grape', value: 'grape' }
        ],
            
        }
    }, 
    methods: {
        getTest () {
            const path = 'http://127.0.0.1:8000/api/v1.0/recomendacion/'
            axios.get(path).then((response) => {
                this.test = response.data
                console.log( JSON.stringify(response.data) +" Respuesta Django")
            })
            .catch((error) => {
                
            })
        },

        getResultado(){
            const path = 'http://127.0.0.1:8000/Resultado'
            axios.get(path).then((response) => { 
                this.result = JSON.stringify(response.data)
                console.log(this.result+"Respuesta Django")
                const cookie = cookies.get('csrftoken')
                console.log(cookie)
                var resultados = [{'Mecanica' : response.data.data[0][0],
                                  'Telecomunicaciones'  : response.data.data[0][1],
                                  "Electronica" : response.data.data[0][2],
                                  "Fundicion" : response.data.data[0][3],
                                  "Electricidad"  : response.data.data[0][4],
                                  "Dibujo" : response.data.data[0][5], 
                                  "Diseño" : response.data.data[0][6]}];

                console.log(resultados +" Respuesta JSON")
                //this.Puntos = response.data.data
                this.Puntos = resultados 
                this.result = prueba
            })
            .catch((error) => {
                
            })
        },
        PostTest () {
            const path = 'http://127.0.0.1:8000/Post'
            axios.post(path,{"Mecanica":0.8,
                            "Telecomunicaciones":1,
                            "Electronica": 0.6,
                            "Fundicion":0.8,
                            "Electricidad":0.4,
                            "Dibujo":0.8,
                            "Diseño":0.6}).then((response) => {
                this.test = response.data
                console.log( JSON.stringify(response.data) +" Respuesta Post")
            })
            .catch((error) => {
                
            })
        },
    },

    created(){
        this.getTest()
        this.getResultado()
        this.PostTest()
    }
}
</script>
<style lang="css" scoped>

</style>