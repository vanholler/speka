<script>
import { useQuasar } from 'quasar'
import 'highlight.js/lib/common';
import hljsVuePlugin from "@highlightjs/vue-plugin";
import toJsonSchema from 'to-json-schema';
import { copyText } from 'vue3-clipboard'
const $q = useQuasar()


export default {
  components: {
    highlightjs: hljsVuePlugin.component
  },
  data() {
    return {
      tab: "generator",
      author: "",
      title: "",
      version: '1.0.0',
      requestText: null,
      method: '',
      externalDocs: false,
      externalDocsDesc: "",
      externalDocsUrl: "",
      path: "",
      fieldBodyRequired: false,
      requestSchema: {},
      options: [
        'POST', 'GET', 'PUT', 'PATCH', 'DELETE'
      ],
      inOptions: [
        "query", "header", "path", "cookie"
      ],
      typeOptions: [
        "string", "array", "object"
      ],
      baseSwagger: `{
   "openapi": "3.0.0",
   "info": {}
}`,
      serversData: [
        {
          url: '',
          description: ''
        }
      ],
      paramsData: [
        {
          name: '',
          in: '',
          description: '',
          required: false,
          type: ""
        }
      ]
    }
  },

  methods: {
    download() {
      // credit: https://www.bitdegree.org/learn/javascript-download
      let text = JSON.stringify(this.baseSwagger, null, 2);
      let parseText = JSON.parse(text)
      console.log(parseText)
      let filename = 'cats.json';
      let element = document.createElement('a');
      element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(parseText));
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();
      document.body.removeChild(element);


    },

    doCopy() {
      copyText(this.baseSwagger, undefined, (error, event) => {
        if (error) {
          alert('Can not copy')
          console.log(error)
        } else {

          this.notify('Скопировано')
        }
      })
    },

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

    onReset() {
      this.author = ''
      this.title = ''
      this.version = "1.0.0"
      this.externalDocs = false
      this.externalDocsDesc = ''
      this.externalDocsUrl = ''
      this.path = ''
      this.method = ''
      this.requestText = null
      this.fieldBodyRequired = false
      this.serversData = [
        {
          url: '',
          description: ''
        }
      ],
        this.paramsData = [
          {
            name: '',
            in: '',
            description: '',
            required: false,
            type: "string"
          }
        ],
        this.baseSwagger = `{
   "openapi": "3.0.0",
   "info": {}
}`

    },

    onSubmit() {
      console.log("onSubmit")

      this.toSchema()
      this.createAPI()
    },

    toSchema() {
      let n = this.requestText;
      let parseData = {}
      try {
        parseData = JSON.parse(n)
      } catch (e) {
        console.log(e)
        this.notify('Не валидный JSON в requestBody', 'error')
      }

      let result = toJsonSchema(parseData, { required: this.fieldBodyRequired });
      let resultString = JSON.stringify(result, null, 2)
      this.requestSchema = resultString;
    },

    createAPI() {
      let info = {
        openapi: "3.0.0",
        info: {
          contact: {
            name: this.author
          },
          title: this.title,
          version: this.version
        }
      }

      let servers = this.serversData

      let externalDocs = {
        description: this.externalDocsDesc,
        url: this.externalDocsUrl
      }


      let components = {
        "parameters": this.paramsData
      }


      let paths = {
        [this.path]: {
          [this.method.toLowerCase()]: {
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    ...JSON.parse(this.requestSchema) // пересмотреть - синтаксис подсветка
                 }
                }
              }
            }
          }
        }
      }
      // paths ломает цвета в схеме - исправить. 
      let fullSchema = {
        ...info,
        paths,
        components,
        servers,
        externalDocs
      }


      this.baseSwagger = `${JSON.stringify(fullSchema, null, 2)}`
    },

    addNewItem(block) {
      switch (block) {
        case 'servers':
          this.serversData.push({
            url: '',
            description: ''
          });
          break;
        case 'parameters':
          this.paramsData.push({
            name: '',
            in: '',
            description: '',
            required: false,
            type: ""
          });
          break;
      }

    },
    deleteServer(block, index) {
      switch (block) {
        case 'servers':
          this.serversData.splice(index, 1)
          break;
        case 'parameters':
          this.paramsData.splice(index, 1)
          break;
      }
    }

  },

  mounted() {
    console.log(`The initial mounted`)
  }


}

</script>

<template>
  <notifications position="bottom right" />
  <q-card class="no-back">
    <q-tabs v-model="tab" dense class="text-dark tabs-back" active-color="dark" indicator-color="dark" align="justify"
      narrow-indicator>
      <q-tab name="generator" label="Генератор openAPI" />
      <q-tab name="jsonTo" label="json to Schema" />
      <q-tab name="wiki" label="Wiki" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" class="no-back" animated>
      <q-tab-panel name="generator">

        <div class="main">
          <div class="main-left">
            <div class="" style="">
              <q-form @reset="onReset" class="q-gutter-md">


                <q-list bordered class="rounded-borders">

                  <!-- info -->
                  <q-expansion-item switch-toggle-side expand-separator label="Info">
                    <div class="external-input_servers-inp">

                      <q-input standout="bg-teal text-white" bg-color="white" v-model="author"
                        label="Владелец документа" />
                    </div>
                    <div class="external-input_servers-inp">
                      <q-input standout="bg-teal text-white" bg-color="white" v-model="title" label="title" />
                    </div>
                    <div class="external-input_servers-inp">
                      <q-input standout="bg-teal text-white" bg-color="white" v-model="version"
                        label="Версия документа" />
                    </div>
                    <div class="external-input_servers-inp">
                      <q-input standout="bg-teal text-white" bg-color="white" v-model="path" label="Path" />
                    </div>
                    <div class="external-input_servers-inp">
                      <q-select standout="bg-teal text-white" bg-color="white" v-model="method" :options="options"
                        label="Method" />
                    </div>
                  </q-expansion-item>
                  <!-- info -->


                  <!-- parameters -->
                  <q-expansion-item switch-toggle-side expand-separator label="parameters"
                    :caption="paramsData.length > 1 ? paramsData.length : ''">
                    <div v-for="(item, index) in paramsData" :key="index">
                      <div class="external-input_servers-block">
                        <div class="servers-btn_delete" v-if="paramsData.length > 1">
                          <q-btn size="xs" @click="deleteServer('parameters', index)" title="Удалить" flat round
                            wait-for-ripple dense color="secondary">
                            <q-icon name="clear" size="15px"></q-icon>
                          </q-btn>
                        </div>
                        <div class="">
                            <q-toggle v-model="item.required" label="required" />
                        </div>
                        <div class=" external-input_servers">
                          <div class="external-input_servers-inp">
                            <q-input standout="bg-teal text-white" bg-color="white" label="name" v-model="item.name" />
                          </div>
                          <div class="external-input_servers-inp">
                            <q-select standout="bg-teal text-white" bg-color="white" v-model="item.in"
                              :options="inOptions" label="in" />
                          </div>
                          <div class="">
                            <q-input standout="bg-teal text-white" bg-color="white" label="description"
                              v-model="item.description" />
                          </div>
                          <div class="">
                            <q-select standout="bg-teal text-white" bg-color="white" v-model="item.type"
                              :options="typeOptions" label="type" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="external-input_servers-btn">
                      <q-btn size="xs" @click="addNewItem('parameters')" title="Добавить" flat round wait-for-ripple
                        dense color="secondary">
                        <q-icon name="add" size="26px"></q-icon>
                      </q-btn>
                    </div>
                  </q-expansion-item>

                  <!-- parameters -->

                  <!-- requestBody -->
                  <q-expansion-item switch-toggle-side expand-separator label="requestBody">
                    <q-toggle v-model="fieldBodyRequired" label="properties required" />
                    <q-input standout="bg-teal text-white" bg-color="white" v-model="requestText" type="textarea" />
                  </q-expansion-item>
                  <!-- requestBody -->

                  <!-- Responses -->
                  <q-expansion-item switch-toggle-side expand-separator label="Responses">
                    <div class=" external-input_servers">
                      <div class="external-input_servers-inp">
                        <q-input standout="bg-teal text-white" bg-color="white" v-model="externalDocsDesc"
                          label="code" />
                      </div>
                      <div class="">
                        <q-input standout="bg-teal text-white" bg-color="white" v-model="externalDocsUrl"
                          label="description" />
                      </div>
                    </div>
                    <div class="external-input_servers-btn">
                      <q-btn size="xs" @click="" title="Скачать" flat round wait-for-ripple dense color="secondary">
                        <q-icon name="add" size="26px"></q-icon>
                      </q-btn>
                    </div>
                  </q-expansion-item>
                  <!-- Responses -->

                  <!-- ExternalDocs -->
                  <q-expansion-item switch-toggle-side expand-separator label="ExternalDocs">
                    <div class="external-input">
                      <q-input standout="bg-teal text-white" bg-color="white" v-model="externalDocsDesc"
                        label="description" />
                    </div>
                    <div class="">
                      <q-input standout="bg-teal text-white" bg-color="white" v-model="externalDocsUrl" label="url" />
                    </div>
                  </q-expansion-item>
                  <!-- ExternalDocs -->

                  <!-- Servers -->
                  <q-expansion-item switch-toggle-side expand-separator label="Servers"
                    :caption="serversData.length > 1 ? serversData.length : ''">
                    <div v-for="(item, index) in serversData" :key="index">
                      <div class="external-input_servers-block">
                        <div class="servers-btn_delete" v-if="serversData.length > 1">
                          <q-btn size="xs" @click="deleteServer('servers', index)" title="Удалить" flat round
                            wait-for-ripple dense color="secondary">
                            <q-icon name="clear" size="15px"></q-icon>
                          </q-btn>
                        </div>
                        <div class=" external-input_servers">
                          <div class="external-input_servers-inp">
                            <q-input standout="bg-teal text-white" bg-color="white" label="url" v-model="item.url" />
                          </div>
                          <div class="">
                            <q-input standout="bg-teal text-white" bg-color="white" label="description"
                              v-model="item.description" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="external-input_servers-btn">
                      <q-btn size="xs" @click="addNewItem('servers')" title="Скачать" flat round wait-for-ripple dense
                        color="secondary">
                        <q-icon name="add" size="26px"></q-icon>
                      </q-btn>
                    </div>
                  </q-expansion-item>
                  <!-- Servers -->

                  <!-- Tags -->
                  <q-expansion-item switch-toggle-side expand-separator label="Tags">
                    <div class=" external-input_servers">
                      <div class="external-input_servers-inp">
                        <q-input standout="bg-teal text-white" bg-color="white" v-model="externalDocsDesc"
                          label="name" />
                      </div>
                      <div class="">
                        <q-input standout="bg-teal text-white" bg-color="white" v-model="externalDocsUrl"
                          label="description" />
                      </div>
                    </div>
                    <div class="external-input_servers-btn">
                      <q-btn size="xs" @click="" title="Добавить" flat round wait-for-ripple dense color="secondary">
                        <q-icon name="add" size="26px"></q-icon>
                      </q-btn>
                    </div>
                  </q-expansion-item>
                  <!-- Tags -->

                </q-list>

                <div>
                  <q-btn label="Сгенерировать" @click="onSubmit" color="secondary" />
                  <q-btn label="Сбросить" type="reset" color="secondary" flat class="q-ml-sm" />
                </div>
              </q-form>
            </div>
          </div>


          <div class="main-rigth theme-atom-one-dark ">
            <highlightjs language="json" :code="baseSwagger" />

            <div class="main-rigth_buttons">

              <div class="main-rigth_buttons-btn">
                <q-btn size="xs" @click="download" title="Скачать" flat round wait-for-ripple dense color="secondary">
                  <q-icon name="download_for_offline" size="26px"></q-icon>
                </q-btn>
              </div>
              <div class="main-rigth_buttons-btn">
                <q-btn size="xs" @click="doCopy" title="Скопировать" flat round wait-for-ripple dense color="secondary">
                  <q-icon name="content_copy" size="26px"></q-icon>
                </q-btn>
              </div>

            </div>

          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="jsonTo">
        <div class="text-h6">Alarms</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>

      <q-tab-panel name="wiki">
        <div class="main-left">
          <div class="q-pa-md bg-grey-9 text-white">
            <q-list dark bordered separator style="max-width: 318px">
              <q-item clickable v-ripple>
                <q-item-section>https://editor.swagger.io/</q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>Single line item</q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>Single line item</q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-card>


</template>


<style></style>