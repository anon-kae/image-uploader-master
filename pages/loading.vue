<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card
        class="mx-auto"
        width="400"
        height="143"
        outlined
        style="box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); border-radius: 12px">
        <div class="pa-4">
          <v-card-title v-if="loading">
            Uploading...
          </v-card-title>

          <div align="center">
            <h3 v-if="!loading || !file" class="pt-5">
              No uploading
            </h3>
            <v-btn
              v-if="!loading || !file"
              to="/"
              class="text-capitalize mt-2"
              color="primary"
              depressed>
              Back
            </v-btn>
          </div>
          <v-card-text class="justify-center">
            <v-progress-linear v-if="loading" indeterminate color="primary" />
          </v-card-text>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'SuccessPage',
  data () {
    return {
      loading: false,
      file: this.$store.getters.file,
    }
  },
  async mounted () {
    if (this.file) {
      this.loading = true
      try {
        const { result } = await this.$api.uploadService.uploadImage(this.file)
        const { path } = result
        setTimeout(() => {
          this.$store.commit('setImageURL', path)
          this.loading = false
          this.$store.commit('setFile', '')
          this.$router.push('/success')
        }, 3000)
      } catch (error) {
        setTimeout(() => {
          this.loading = false
          this.$store.commit('setFile', '')
          throw error
        }, 3000)
      }
    }
  },
}
</script>

<style></style>
