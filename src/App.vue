<script>
import { useQuasar } from 'quasar'
import 'highlight.js/lib/common';
import hljsVuePlugin from "@highlightjs/vue-plugin";
import toJsonSchema from 'to-json-schema';
import { copyText } from 'vue3-clipboard'
const $q = useQuasar()
import schema from './pages/schema.vue'
import generator from './pages/generator.vue'
import wiki from './pages/wiki.vue'

export default {
  components: {
    highlightjs: hljsVuePlugin.component,
    schema,
    generator,
    wiki
  },
  data() {
    return {
      tab: "jsonTo"
    }
  },

  methods: {
    notify(text, type) {
      this.$notify({
        title: '',
        text: text,
        type: type ? type : 'success',
        duration: 200,
        speed: 700,
        data: {}
      })
    },


  },

  mounted() {
    console.log(`The initial mounted`)
  }


}

</script>

<template>
  <!-- уведомления -->
  <notifications position="bottom right" />

  <q-card class="no-back">
    <q-tabs v-model="tab" dense class="text-grey tabs-back" active-color="grey-4" indicator-color="" align="justify"
      narrow-indicator>

      <!-- вкладки -->
      <q-tab name="jsonTo" label="json to Schema" />
      <q-tab name="generator" label="Генератор openAPI" />
      <q-tab name="wiki" label="Wiki" />
    </q-tabs>


    <q-separator />



    <q-tab-panels v-model="tab" class="no-back" animated>

      <!-- вкладка toJSON -->
      <q-tab-panel name="jsonTo">
        <schema/>
      </q-tab-panel>

      <!-- вкладка генератор -->
      <q-tab-panel name="generator">
        <generator/>
      </q-tab-panel>

      <q-tab-panel name="wiki">
        <wiki/>
      </q-tab-panel>
    </q-tab-panels>
  </q-card>


</template>


<style></style>