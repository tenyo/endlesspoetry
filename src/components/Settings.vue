<template>
  <div>
    <symbol
      id="icon-cog"
      viewBox="0 0 32 32"
    >
      <title>cog</title>
      <path d="M29.181 19.070c-1.679-2.908-0.669-6.634 2.255-8.328l-3.145-5.447c-0.898 0.527-1.943 0.829-3.058 0.829-3.361 0-6.085-2.742-6.085-6.125h-6.289c0.008 1.044-0.252 2.103-0.811 3.070-1.679 2.908-5.411 3.897-8.339 2.211l-3.144 5.447c0.905 0.515 1.689 1.268 2.246 2.234 1.676 2.903 0.672 6.623-2.241 8.319l3.145 5.447c0.895-0.522 1.935-0.82 3.044-0.82 3.35 0 6.067 2.725 6.084 6.092h6.289c-0.003-1.034 0.259-2.080 0.811-3.038 1.676-2.903 5.399-3.894 8.325-2.219l3.145-5.447c-0.899-0.515-1.678-1.266-2.232-2.226zM16 22.479c-3.578 0-6.479-2.901-6.479-6.479s2.901-6.479 6.479-6.479c3.578 0 6.479 2.901 6.479 6.479s-2.901 6.479-6.479 6.479z" />
    </symbol>

    <b-btn
      v-b-modal.settingsModal
      variant="secondary"
      size="sm"
    >
      <svg class="icon icon-cog"><use xlink:href="#icon-cog" /></svg>
    </b-btn>
    <b-modal
      id="settingsModal"
      v-model="show"
      title="Settings"
      body-text-variant="dark"
      @shown="resetSettings"
    >
      <b-row class="my-1">
        <b-col class="text-right">
          <label
            v-b-tooltip
            for="maxLines"
            title="Only poems containing less than max lines will be displayed"
          >
            <u>Max lines:</u>
          </label>
        </b-col>
        <b-col>
          <b-form-input
            id="maxLines"
            v-model.number="maxLines"
            type="number"
            size="sm"
            :state="maxLinesState"
          />
          <b-form-invalid-feedback id="maxLinesLiveFeedback">
            Enter at least 10 lines
          </b-form-invalid-feedback>
        </b-col>
      </b-row>
      <div
        slot="modal-footer"
        class="w-100"
      >
        <p class="float-left small">
          <a
            :href="settings.github"
            target="_blank"
          >GitHub repo</a>
        </p>
        <b-btn
          size="sm"
          class="float-right"
          variant="primary"
          :disabled="!stateOk"
          @click="updateSettings"
        >
          Save
        </b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    settings: Object
  },
  data () {
    return {
      maxLines: this.settings.maxLines,
      show: false
    }
  },
  computed: {
    maxLinesState () {
      if (this.maxLines === this.settings.maxLines) {
        return null
      }
      return this.maxLines >= 10
    },
    stateOk () {
      return this.maxLinesState
    }
  },
  methods: {
    resetSettings () {
      this.maxLines = this.settings.maxLines
    },
    updateSettings () {
      this.show = false
      if (this.maxLinesState) {
        this.settings.maxLines = this.maxLines
      }
    }
  }
}
</script>

<style scoped>
.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
}
u {
  border-bottom: 1px dotted #000;
  text-decoration: none;
}
</style>
