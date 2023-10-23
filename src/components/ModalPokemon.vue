<template>
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" max-width="600">
        <template>
            <v-card v-if="selectedPokemon">
                <v-toolbar color="black" dark>{{ selectedPokemon.name.toUpperCase() }}</v-toolbar>
                <v-card-text class="text-center">
                    <img :src="`${baseUrlImage}/${selectedPokemon.id}.png`" :alt="selectedPokemon.name" width="30%" />

                    <br />

                    <v-btn v-if="!selectedPokemon.capture" elevation="2" color="error" style="margin-bottom: 20px;"
                        @click="capture(selectedPokemon)">Capturar</v-btn>

                    <v-btn v-if="selectedPokemon.capture" elevation="2" color="success"
                        style="margin-bottom: 20px;">Capturado</v-btn>

                    <br />

                    <v-chip label>Altura: {{ selectedPokemon.height }} dm</v-chip>
                    <v-chip label class="ml-2">Peso: {{ (selectedPokemon.weight) }} hg</v-chip>

                    <v-divider style="margin-top: 20px;"></v-divider>

                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left">
                                        #
                                    </th>
                                    <th class="text-left">
                                        Habilidade
                                    </th>
                                    <th class="text-left">
                                        Oculta
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in selectedPokemon.abilities" :key="item.ability.name" class="text-left">
                                    <td>{{ getId(item.ability) }}</td>
                                    <td>{{ item.ability.name }}</td>
                                    <td>{{ item.ability.is_hidden ? 'Sim' : 'Não' }}</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>

                    <v-divider style="margin-top: 20px; margin-bottom: 20px;"></v-divider>

                    <h4>Ataques/Movimentos</h4><br />

                    <v-row>
                        <v-col cols="3" v-for="item in selectedPokemon.moves" :key="item.move.name">
                            {{ item.move.name }}
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions class="justify-end">
                    <v-btn text @click="closeDialog()">Fechar</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>


<script>

import axios from 'axios';
import moment from 'moment';

export default {
    name: 'ModalPokemon',

    props: {
        dialog: Boolean,
        selectedPokemon: Object,
    },

    data: () => ({
        baseUrlImage: process.env.VUE_APP_BASE_URL_IMAGE,
    }),

    methods: {
        getId(pokemon) {
            return pokemon.url.split("/")[6];
        },
        closeDialog() {
            this.$emit("update:dialog", this.dialog);
        },
        capture(pokemon) {
            var data = {
                id_pokemon: pokemon.id,
                date: moment(new Date(), 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
            };

            axios.post(`${process.env.VUE_APP_BASE_URL_API}/capture`, data)
                .then((response) => {
                    if(response.status == 200) {
                        this.closeDialog();
                        window.location.reload();
                    }
                });
        },
    },

    watch: {
        dialog() {
            this.$emit("update:dialog", this.dialog);
        },
    },
}
</script>
