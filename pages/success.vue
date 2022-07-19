<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card
        class="mx-auto pa-4"
        width="400"
        height="454"
        outlined
        style="box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); border-radius: 12px">
        <div align="center" class="pt-5">
          <v-icon color="green" x-large>
            check_circle
          </v-icon>
        </div>
        <v-card-title class="justify-center">
          Uploaded Successfully!
        </v-card-title>
        <v-card-text class="d-flex justify-center">
          <v-img
            style="border-radius: 12px"
            :lazy-src="imageURL"
            :src="imageURL"
            width="338"
            height="218" />
        </v-card-text>
        <v-card-actions class="pb-10">
          <v-text-field
            id="link"
            v-model="imageURL"
            outlined
            dense
            readonly
            class="rounded-xl ma-0"
            color="primary">
            <template #append>
              <v-btn
                depressed
                tile
                color="primary"
                class="text-capitalize rounded-lg mb-2"
                @click="copyLink">
                Copy Link
              </v-btn>
            </template>
          </v-text-field>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'SuccessPage',
  data () {
    return {
      imageURL: this.$store.getters.imageURL,
    }
  },
  methods: {
    copyLink () {
      const copyText = document.querySelector('#link')
      copyText.select()
      document.execCommand('copy')
    },
  },
}
</script>

<style></style>
