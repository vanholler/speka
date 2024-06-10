<script>
export default {
  data() {
    return {
      splitterModel: 40,
      path: "",
      selected: "Документация",
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
    <div class="main-left">
          <div>
            <q-splitter v-model="splitterModel" :limits="[45, 45]" style="height: 400px">

              <template v-slot:before>
                <div class="q-pa-md">
                  <q-tree :nodes="simple" node-key="label" selected-color="" v-model:selected="selected"
                    default-expand-all />
                </div>
              </template>

              <template v-slot:after>
                <q-tab-panels v-model="selected" animated transition-prev="jump-up" transition-next="jump-up">
                  <q-tab-panel name="Документация">
                    <div class="text-h4 q-mb-md">Welcome</div>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio
                      iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga
                      nulla ullam. In, libero.</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio
                      iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga
                      nulla ullam. In, libero.</p>
                  </q-tab-panel>

                  <q-tab-panel name="OpenAPI Specification">
                    <div class="text-h4 q-mb-md">OpenAPI Specification</div>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio
                      iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga
                      nulla ullam. In, libero.</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio
                      iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga
                      nulla ullam. In, libero.</p>
                  </q-tab-panel>

                  <q-tab-panel name="JSON Schema Specification">
                    <div class="text-h4 q-mb-md">JSON Schema Specification</div>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio
                      iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga
                      nulla ullam. In, libero.</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio
                      iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga
                      nulla ullam. In, libero.</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio
                      iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga
                      nulla ullam. In, libero.</p>
                  </q-tab-panel>

                  <q-tab-panel name="Author">
                    <div class="text-h4 q-mb-md">Author</div>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio
                      iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga
                      nulla ullam. In, libero.</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio
                      iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga
                      nulla ullam. In, libero.</p>
                  </q-tab-panel>
                </q-tab-panels>
              </template>
            </q-splitter>
          </div>
        </div>
</template>

<style scoped>

</style>