<script>
export default {
  data() {
    return {
      greeting: 'Hello World!',
      splitterModel: 50,
      path: "",
      simple: [
        {
          label: 'Документация',
          children: [
            {
              label: 'OpenAPI Specification',
              icon: 'restaurant_menu'
            },
            {
              label: 'JSON Schema Specification',
              icon: 'room_service'
            },
            {
              label: 'Author',
              icon: 'photo'
            }
          ]
        }
      ],
    }
  }
}
</script>

<template>
   <q-splitter v-model="splitterModel" style="height: 400px">
          <template v-slot:before>
            <div class="q-pa-md"> 
              <q-tree
      :nodes="simple"
      node-key="label"
      default-expand-all
    >
    <template v-slot:default-body>
      <div class="schema-btn">
        <q-input standout="bg-teal text-white" bg-color="white" v-model="path" />
      </div>
      </template>

    </q-tree>  
  
            </div>
          </template>

          <template v-slot:after>
            ваыва
          </template>
        </q-splitter>
</template>

<style scoped>

</style>