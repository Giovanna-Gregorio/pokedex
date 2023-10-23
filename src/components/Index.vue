<template>
    <v-container>
        <br/>
        
        <v-row>
            <v-col cols="8">
                <v-text-field v-model="filterName" label="Nome" solo></v-text-field>
            </v-col>

            <v-col cols="4">
                <v-select 
                    v-model="selectedStatus" :items="itemsStatus" 
                    item-text="name" item-value="id"
                    label="Status" solo></v-select>
            </v-col>

            <v-col cols="4"></v-col>
 
            <v-col cols="4">
                <v-btn @click="clear()" class="mr-4">Limpar</v-btn>

                <v-btn color="primary" @click="filter()" solo>
                    <v-icon left dark>mdi-magnify</v-icon> Filtrar
                </v-btn>
            </v-col>
        </v-row>

        <v-divider style="margin-bottom: 20px; margin-top: 20px;;"></v-divider>

        <!-- #ABEBC6; -->
        <v-row>
            <v-col cols="3" v-for="poke in pokemons" :key="poke.name">
                <v-card @click="openDialog(getId(poke))" v-bind:style="poke.capture ? 'background: #FCF3CF;' : ''">
                    <v-container>
                        <v-row class="mx-0 d-flex justify-center">
                            <img :src="`${baseUrlImage}/${getId(poke)}.png`" :alt="poke.name" height="150px;"/>
                        </v-row>
                        <h3 class="text-center">{{ poke.name.toUpperCase() }}</h3>

                        <v-card-text class="text--primary text-center" style="font-size: 11px;">
                            <div v-if="poke.capture">Capturado em: {{ formatDate(poke.captureDate) }}</div>
                        </v-card-text>

                    </v-container>
                </v-card>
            </v-col>
        </v-row>

        <br />

        <div class="text-center">
            <v-pagination v-model="page" :length="totalPages" :total-visible="7" @input="nextPage()"></v-pagination>
        </div>
    
        <ModalPokemon
            :dialog.sync="dialog"
            :selectedPokemon="selectedPokemon"
        />
    </v-container>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import ModalPokemon from './ModalPokemon';

export default {
    name: 'Index',

    components: {
        ModalPokemon
    },

    data: () => ({
        pokemons: [],
        baseUrlImage: process.env.VUE_APP_BASE_URL_IMAGE,
        filterName: "",
        dialog: false,
        selectedPokemon: null,
        page: 1,
        total: 0,
        totalPages: 0,
        totalPerPage: 12,
        itemsStatus: [
            { id: 1, name: 'Capturado' },
            { id: 2, name: 'Não Capturado' },
            { id: 3, name: 'Todos' },
        ],
        selectedStatus: 3
    }),

    mounted() {
        this.getPokemons();
    },

    methods: {
        getPokemons() {
            var offset = this.page == 1 ? 0 : ((this.page - 1) * this.totalPerPage);

            axios.get(`${process.env.VUE_APP_BASE_URL_API}/pokemons?limit=${this.totalPerPage}&offset=${offset}
                ${this.selectedStatus <= 2 ? `&captured=${this.selectedStatus}` : '' }
                ${this.filterName ? `&name=${this.filterName}` : ''}`)
                .then((response) => {
                    this.pokemons = response.data.results;

                    this.total = response.data.count;
                    this.totalPages = this.total % this.totalPerPage === 0 ? this.total / this.totalPerPage : parseInt((this.total / this.totalPerPage) + 1);
                });
        },
        getId(pokemon) {
            return pokemon.url.split("/")[6];
        },
        getDetailsPokemon(id) {
            axios.get(`${process.env.VUE_APP_BASE_URL_API}/pokemon/${id}`).then((response) => {
                this.selectedPokemon = response.data;

                this.dialog = true;
            });
        },
        openDialog(id) {
            this.getDetailsPokemon(id);
        },
        nextPage() {
            this.getPokemons();
        },
        formatDate(date) {
            return moment(date).format('DD/MM/YYYY HH:mm:ss')
        },
        clear() {
            this.filterName = null;
            this.selectedStatus = 3; //Todos
            this.page = 1;

            this.getPokemons();
        },
        filter() {
            this.page = 1;
            this.getPokemons();
        }
    },
}
</script>