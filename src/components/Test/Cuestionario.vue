<!-- En este archivo se define toda la estructura visual del cuestionario -->

<template lang="html">
    <div class="container-fluid" style = "background-image:'../../assets/Banner.jpeg'; heigth:100vh">
        <div v-if="loading">
            <div class="modalx">
                <div class="container" style="margin-left: 43%;margin-right: 20%;margin-top: 20%;">
                <pacman-loader :loading = "loading " :color = "color"></pacman-loader>
                </div>
            </div>
        </div>
       <!-- Button trigger modal -->
    <div>
        <b-button @click="modalShow = !modalShow" style="display: none">Open Modal</b-button>

        <b-modal v-model="modalShow" ok-only>
            <div class="accordion" role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-1 variant="info" style="font-size: 30px; background-color: #090e3c;">Información y recomendaciones</b-button>
      </b-card-header>
      <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text style="font-size: 19px; text-align: justify;">El sistema de recomendación Starway-sr se desarrolló con el fin de apoyar el proceso de elección de especialidades en la institución y dar a conocer el perfil de cada usuario según los talleres que brinda el colegio. Todo esto se hace debido a la problemática de deserción estudiantil que genera una elección de especialidad errónea. En esta prueba se evalúan aspectos académicos, aptitudes y preferencias de los usuarios que la realizan, con el fin de relacionar sus respuestas con los posibles talleres que más se ajustan a su perfil, haciendo uso de la medida numérica Tf-idf.<br>
        <br>Al finalizar la prueba se le hará una recomendación en orden descendente, donde el primer taller es el que más se ajusta a su perfil y el ultimo es el menos relevante para su perfil según la calificación del sistema de recomendación, cabe resaltar que el resultado otorgado por la aplicación no define sus capacidades o preferencias en su totalidad, por ende, no debe tomarse como único criterio para tomar su decisión final de especialidad técnica. 
        </b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-2 variant="info" style="font-size: 30px; background-color: #090e3c;">Instrucciones</b-button>
      </b-card-header>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text style="font-size: 19px; text-align: justify;">
              El siguiente test está conformado por 28 preguntas de las cuales las primeras 27 son de única respuesta y se representan con el icono UR y una pregunta final de múltiple respuesta que se representa con el icono MR, donde el usuario debe seleccionar todas las opciones en el orden que considere, ejemplo: A, C, D, F, E, B, G y de esta forma ordenar los talleres según su nivel de agrado.<br>
              <br>Al finalizar se le mostrará una tabla ordenada de mayor a menor con la puntuación arrojada por el sistema en cada uno de los talleres, como paso final puede calificar la herramienta y dirigirse a la encuesta ubicada en la parte inferior de su pantalla.<br>
              Para más información visite el siguiente enlace: <a href="/Informacion" target="_blank">Pagina informativa</a>
        </b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>
    </div>
    </b-modal>
    </div>

<!-- Modal 
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>-->
  
        <!-- La variable condicion utiliza para validar si el usuario ya terminó el test 
             y llevarlo a la vista de resultados y calificacion del sistema condicion
        -->
        <div v-if="condicion">
         <!-- Test -->
         
        <div class="col-md-12 text-center" style="height: 100vh">
            <!-- Se utiliza el componente paginate para representar el test en una sola pregunta por pantalla,
                 que facilita el uso al usuario y reduce tiempos de carga en la vista -->
            <paginate ref="paginator" name = "preg" :list = "preg" :per = "1" style="padding-left: 0px; padding-right: 0px; margin-bottom: 0px;">
                <div v-for="(pregunta, key) in paginated('preg')" :key="key" style="margin-top: 5px; border-radius: 3%;">
                    <p v-text="pregunta.enunciado" class="parrafo"> </p>
                    
                    <div style="font-size: 20px; background-color: #ffff"><strong>Pregunta {{ pregunta.id + 1}} de 28</strong></div>
                    <!-- Se define una tabla dinamica para la ultima pregunta donde el usuario puede ordenar los talleres
                    a su gusto dinamicamente -->
                    <div v-if="pregunta.id === 27 && calificacion.length > 27"> 
                        <div class="row">
                        <div class="col-sm-12 col-md-8 col-lg-7">
                        <img :src="getImgUrl(pregunta.img)" alt="200" class="img-thumbnail img-preguntas" >
                        </div>
                        <div class="col-sm-12 col-md-4 col-lg-5">
                        <table class="table">
                        <thead class="table-dark">
                            <tr>
                            <th scope="col">Posicion</th>
                            <th scope="col">Taller</th>
                            </tr>
                        </thead >
                        <tbody style="background-color: #ffff">
                            <tr>
                            <th scope="row">1</th>
                            <td  v-if="calificacion[27].length > 0">{{ calificacion[27][0]}}</td>
                            </tr>
                            <tr>
                            <th scope="row">2</th>
                            <td v-if="calificacion[27].length > 1">{{ calificacion[27][1]}}</td>
                            </tr>
                            <tr>
                            <th scope="row">3</th>
                            <td v-if="calificacion[27].length > 2">{{ calificacion[27][2]}}</td>
                            </tr>
                            <tr>
                            <th scope="row">4</th>
                            <td v-if="calificacion[27].length > 3">{{ calificacion[27][3]}}</td>
                            </tr>
                            <tr>
                            <th scope="row">5</th>
                            <td v-if="calificacion[27].length > 4">{{ calificacion[27][4]}}</td>
                            </tr>
                            <tr>
                            <th scope="row">6</th>
                            <td v-if="calificacion[27].length > 5">{{ calificacion[27][5]}}</td>
                            </tr>
                            <tr>
                            <th scope="row">7</th>
                            <td v-if="calificacion[27].length > 6">{{ calificacion[27][6]}}</td>
                            </tr>
                        </tbody>
                        </table>
                        <b-button v-if="calificacion[27].length > 6" variant="success" v-on:click="onSubmit" style="margin-top:15px; font-size: 30px">Enviar Respuestas</b-button>
                        </div>
                        </div>
                        
                    </div>
                <!-- Se Define la estructura de las preguntas del cuestionario recorriendo las preguntas de la BD -->
                     <img v-else :src="getImgUrl(pregunta.img)" alt="200" class="img-thumbnail" style="border-radius: 3%; max-height:400px; width: 600px;">
                <div class="container-fluid" >
                <div class="row" style="    background-color: white; border-radius: 2%"> 
                    <div class="col-3 col-sm-2 col-lg-2 col-md-2"  v-for="(resp, i) in pregunta.respuestas" :i="i">
                        <!--<h1  v-text="pregunta.respuestas[i]" >
                        </h1>-->
                        <b-form-group  v-slot="{ ariaDescribedby }" >
                            <b-form-checkbox-group 
                                class="customCheck1"
                                buttons
                                :id="pregunta.id.toString()"
                                v-model="calificacion[pregunta.id]"
                                :preg="pregunta.respuestas[i]"
                                :aria-describedby="ariaDescribedby"
                                name="flavour-2"
                                type="radio"
                                 

                            >
                            <!--<h1>{{pregunta.id}}</h1>-->
                                <b-form-checkbox style="margin: 4px;" class="opciones" :id="pregunta.id.toString()" name="check-button"  button button-variant="info" v-bind:value=pregunta.valor[i]>{{pregunta.respuestas[i]}}
                                    
                                    <!--<img src="../../assets/logo.png" alt="200" class="img-thumbnail">-->
                                </b-form-checkbox>
                            </b-form-checkbox-group>
                        </b-form-group>
                        
                        
                    </div>
                    
                </div>
            
            <!--<div>Selected: <strong>{{ calificacion[27]}}</strong></div>-->
            <!--<div>Selected: <strong>{{ Resultado }}</strong></div>-->
            </div>
                
            </div>
            </paginate>
            <div class="row">
               <paginate-links
                style="padding-left: 0px; padding-right: 0px; font-size:20px !important;"
                for="preg"
                :show-step-links="true"
                :simple="{
                    prev: '<Anterior',
                    next: 'Siguiente>'  
                }"
               ></paginate-links>
            </div>
      </div>
      
      </div>
      <div class="container" v-else style="background-color: #ffffffd9; ">
          <div class="row row-content align-items-center">
                <div  class="col-12 ">
                    <p class="Titulo-Result">Starway-SR te recomienda: </p>
            </div>
            </div>
        <div class="row row-content align-items-center">
            <div  class="col-12 ">
            <b-card no-body class="overflow-hidden" style="max-width: 1000px;">
                <b-row no-gutters>
                <b-col md="6">
                    <div v-if="Ponderado[0].Taller == 'Telecomunicaciones'">
                        <img src="../../assets/satellite.jpg" alt="200" class="img-thumbnail">
                    </div>
                    <div v-if="Ponderado[0].Taller == 'Mecanica'">
                        <img src="../../assets/PortadaMecanica.jpg" alt="200" class="img-thumbnail">
                    </div>
                    <div v-if="Ponderado[0].Taller == 'Diseño'">
                        <img src="../../assets/ProdadaDiseno.jpg" alt="200" class="img-thumbnail">
                    </div>
                    <div v-if="Ponderado[0].Taller == 'Dibujo'">
                        <img src="../../assets/PortadaDibujo.jpg" alt="200" class="img-thumbnail">
                    </div>
                    <div v-if="Ponderado[0].Taller == 'Electronica'">
                        <img src="../../assets/PortadaElectronica.jpg" alt="200" class="img-thumbnail">
                    </div>
                    <div v-if="Ponderado[0].Taller == 'Fundicion'">
                        <img src="../../assets/PortadaFundicion.jpg" alt="200" class="img-thumbnail">
                    </div>
                    <div v-if="Ponderado[0].Taller == 'Electricidad'">
                        <img src="../../assets/PortadaElectricidad.jpg" alt="200" class="img-thumbnail">
                    </div>
                </b-col>
                <b-col md="6">
                    <b-card-body  v-bind:title= Ponderado[0].Taller>
                    
                    <div v-if="Ponderado[0].Taller == 'Telecomunicaciones'">
                        <img src="../../assets/Telecom.png">
                    </div>
                    <div v-if="Ponderado[0].Taller == 'Mecanica'">
                        <img src="../../assets/TMecanica.png">
                    </div>
                    <div v-if="Ponderado[0].Taller == 'Electricidad'">
                        <img src="../../assets/Electricidad.png">
                    </div>
                    <div v-if="Ponderado[0].Taller == 'Fundicion'">
                        <img src="../../assets/TFundicion.png">
                    </div>
                    <div v-if="Ponderado[0].Taller == 'Diseño'">
                        <img src="../../assets/Diseño.png">
                    </div>
                    <div v-if="Ponderado[0].Taller == 'Dibujo'">
                        <img src="../../assets/Dibujo.png">
                    </div>
                    <div v-if="Ponderado[0].Taller == 'Electronica'">
                        <img src="../../assets/Electronica.png">
                    </div>
                    <b-card-text style="text-align: justify; margin-top: 15px">
                        Según el sistema de recomendación el taller que mas se ajusta a sus aptitudes y preferencias es: <b>{{Ponderado[0].Taller}}</b>. 
                        Sin embargo, el taller de <b>{{Ponderado[1].Taller}}</b> y de <b>{{Ponderado[2].Taller}}</b> no deberían descartarse.
                    </b-card-text>
                    </b-card-body>
                </b-col>
                </b-row>
            </b-card>
            </div>
            </div>    
        
        <div class="row row-content align-items-center">
            <div  class="col-12">
                <p class="Titulo-Result">Puntuación general</p>
        </div>
        </div>
        <div class="row row-content align-items-center">
            <div  class="col-12 col-sm-6 ">
                <b-table style="background-color: white; overflow-x:auto;" class="table" striped hover :items="Ponderado"></b-table>
            </div>
            <div class="col-12 col-sm-6">
                <pie-chart  :data="chartData" :options="chartOptions"></pie-chart>
            </div>
            <div class="col-12">
                
                <div class="card card-body bg-light">
                    <blockquote class="blockquote">
                        <div class="card" >
                        <h3 class="card-header bg-primary text-white" style="background-color: #1b0085 !important font-weight: bold;">¡ No olvides calificar la recomendacion !</h3>
                        <div class="card-body">
                            <dl class="row">
                                
                                <dt class="col-6">
                                    <button v-on:click="Likes(1)" style="background-color: transparent; border: 0;">
                                    <img style="height: 60px;" src="../../assets/iconos/like1.png" alt="200"/>
                                    </button> 
                                </dt>
                                <dd class="col-6">
                                    <button v-on:click="Likes(0)" style="background-color: transparent; border: 0;">
                                     <img style="height: 60px;" src="../../assets/iconos/dislike1.png" alt="200"/>
                                    </button>
                                </dd>
                                
                            </dl>
                            
                                
                            
                        </div>
                    </div>
                        <footer class="blockquote-footer" style="font-weight: bold;">
                            Tu opinion es importante para el crecimiento de la aplicacion <br>
                            responde esta encuesta:<a href="https://forms.gle/ubKhZam7tFVF2w3H9" target="_blank"> LIK DE ENCUESTA</a>

                        </footer>
                    </blockquote>
                </div>
            </div>
        </div>
        
      

      </div>
    </div>
    
</template>

<script>
import axios from 'axios';
import  cookies  from  'js-cookie';
import '../../assets/Cuestionario.css'
import PieChart from "./Grafica.js";
import  PacmanLoader  from  'vue-spinner/src/PacmanLoader.vue';
export default {
    components: {
    
    PieChart,
    PacmanLoader
    
  },
    data() {
        return{
        loading :false,
        color : "#fff",
        modalShow: true,
        chartOptions: {
        hoverBorderWidth: 20

        },
        chartData: {
            hoverBackgroundColor: "red",
            hoverBorderWidth: 10,
            labels: ["Electricidad","Mecanica","Fundicion", "Diseño","Dibujo", "Telecomunicaciones","Electronica"  ],
            datasets: [
            {
                label: "Data One",
                backgroundColor: ["#fff80c","#004085","#e41111", "#a0cff9", "#b501ff", "#11e42b","#ff822a"],
                data: [6, 10, 5, 15, 7, 12, 20]
            }
            ]
        },
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
            condicion: true,
            test: [],
            preguntasT: [],
            result: [],
            Puntos: [],
            options: [
          { text: 'Orange', value: 'orange' },
          { text: 'Apple', value: 'apple' },
          { text: 'Pineapple', value: 'pineapple' },
          { text: 'Grape', value: 'grape' }
        ],
        Preguntas: ['1','2','3','4'],
        preg: [],
        calificacion:[],
        Resultado:[],
        calif : [],
        paginate:['preg'],
        Puntuacion:[6, 10, 5, 15, 7, 12, 20],
        Top : [],
        SR : [],
        Ponderado: [],
        dataPuntos:[],
        preg27: []
        
            
        }
    }, 
    methods: {
        /*{enunciado:"Pregunta - 1", respuestas:["a","b","c"],valor:["a","b","M"], correcta:"c", id:"m1"},
                {enunciado:"Pregunta - 2", respuestas:["a","b","c"],valor:["a","b","M"],correcta:"c", id:"m4"},
                {enunciado:"Pregunta - 3", respuestas:["a","b"],valor:["a","b","M"],correcta:"a",id:"m3"},
                {enunciado:"Pregunta - 4", respuestas:["a","b","c","d","e","f","g"],valor:["a","b","M","d","e","f","g"],correcta:"c", id:"m5"},*/ 
        
        // Almacena la calificacion del usuario y la envia a la api que se encarga de almacenarla
        Likes(tipo) {
            const path = 'https://apirs.herokuapp.com/likes'
            axios.post(path,{"calif":tipo}).then((response) => {
                 console.log( JSON.stringify(response.data) +" Respuesta Precision")
                //console.log( JSON.stringify(response.data) +" Respuesta de Django")
                window.location.href = '/'
                
            })
            
            .catch((error) => {
                 console.log("ERROR")
            })
        },
        //Ordena las especialidades segun la calificacion del usuario para representarlas visualmente en la vista de resutados

        Ordenar () {
            var total = this.dataPuntos[0] + this.dataPuntos[1] + this.dataPuntos[2] + this.dataPuntos[3] +
            this.dataPuntos[4] + this.dataPuntos[5] + this.dataPuntos[6]
            var json = [{"Taller":"Electricidad", 'puntos' : ((this.dataPuntos[0] / total) * 100 ).toFixed(1)},
                        {"Taller":"Mecanica", 'puntos' : ((this.dataPuntos[1] / total) * 100 ).toFixed(1)},
                        {"Taller":"Fundicion", 'puntos' : ((this.dataPuntos[2] / total) * 100 ).toFixed(1)},
                        {"Taller":"Diseño", 'puntos' : ((this.dataPuntos[3] / total) * 100 ).toFixed(1)},
                        {"Taller":"Dibujo", 'puntos' : ((this.dataPuntos[4] / total) * 100 ).toFixed(1)},
                        {"Taller":"Telecomunicaciones", 'puntos' : ((this.dataPuntos[5] / total) * 100 ).toFixed(1)},
                        {"Taller":"Electronica", 'puntos' : ((this.dataPuntos[6] / total) * 100 ).toFixed(1)}]
            function ordenarAsc(p_array_json, p_key) {
                p_array_json.sort(function (a, b) {
                    return b[p_key] - a[p_key] ;
                });
            }
            ordenarAsc(json, 'puntos')
            console.log(JSON.stringify(json))
            this.Ponderado = json
        },

    
        getTest () {
            //const path = 'http://127.0.0.1:8000/api/v1.0/recomendacion/'
            const path = 'https://apirs.herokuapp.com/api/v1.0/recomendacion/'
            axios.get(path).then((response) => {
                this.test = response.data
                //console.log( JSON.stringify(response.data) +" Respuesta de Django")
            })
            .catch((error) => {
                
            })
        },
        
        //Se utiliza para representar dinamicamente las imagenes en la vista
        getImgUrl(pic) {
        return require('../../assets/Preguntas/'+pic)
        },


        // Se encarga de enviar la calificacion del test para retornar la precision del algoritmo
        PostPre() {
            const path = 'https://apirs.herokuapp.com/Pre'
            
            var SRR = this.SR
            console.log("this.Puntos",SRR)
            axios.post(path,{"SR":SRR,"Top":this.Top,"Tipo":"1"}).then((response) => {
                // console.log( JSON.stringify(response.data) +" Respuesta Precision")
                //console.log( JSON.stringify(response.data) +" Respuesta de Django")
                this.loading = false
            })
            this.loading = false
            .catch((error) => {
                 console.log("ERROR")
            })
        },


        // Trae la calificacion retornada por el sistema de recomendacion
        getResultado(){
            const path = 'https://apirs.herokuapp.com/Resultado'
            axios.get(path).then((response) => { 
                this.result = JSON.stringify(response.data)
                //console.log(this.result+"Respuesta Django")
                const cookie = cookies.get('csrftoken')
                //console.log(cookie)
                var resultados = [{'Mecanica' : response.data.data[0][0],
                                  'Telecomunicaciones'  : response.data.data[0][1],
                                  "Electronica" : response.data.data[0][2],
                                  "Fundicion" : response.data.data[0][3],
                                  "Electricidad"  : response.data.data[0][4],
                                  "Dibujo" : response.data.data[0][5], 
                                  "Diseño" : response.data.data[0][6]}];

                //console.log(resultados +" Respuesta JSON")
                //this.Puntos = response.data.data
                this.Puntos = resultados 
                this.result = prueba
            })
            .catch((error) => {
                
            })
        },

        // Envia la calificacion del usuario en el test y la envia al sistema de recomendacion 
        PostTest () {
            const path = 'https://apirs.herokuapp.com/Post'
            
            axios.post(path,{"Mecanica": this.Resultado[0]["Mecanica"] / 12,
                            "Telecomunicaciones":this.Resultado[0]["Telecomunicaciones"] / 12,
                            "Electronica": this.Resultado[0]["Electronica"] / 12,
                            "Fundicion":this.Resultado[0]["Fundicion"] / 12,
                            "Electricidad":this.Resultado[0]["Electricidad"] / 12,
                            "Dibujo": this.Resultado[0]["Dibujo"] / 12,
                            "Diseño": this.Resultado[0]["Diseño"] / 12}).then((response) => {
                this.test = response.data
                console.log( JSON.stringify(response.data) +" Respuesta Post")
                
                var resultados = [{'Mecanica' : response.data.data[0][0],
                                  'Telecomunicaciones'  : response.data.data[0][1],
                                  "Electronica" : response.data.data[0][2],
                                  "Fundicion" : response.data.data[0][3],
                                  "Electricidad"  : response.data.data[0][4],
                                  "Dibujo" : response.data.data[0][5], 
                                  "Diseño" : response.data.data[0][6]}];
                this.Puntos = resultados
                var totalPuntos =response.data.data[0][4] + response.data.data[0][0] + response.data.data[0][3]+
                                                   response.data.data[0][6]+response.data.data[0][5]+response.data.data[0][1]+
                                                   response.data.data[0][2]
                this.chartData.datasets[0].data = [((response.data.data[0][4] / totalPuntos) * 100 ).toFixed(1),((response.data.data[0][0] / totalPuntos) * 100 ).toFixed(1),((response.data.data[0][3]/ totalPuntos) * 100 ).toFixed(1),
                                                   ((response.data.data[0][6]/ totalPuntos) * 100 ).toFixed(1),((response.data.data[0][5]/ totalPuntos) * 100 ).toFixed(1),((response.data.data[0][1]/ totalPuntos) * 100 ).toFixed(1),
                                                   ((response.data.data[0][2]/ totalPuntos) * 100 ).toFixed(1)]
                this.SR = [response.data.columns,response.data.data[0]]
                this.dataPuntos = [response.data.data[0][4],response.data.data[0][0],response.data.data[0][3],
                                                   response.data.data[0][6],response.data.data[0][5],response.data.data[0][1],
                                                   response.data.data[0][2]]
                this.Ordenar()
                this.condicion = false
                this.PostPre()
                this.loading = false
            })
            .catch((error) => {
                
            })
        },

        // Consulta el listado de preguntas del test 
        getPreguntas () {
            
            this.loading = true
            console.log("this.chartData.datasets.data: ", this.chartData.datasets[0].data)
            const path = 'https://apirs.herokuapp.com/api/v1.0/Preguntas/'
            axios.get(path).then((response) => {
                this.preguntasT = response.data
                //console.log("this.preguntasT", this.preguntasT[0].Electricidad)
                //console.log("this.preguntasT", this.preguntasT)
                for(var i = 0; i < response.data.length; i++){
                    var x = []
                    
                    if(i < 15 || this.preguntasT[i].Tipo == 5){
                        //console.log("Fase--1")
                        var res = this.preguntasT[i].Respuestas.split(",")
                        //console.log(res)
                        x = [{enunciado :this.preguntasT[i].Pregunta, respuestas: res, valor: res,
                              correcta:this.preguntasT[i].Respuesta_Co, id:this.preguntasT[i].id - 3, img:this.preguntasT[i].NumPreg}]
                    }else if(this.preguntasT[i].Tipo == 2 || this.preguntasT[i].Tipo == 6 || this.preguntasT[i].Tipo == 9){
                        //console.log("Fase--2")
                        var res = this.preguntasT[i].Respuesta_Co.split(",")
                        //console.log(res)
                        var res2 = this.preguntasT[i].Respuestas.split(",")
                        //console.log(res2)
                        x = [{enunciado :this.preguntasT[i].Pregunta, respuestas: res, valor:res2,
                              correcta:this.preguntasT[i].Respuesta_Co, id:this.preguntasT[i].id-3, img:this.preguntasT[i].NumPreg}]
                    }else{
                        x = [{enunciado :this.preguntasT[i].Pregunta, respuestas: ["A","B","C"], valor:["A","B","C"],
                              correcta:this.preguntasT[i].Respuesta_Co, id:this.preguntasT[i].id-3, img:this.preguntasT[i].NumPreg}]
                    }
                     
                    
                    //console.log(x)
                    this.preg.push(x[0])
                    //console.log(this.preg)
                    this.loading = false
                
                }
                //{enunciado:"Pregunta - 1", respuestas:["a","b","c"],valor:["a","b","M"], correcta:"c", id:"m1", img:""}
            })
            .catch((error) => {
                
            })
        },

        // Genera la calificacion del test, diferenciando los diferentes tipos de preguntas para retornar los puntos conseguidos en cada taller
        
        Cal_Calificacion(){
            
            var puntosM = 0
            var puntosT = 0
            var puntosDJO = 0
            var puntosDNO= 0
            var puntosF = 0 
            var puntosEA = 0 
            var puntosED= 0
            this.calif = [{Mecanica: puntosM, Telecomunicaciones:puntosT, Electronica: puntosEA, Fundicion:puntosF, Electricidad:puntosED, Dibujo:puntosDJO, Diseño:puntosDNO}]
            //console.log("Preguntas: ", this.preguntasT[0].Tipo)
            for(var i = 0; i < this.preguntasT.length; i++){
                if(i < 15 || this.preguntasT[i].Tipo == "5"){

                    if(this.calificacion[i] == this.preg[i].correcta){
                        //console.log(this.calificacion[i], "==", this.preg[i].correcta, "valores", this.preguntasT[i].Mecanica, "+ ", puntosM)
                        puntosM = puntosM + this.preguntasT[i].Mecanica
                        puntosT = puntosT + this.preguntasT[i].Teleccom
                        puntosDJO = puntosDJO + this.preguntasT[i].Dibujo
                        puntosDNO = puntosDNO + this.preguntasT[i].Diseno
                        puntosF = puntosF + this.preguntasT[i].Fundicion
                        puntosEA = puntosEA + this.preguntasT[i].Electronica
                        puntosED = puntosED + this.preguntasT[i].Electricidad
                        this.calif = [{Mecanica: puntosM, Telecomunicaciones:puntosT, Electronica: puntosEA, Fundicion:puntosF, Electricidad:puntosED, Dibujo:puntosDJO, Diseño:puntosDNO}]
                }

                }else{
                    //console.log("Mal Fase-1" , i)
                }
                if(this.preguntasT[i].Tipo == "2" || this.preguntasT[i].Tipo == "6"){
                    if(this.calificacion[i] == "M"){
                        //console.log("MEC this.calif")
                        this.calif[0].Mecanica = this.calif[0].Mecanica + 1
                    }
                    if(this.calificacion[i] == "T"){
                        //console.log("Telecom this.calif")
                        this.calif[0].Telecomunicaciones = this.calif[0].Telecomunicaciones + 1
                    }
                    
                    if(this.calificacion[i] == "EA"){
                        //console.log("Electronica this.calif")
                        this.calif[0].Electronica = this.calif[0].Electronica + 1
                    }
                    
                    if(this.calificacion[i] == "F"){
                        //console.log("Fundicion this.calif")
                        this.calif[0].Fundicion = this.calif[0].Fundicion + 1
                    }
                    if(this.calificacion[i] == "ED"){
                        //console.log("Electricidad this.calif")
                        this.calif[0].Electricidad = this.calif[0].Electricidad + 1
                    }
                    if(this.calificacion[i] == "DJO"){
                        //console.log("Dibujo this.calif")
                        this.calif[0].Dibujo = this.calif[0].Dibujo + 1
                    }
                    if(this.calificacion[i] == "DNO"){
                        //console.log("Diseño this.calif")
                        this.calif[0].Diseño = this.calif[0].Diseño + 1
                    }
                    if(this.calificacion[i] == "G2"){
                        this.calif[0].Electricidad = this.calif[0].Electricidad + 1
                        this.calif[0].Fundicion = this.calif[0].Fundicion + 1
                        this.calif[0].Electronica = this.calif[0].Electronica + 1
                        this.calif[0].Mecanica = this.calif[0].Mecanica + 1
                        
                    }

                    if(this.calificacion[i] == "G1"){
                        this.calif[0].Diseño = this.calif[0].Diseño + 1
                        this.calif[0].Dibujo = this.calif[0].Dibujo + 1
                        this.calif[0].Telecomunicaciones = this.calif[0].Telecomunicaciones + 1
                    }

                    
                }

                if(this.preguntasT[i].Tipo == "9"){
                    var orden = this.calificacion[i]
                   
                    console.log("Orden talleres: ", orden[0])
                    
                    var porcentaje = 2

                    for(var j = 0; j < orden.length; j++){
                        
                        this.calif[0][orden[j]] = this.calif[0][orden[j]] + porcentaje
                        porcentaje = porcentaje - 0.4
                        console.log("Orden Calif: ", this.calif[0][orden[1].toString()])
                    }
                    console.log("Orden orden: ", orden)
                    this.Top = orden
                }
                
                else{
                    //console.log("Mal Fase-2", i)
                    //console.log("Mal Fase-2", this.preguntasT[i].Tipo)
                }
                
                
                
            }
            this.Resultado.push(this.calif[0])
            
        },
        onSubmit(evt){
            evt.preventDefault()
            this.loading = true
            console.log("Press...")
            this.Cal_Calificacion()
            console.log("Hola", JSON.stringify(this.Resultado))
            //console.log("Resultado: 0", this.Resultado[0]["Mecanica"])
            this.PostTest()
            
            
            //this.Resultado = []
        },

        spinner(){
            if (this.preg.length > 1){
                this.loading = true
            }else{
                this.loading = false
            }
        }
    },

    created(){
        //this.getTest()
        //this.getResultado()
        //this.PostTest()
        //this.PostPre()
        //this.spinner()

        this.getPreguntas ()
        
        
    }
}
</script>
<style lang="css" scoped>
    @import '../../assets/Cuestionario.css';
</style>