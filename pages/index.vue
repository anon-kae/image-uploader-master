<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card
        class="mx-auto"
        width="402"
        height="469"
        outlined
        style="box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); border-radius: 12px">
        <v-card-title class="justify-center pt-10">
          Upload your image
        </v-card-title>
        <v-card-subtitle class="d-flex justify-center pt-5">
          File should be Jpeg, Png,...
        </v-card-subtitle>

        <v-card-text class="d-flex justify-center">
          <v-sheet
            tabindex="0"
            color="#F6F8FB"
            style="
              border: dashed 1px #97bef4;
              border-radius: 12px;
              box-sizing: border-box;
            "
            width="338"
            height="218"
            @drop.prevent="onChange"
            @click="triggerFileSelect">
            <v-container class="fill-height" fluid>
              <v-row justify="center" align="center">
                <v-img
                  max-height="114"
                  max-width="88"
                  :src="require('../assets/image.svg')" />
              </v-row>
              <v-row justify="center">
                <span style="color: #bdbdbd; font-size: 12px; font-weight: 500">
                  Drag & drop your image here
                </span>
              </v-row>
              <input
                ref="file-input"
                type="file"
                style="display: none"
                @change="onChange">
            </v-container>
          </v-sheet>
        </v-card-text>
        <div align="center" class="or">
          Or
        </div>
        <v-card-actions class="justify-center">
          <v-btn
            class="text-capitalize"
            color="primary"
            depressed
            @click="triggerFileSelect">
            Choose a file
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      dragging: false,
      events: ['dragenter', 'dragover', 'dragleave', 'drop'],
      imageType: ['image/png', 'image/jpeg'],
    }
  },
  mounted () {
    this.events.forEach((eventName) => {
      document.body.addEventListener(eventName, this.preventDefaults)
    })
  },
  methods: {
    triggerFileSelect () {
      this.$refs['file-input'].click()
    },
    preventDefaults (e) {
      e.preventDefault()
    },
    async onChange (e) {
      const files = e.target.files || e.dataTransfer.files

      if (!files.length) {
        this.dragging = false
        return
      }

      const [file] = files
      await this.createFile(file)
    },
    async createFile (file) {
      if (!this.imageType.includes(file.type)) {
        await this.$store.dispatch(
          'snackbar/setErrorMessage',
          'Please select image file!'
        )
        this.dragging = false
        return
      }

      if (file.size > 5000000) {
        await this.$store.dispatch(
          'snackbar/setErrorMessage',
          'Please check file size no over 5 MB.'
        )
        this.dragging = false
        return
      }

      this.$store.commit('setFile', file)
      this.dragging = false
      await this.$router.push('/loading')
    },
  },
}
</script>

<style>
.text-btn {
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
}
.or {
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;

  text-align: center;
  letter-spacing: -0.035em;
  color: #bdbdbd;
}
</style>
