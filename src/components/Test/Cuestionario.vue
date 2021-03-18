

<template lang="html">
    <div class="container-fluid" style = "background-image:'../../assets/Banner.jpeg'; heigth:100vh">
        <!--<div class="row">
            <div class="col-sm text-left">
                <div>
                <h2>Puntuacion Caso de prueba</h2>
                </div>
                <br>
                <div class="col-sm table-responsive">
                    <b-table class="table" striped hover :items = "Puntos" :fields = "fields">
                                       
                    </b-table>
                </div>
            </div>

        </div>-->
        <div v-if="loading">
            <div class="modalx">
                <div class="container" style="margin-left: 43%;margin-right: 20%;margin-top: 20%;">
                <pacman-loader :loading = "loading " :color = "color"></pacman-loader>
                </div>
            </div>
        </div>
       

        <div v-if="condicion">
         
        <div class="col-md-12 text-center" style="height: 100vh">
            <paginate ref="paginator" name = "preg" :list = "preg" :per = "1" style="padding-left: 0px; padding-right: 0px;">
                <div v-for="(pregunta, key) in paginated('preg')" :key="key" style="margin-top: 30px; border-radius: 3%;">
                    <h1 v-text="pregunta.enunciado" class="parrafo"> </h1>
                    <div v-if="pregunta.id === 27 && calificacion.length > 25">
                        <div class="row">
                        <div class="col-sm-12 col-md-8 col-lg-7">
                        <img :src="getImgUrl(pregunta.img)" alt="200" class="img-thumbnail" style="border-radius: 3%; max-height:800px">
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
                     <img v-else :src="getImgUrl(pregunta.img)" alt="200" class="img-thumbnail" style="border-radius: 3%; max-height:800px">
                <div class="container-fluid" >
                <div class="row" style="    background-color: white; border-radius: 2%; margin-top: 20px;"> 
                    <div class="col-4"  v-for="(resp, i) in pregunta.respuestas" :i="i">
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
                                <b-form-checkbox class="opciones" :id="pregunta.id.toString()" name="check-button"  button button-variant="info" v-bind:value=pregunta.valor[i]>{{pregunta.respuestas[i]}}
                                    
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
                style="padding-left: 0px; padding-right: 0px;"
                for="preg"
                :show-step-links="true"
                :simple="{
                    prev: '< Anterior',
                    next: 'Siguiente >'  
                }"
               ></paginate-links>
            </div>
      </div>
      
      </div>
      <div class="container" v-else style="background-color: #ffffffd9; ">
        <div class="row row-content align-items-center">
            <div  class="col-12 col-sm-6 ">
                <b-table style="background-color: white" class="table" striped hover :items="Ponderado"></b-table>
            </div>
            <div class="col-12 col-sm-6">
                <pie-chart  :data="chartData" :options="chartOptions"></pie-chart>
            </div>
            <div class="col-12">
                
                <div class="card card-body bg-light">
                    <blockquote class="blockquote">
                        <div class="card" >
                        <h3 class="card-header bg-primary text-white" style="background-color: #1b0085 !important font-weight: bold;">! No olvides califica la recomendacion !</h3>
                        <div class="card-body">
                            <dl class="row">
                                
                                <dt class="col-6">
                                    <button v-on:click="Likes(1)" style="background-color: transparent; border: 0;">
                                    <img src="../../assets/iconos/like1.png" alt="200"/>
                                    </button> 
                                </dt>
                                <dd class="col-6">
                                    <button v-on:click="Likes(0)" style="background-color: transparent; border: 0;">
                                     <img src="../../assets/iconos/dislike1.png" alt="200"/>
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
        Ordenar () {
            var json = [{"Taller":"Electricidad", 'puntos' : this.dataPuntos[0]},
                        {"Taller":"Mecanica", 'puntos' : this.dataPuntos[1]},
                        {"Taller":"Fundicion", 'puntos' : this.dataPuntos[2]},
                        {"Taller":"Diseño", 'puntos' : this.dataPuntos[3]},
                        {"Taller":"Dibujo", 'puntos' : this.dataPuntos[4]},
                        {"Taller":"Telecomunicaciones", 'puntos' : this.dataPuntos[5]},
                        {"Taller":"Electronica", 'puntos' : this.dataPuntos[6]}]
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

        getImgUrl(pic) {
        return require('../../assets/Preguntas/'+pic)
        },

        PostPre() {
            const path = 'https://apirs.herokuapp.com/Pre'
            
            var SRR = this.SR
            console.log("this.Puntos",SRR)
            axios.post(path,{"SR":SRR,"Top":this.Top,"Tipo":"1"}).then((response) => {
                 console.log( JSON.stringify(response.data) +" Respuesta Precision")
                //console.log( JSON.stringify(response.data) +" Respuesta de Django")
                this.loading = false
            })
            this.loading = false
            .catch((error) => {
                 console.log("ERROR")
            })
        },

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
        PostTest () {
            const path = 'https://apirs.herokuapp.com/Post'
            //0.8, 1, 0.6, 0.8, 0.4, 0.8, 0.6
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
                this.chartData.datasets[0].data = [response.data.data[0][4],response.data.data[0][0],response.data.data[0][3],
                                                   response.data.data[0][6],response.data.data[0][5],response.data.data[0][1],
                                                   response.data.data[0][2]]
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